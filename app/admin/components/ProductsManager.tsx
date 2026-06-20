'use client'
import { useState, useEffect, useRef } from 'react'
import { formatPrice } from '@/lib/i18n'

interface Category { id: number; nameFa: string; nameEn: string }
interface Product {
  id: number; nameFa: string; nameEn: string; price: number
  descriptionFa: string; descriptionEn: string; categoryId: number | null
  inStock: boolean; dimensions: string | null; weight: string | null
  imageUrls: string[]; featured: boolean; categoryNameFa?: string | null; categoryNameEn?: string | null
}

const emptyForm = {
  nameFa: '', nameEn: '', price: '', descriptionFa: '', descriptionEn: '',
  categoryId: '', inStock: true, dimensions: '', weight: '', imageUrls: [] as string[], featured: false,
}

export function ProductsManager({ token }: { token: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function loadAll() {
    const [pRes, cRes] = await Promise.all([fetch('/api/products'), fetch('/api/categories')])
    const [p, c] = await Promise.all([pRes.json(), cRes.json()])
    if (Array.isArray(p)) setProducts(p)
    if (Array.isArray(c)) setCategories(c)
    setLoading(false)
  }

  useEffect(() => { loadAll() }, [])

  function openAdd() {
    setForm({ ...emptyForm })
    setEditingProduct(null)
    setView('add')
  }

  function openEdit(p: Product) {
    setForm({
      nameFa: p.nameFa, nameEn: p.nameEn, price: String(p.price / 100),
      descriptionFa: p.descriptionFa, descriptionEn: p.descriptionEn,
      categoryId: p.categoryId ? String(p.categoryId) : '',
      inStock: p.inStock, dimensions: p.dimensions ?? '', weight: p.weight ?? '',
      imageUrls: p.imageUrls ?? [], featured: p.featured,
    })
    setEditingProduct(p)
    setView('edit')
  }

  async function handleUpload(files: FileList) {
    setUploading(true)
    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('adminToken', token)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (data.url) uploaded.push(data.url)
      } catch {}
    }
    setForm(f => ({ ...f, imageUrls: [...f.imageUrls, ...uploaded] }))
    setUploading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const body = {
        adminToken: token, ...form,
        categoryId: form.categoryId || null,
      }
      if (view === 'edit' && editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } else {
        await fetch('/api/products', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      }
      await loadAll()
      setView('list')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminToken: token }),
    })
    setDeleteConfirm(null)
    loadAll()
  }

  const inputStyle = {
    backgroundColor: '#1d140d', border: '1px solid rgba(201,154,75,0.3)',
    color: '#f1e9da', padding: '10px 14px', borderRadius: '4px',
    outline: 'none', width: '100%', fontSize: '0.9rem',
  }
  const labelStyle = { color: '#c99a4b', fontFamily: 'var(--font-vazirmatn)', fontSize: '0.85rem', marginBottom: '4px', display: 'block' }

  if (view === 'add' || view === 'edit') {
    return (
      <div>
        <button onClick={() => setView('list')} className="flex items-center gap-2 mb-6 text-sm"
          style={{ color: '#c99a4b', fontFamily: 'var(--font-vazirmatn)' }}>
          ← بازگشت به لیست
        </button>
        <h2 style={{ color: '#c99a4b', fontFamily: 'var(--font-nastaliq), serif', lineHeight: '2', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          {view === 'edit' ? 'ویرایش محصول' : 'افزودن محصول جدید'}
        </h2>

        <form onSubmit={handleSave} className="max-w-2xl space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label style={labelStyle}>نام (فارسی)</label>
              <input style={inputStyle} value={form.nameFa} onChange={e => setForm(f => ({ ...f, nameFa: e.target.value }))} required placeholder="مثال: کاسه گردو" /></div>
            <div><label style={{ ...labelStyle }}>نام (انگلیسی)</label>
              <input style={{ ...inputStyle, direction: 'ltr' }} value={form.nameEn} onChange={e => setForm(f => ({ ...f, nameEn: e.target.value }))} required placeholder="e.g. Walnut Bowl" /></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div><label style={labelStyle}>قیمت (دلار)</label>
              <input style={{ ...inputStyle, direction: 'ltr' }} type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required placeholder="85.00" /></div>
            <div><label style={labelStyle}>دسته‌بندی</label>
              <select style={{ ...inputStyle }} value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
                <option value="">بدون دسته‌بندی</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.nameFa}</option>)}
              </select>
            </div>
          </div>

          <div><label style={labelStyle}>توضیحات (فارسی)</label>
            <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
              value={form.descriptionFa} onChange={e => setForm(f => ({ ...f, descriptionFa: e.target.value }))} placeholder="توضیح محصول به فارسی..." /></div>

          <div><label style={{ ...labelStyle }}>توضیحات (انگلیسی)</label>
            <textarea style={{ ...inputStyle, direction: 'ltr', resize: 'vertical', minHeight: '100px' }}
              value={form.descriptionEn} onChange={e => setForm(f => ({ ...f, descriptionEn: e.target.value }))} placeholder="Product description in English..." /></div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div><label style={labelStyle}>ابعاد (اختیاری)</label>
              <input style={inputStyle} value={form.dimensions} onChange={e => setForm(f => ({ ...f, dimensions: e.target.value }))} placeholder="مثال: ۲۵ × ۲۵ × ۱۰ سانتی‌متر" /></div>
            <div><label style={labelStyle}>وزن (اختیاری)</label>
              <input style={inputStyle} value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} placeholder="مثال: ۸۰۰ گرم" /></div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: 'var(--font-vazirmatn)', color: '#cdbfa8' }}>
              <input type="checkbox" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))}
                style={{ accentColor: '#c99a4b' }} />
              موجود در انبار
            </label>
            <label className="flex items-center gap-2 cursor-pointer" style={{ fontFamily: 'var(--font-vazirmatn)', color: '#cdbfa8' }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                style={{ accentColor: '#c99a4b' }} />
              نمایش در صفحه اصلی
            </label>
          </div>

          {/* Image upload */}
          <div>
            <label style={labelStyle}>تصاویر محصول</label>
            <div
              className="border-2 border-dashed rounded p-6 text-center cursor-pointer"
              style={{ borderColor: 'rgba(201,154,75,0.3)', backgroundColor: '#1d140d' }}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault() }}
              onDrop={e => { e.preventDefault(); if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files) }}
            >
              <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
                onChange={e => e.target.files && handleUpload(e.target.files)} />
              <p style={{ color: '#cdbfa8', fontFamily: 'var(--font-vazirmatn)', fontSize: '0.85rem' }}>
                {uploading ? 'در حال آپلود...' : 'کلیک کنید یا عکس را اینجا رها کنید'}
              </p>
            </div>
            {form.imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {form.imageUrls.map((url, i) => (
                  <div key={i} className="relative" style={{ width: '72px', height: '72px' }}>
                    <img src={url} alt={`img-${i}`} className="w-full h-full object-cover rounded"
                      style={{ border: '1px solid rgba(201,154,75,0.3)' }} />
                    <button type="button" onClick={() => setForm(f => ({ ...f, imageUrls: f.imageUrls.filter((_, j) => j !== i) }))}
                      className="absolute -top-1.5 -end-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: '#8b2020', color: '#fff' }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 rounded font-medium transition-all hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: '#c99a4b', color: '#1d140d', fontFamily: 'var(--font-vazirmatn)' }}>
              {saving ? 'در حال ذخیره...' : 'ذخیره محصول'}
            </button>
            <button type="button" onClick={() => setView('list')}
              className="px-6 py-2.5 rounded transition-all"
              style={{ backgroundColor: 'transparent', color: '#cdbfa8', border: '1px solid rgba(201,154,75,0.3)', fontFamily: 'var(--font-vazirmatn)' }}>
              انصراف
            </button>
          </div>
        </form>

        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <div className="p-6 rounded max-w-sm w-full" style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.3)' }}>
              <h3 style={{ color: '#f1e9da', fontFamily: 'var(--font-nastaliq), serif', lineHeight: '2', fontWeight: 700, marginBottom: '0.5rem' }}>آیا مطمئن هستید؟</h3>
              <p style={{ color: '#cdbfa8', fontSize: '0.9rem', fontFamily: 'var(--font-vazirmatn)', marginBottom: '1.25rem' }}>این عمل قابل برگشت نیست.</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(deleteConfirm)} style={{ backgroundColor: '#8b2020', color: '#f1e9da', fontFamily: 'var(--font-vazirmatn)', padding: '8px 16px', borderRadius: '4px' }}>بله، حذف کن</button>
                <button onClick={() => setDeleteConfirm(null)} style={{ backgroundColor: 'transparent', color: '#cdbfa8', border: '1px solid rgba(201,154,75,0.3)', fontFamily: 'var(--font-vazirmatn)', padding: '8px 16px', borderRadius: '4px' }}>انصراف</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: '#c99a4b', fontFamily: 'var(--font-nastaliq), serif', lineHeight: '2', fontSize: '1.3rem', fontWeight: 700 }}>
          مدیریت محصولات
        </h2>
        <button onClick={openAdd} className="px-4 py-2 rounded text-sm"
          style={{ backgroundColor: '#c99a4b', color: '#1d140d', fontFamily: 'var(--font-vazirmatn)' }}>
          + افزودن محصول
        </button>
      </div>

      {loading ? (
        <p style={{ color: '#cdbfa8', fontFamily: 'var(--font-vazirmatn)' }}>در حال بارگذاری...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p style={{ color: '#cdbfa8', fontFamily: 'var(--font-vazirmatn)' }}>هنوز محصولی وجود ندارد.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 rounded"
              style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.15)' }}>
              <div className="flex-shrink-0 w-14 h-14 rounded overflow-hidden" style={{ border: '1px solid rgba(201,154,75,0.2)' }}>
                <img src={p.imageUrls?.[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200'}
                  alt={p.nameFa} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ color: '#f1e9da', fontFamily: 'var(--font-vazirmatn)', fontWeight: 500 }} className="truncate">{p.nameFa}</p>
                <div className="flex flex-wrap items-center gap-3 mt-0.5">
                  <span style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)', fontSize: '0.9rem' }}>{formatPrice(p.price)}</span>
                  {p.categoryNameFa && <span style={{ color: '#cdbfa8', fontSize: '0.75rem', fontFamily: 'var(--font-vazirmatn)' }}>{p.categoryNameFa}</span>}
                  <span style={{
                    color: p.inStock ? '#5b7d62' : '#c07070', fontSize: '0.7rem',
                    backgroundColor: p.inStock ? 'rgba(62,92,69,0.2)' : 'rgba(192,112,112,0.2)',
                    padding: '1px 6px', borderRadius: '3px', fontFamily: 'var(--font-vazirmatn)',
                  }}>
                    {p.inStock ? 'موجود' : 'ناموجود'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="px-3 py-1.5 text-xs rounded"
                  style={{ color: '#c99a4b', border: '1px solid rgba(201,154,75,0.3)', fontFamily: 'var(--font-vazirmatn)' }}>ویرایش</button>
                <button onClick={() => setDeleteConfirm(p.id)} className="px-3 py-1.5 text-xs rounded"
                  style={{ color: '#e07070', border: '1px solid rgba(224,112,112,0.3)', fontFamily: 'var(--font-vazirmatn)' }}>حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="p-6 rounded max-w-sm w-full" style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.3)' }}>
            <h3 style={{ color: '#f1e9da', fontFamily: 'var(--font-nastaliq), serif', lineHeight: '2', fontWeight: 700, marginBottom: '0.5rem' }}>آیا مطمئن هستید؟</h3>
            <p style={{ color: '#cdbfa8', fontSize: '0.9rem', fontFamily: 'var(--font-vazirmatn)', marginBottom: '1.25rem' }}>این عمل قابل برگشت نیست.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} style={{ backgroundColor: '#8b2020', color: '#f1e9da', fontFamily: 'var(--font-vazirmatn)', padding: '8px 16px', borderRadius: '4px' }}>بله، حذف کن</button>
              <button onClick={() => setDeleteConfirm(null)} style={{ backgroundColor: 'transparent', color: '#cdbfa8', border: '1px solid rgba(201,154,75,0.3)', fontFamily: 'var(--font-vazirmatn)', padding: '8px 16px', borderRadius: '4px' }}>انصراف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
