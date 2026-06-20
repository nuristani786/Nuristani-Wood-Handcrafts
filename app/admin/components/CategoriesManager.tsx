'use client'
import { useState, useEffect } from 'react'

interface Category {
  id: number
  nameFa: string
  nameEn: string
}

export function CategoriesManager({ token }: { token: string }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Category | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ nameFa: '', nameEn: '' })
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await fetch('/api/categories')
    const data = await res.json()
    if (Array.isArray(data)) setCategories(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save() {
    setSaving(true)
    try {
      if (editing) {
        await fetch('/api/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminToken: token, id: editing.id, ...form }),
        })
      } else {
        await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminToken: token, ...form }),
        })
      }
      await load()
      setEditing(null)
      setAdding(false)
      setForm({ nameFa: '', nameEn: '' })
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: number) {
    await fetch('/api/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminToken: token, id }),
    })
    setDeleteConfirm(null)
    load()
  }

  const inputStyle = {
    backgroundColor: '#1d140d',
    border: '1px solid rgba(201,154,75,0.3)',
    color: '#f1e9da',
    fontFamily: 'var(--font-vazirmatn)',
    padding: '8px 12px',
    borderRadius: '4px',
    outline: 'none',
    width: '100%',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: '#c99a4b', fontFamily: 'var(--font-nastaliq), serif', lineHeight: '2', fontSize: '1.3rem', fontWeight: 700 }}>
          دسته‌بندی‌ها
        </h2>
        <button
          onClick={() => { setAdding(true); setEditing(null); setForm({ nameFa: '', nameEn: '' }) }}
          className="px-4 py-2 rounded text-sm"
          style={{ backgroundColor: '#c99a4b', color: '#1d140d', fontFamily: 'var(--font-vazirmatn)' }}
        >
          + افزودن دسته
        </button>
      </div>

      {(adding || editing) && (
        <div className="p-6 rounded mb-6" style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.3)' }}>
          <h3 className="mb-4 text-sm" style={{ color: '#c99a4b', fontFamily: 'var(--font-vazirmatn)' }}>
            {editing ? 'ویرایش دسته‌بندی' : 'دسته‌بندی جدید'}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs mb-1" style={{ color: '#cdbfa8', fontFamily: 'var(--font-vazirmatn)' }}>نام فارسی</label>
              <input style={inputStyle} value={form.nameFa} onChange={e => setForm(f => ({ ...f, nameFa: e.target.value }))} placeholder="مثال: ظروف چوبی" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: '#cdbfa8', fontFamily: 'var(--font-vazirmatn)' }}>نام انگلیسی</label>
              <input style={{ ...inputStyle, direction: 'ltr' }} value={form.nameEn} onChange={e => setForm(f => ({ ...f, nameEn: e.target.value }))} placeholder="e.g. Wooden Bowls" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="px-4 py-2 rounded text-sm"
              style={{ backgroundColor: '#c99a4b', color: '#1d140d', fontFamily: 'var(--font-vazirmatn)' }}>
              {saving ? 'در حال ذخیره...' : 'ذخیره'}
            </button>
            <button onClick={() => { setEditing(null); setAdding(false) }} className="px-4 py-2 rounded text-sm"
              style={{ backgroundColor: 'transparent', color: '#cdbfa8', border: '1px solid rgba(201,154,75,0.3)', fontFamily: 'var(--font-vazirmatn)' }}>
              انصراف
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p style={{ color: '#cdbfa8', fontFamily: 'var(--font-vazirmatn)' }}>در حال بارگذاری...</p>
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between p-4 rounded"
              style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.15)' }}>
              <div>
                <span style={{ color: '#f1e9da', fontFamily: 'var(--font-vazirmatn)', marginInlineEnd: '12px' }}>{cat.nameFa}</span>
                <span style={{ color: '#cdbfa8', fontFamily: 'var(--font-playfair)', fontSize: '0.85rem', direction: 'ltr' }}>{cat.nameEn}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(cat); setAdding(false); setForm({ nameFa: cat.nameFa, nameEn: cat.nameEn }) }}
                  className="px-3 py-1 text-xs rounded"
                  style={{ color: '#c99a4b', border: '1px solid rgba(201,154,75,0.3)', fontFamily: 'var(--font-vazirmatn)' }}>
                  ویرایش
                </button>
                <button onClick={() => setDeleteConfirm(cat.id)}
                  className="px-3 py-1 text-xs rounded"
                  style={{ color: '#e07070', border: '1px solid rgba(224,112,112,0.3)', fontFamily: 'var(--font-vazirmatn)' }}>
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="p-6 rounded max-w-sm w-full" style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.3)' }}>
            <h3 className="text-base mb-3" style={{ color: '#f1e9da', fontFamily: 'var(--font-nastaliq), serif', lineHeight: '2', fontWeight: 700 }}>آیا مطمئن هستید؟</h3>
            <p className="text-sm mb-5" style={{ color: '#cdbfa8', fontFamily: 'var(--font-vazirmatn)' }}>این دسته‌بندی حذف خواهد شد.</p>
            <div className="flex gap-3">
              <button onClick={() => remove(deleteConfirm)}
                className="px-4 py-2 rounded text-sm"
                style={{ backgroundColor: '#8b2020', color: '#f1e9da', fontFamily: 'var(--font-vazirmatn)' }}>
                بله، حذف کن
              </button>
              <button onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded text-sm"
                style={{ backgroundColor: 'transparent', color: '#cdbfa8', border: '1px solid rgba(201,154,75,0.3)', fontFamily: 'var(--font-vazirmatn)' }}>
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
