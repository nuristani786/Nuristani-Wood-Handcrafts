'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { ProductCard } from '@/components/site/ProductCard'
import { NuristaniDivider } from '@/components/site/NuristaniDivider'
import { useLang } from '@/lib/lang-context'
import { t } from '@/lib/i18n'

interface Category {
  id: number
  nameFa: string
  nameEn: string
}

interface Product {
  id: number
  nameFa: string
  nameEn: string
  price: number
  imageUrls: string[]
  inStock: boolean
  categoryNameFa?: string | null
  categoryNameEn?: string | null
  featured: boolean
  categoryId?: number | null
}

export default function ProductsPage() {
  const { lang, dir } = useLang()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCat, setSelectedCat] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setCategories(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (selectedCat) params.set('category', selectedCat.toString())
    if (search) params.set('search', search)

    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [selectedCat, search])

  return (
    <div style={{ backgroundColor: '#1d140d', minHeight: '100vh', direction: dir }}>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        {/* Page title */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <h1
            style={{
              fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
              fontSize: lang === 'fa' ? 'clamp(1.5rem, 5vw, 2.5rem)' : 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: '#f1e9da',
              lineHeight: lang === 'fa' ? '2.2' : '1.2',
              marginBottom: '0.5rem',
            }}
          >
            {t(lang, 'all_products')}
          </h1>
          <p style={{ color: '#cdbfa8', fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-cormorant), serif', fontStyle: lang === 'en' ? 'italic' : 'normal' }}>
            {lang === 'fa' ? 'همه محصولات دست‌ساز ما' : 'All of our handcrafted pieces'}
          </p>
        </div>

        <NuristaniDivider />

        {/* Filters */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder={t(lang, 'search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded text-sm outline-none"
                style={{
                  backgroundColor: '#2b1d14',
                  border: '1px solid rgba(201,154,75,0.3)',
                  color: '#f1e9da',
                  fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)',
                }}
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCat(null)}
                className="px-3 py-1.5 text-xs rounded transition-all"
                style={{
                  backgroundColor: selectedCat === null ? '#c99a4b' : 'transparent',
                  color: selectedCat === null ? '#1d140d' : '#cdbfa8',
                  border: '1px solid rgba(201,154,75,0.4)',
                  fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)',
                }}
              >
                {t(lang, 'filter_all')}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className="px-3 py-1.5 text-xs rounded transition-all"
                  style={{
                    backgroundColor: selectedCat === cat.id ? '#c99a4b' : 'transparent',
                    color: selectedCat === cat.id ? '#1d140d' : '#cdbfa8',
                    border: '1px solid rgba(201,154,75,0.4)',
                    fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)',
                  }}
                >
                  {lang === 'fa' ? cat.nameFa : cat.nameEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded overflow-hidden animate-pulse" style={{ backgroundColor: '#2b1d14' }}>
                  <div className="aspect-square" style={{ backgroundColor: '#3a2518' }} />
                  <div className="p-4 space-y-2">
                    <div className="h-3 rounded" style={{ backgroundColor: '#3a2518', width: '60%' }} />
                    <div className="h-4 rounded" style={{ backgroundColor: '#3a2518', width: '80%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: '#cdbfa8', fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
                {t(lang, 'no_products')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
