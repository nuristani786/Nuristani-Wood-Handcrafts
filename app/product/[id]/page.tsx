'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { ProductCard } from '@/components/site/ProductCard'
import { NuristaniDivider } from '@/components/site/NuristaniDivider'
import { useLang } from '@/lib/lang-context'
import { t, formatPrice } from '@/lib/i18n'

interface Product {
  id: number
  nameFa: string
  nameEn: string
  price: number
  descriptionFa: string
  descriptionEn: string
  imageUrls: string[]
  inStock: boolean
  categoryId?: number | null
  categoryNameFa?: string | null
  categoryNameEn?: string | null
  dimensions?: string | null
  weight?: string | null
  featured: boolean
}

export default function ProductPage() {
  const params = useParams()
  const { lang, dir } = useLang()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [activeImg, setActiveImg] = useState(0)
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => setSettings(data || {})).catch(() => {})
  }, [])

  useEffect(() => {
    if (!params.id) return
    setLoading(true)
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.id) {
          setProduct(data)
          setActiveImg(0)
          if (data.categoryId) {
            fetch(`/api/products?category=${data.categoryId}`)
              .then((r) => r.json())
              .then((all) => Array.isArray(all) && setRelated(all.filter((p: Product) => p.id !== data.id).slice(0, 3)))
              .catch(() => {})
          }
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div style={{ backgroundColor: '#1d140d', minHeight: '100vh' }}>
        <Header />
        <div className="max-w-6xl mx-auto px-4 pt-28 pb-20 animate-pulse">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-square rounded" style={{ backgroundColor: '#2b1d14' }} />
            <div className="space-y-4">
              <div className="h-6 rounded" style={{ backgroundColor: '#2b1d14', width: '70%' }} />
              <div className="h-10 rounded" style={{ backgroundColor: '#2b1d14', width: '90%' }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: '#1d140d', minHeight: '100vh', direction: dir }}>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <p style={{ color: '#cdbfa8' }}>محصول یافت نشد</p>
        </div>
        <Footer />
      </div>
    )
  }

  const name = lang === 'fa' ? product.nameFa : product.nameEn
  const description = lang === 'fa' ? product.descriptionFa : product.descriptionEn
  const categoryName = lang === 'fa' ? product.categoryNameFa : product.categoryNameEn
  const images = product.imageUrls?.length > 0 ? product.imageUrls : ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800']
  const waNumber = settings['whatsapp_number'] || '93749274000'
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  const waMessage = lang === 'fa'
    ? `سلام، می‌خواهم این محصول را سفارش دهم: ${name} - ${t(lang, 'wa_price')}: ${formatPrice(product.price)} - ${t(lang, 'wa_link')}: ${pageUrl}`
    : `Hello, I would like to order this product: ${name} - Price: ${formatPrice(product.price)} - Link: ${pageUrl}`

  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`

  return (
    <div style={{ backgroundColor: '#1d140d', minHeight: '100vh', direction: dir }}>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: '#cdbfa8' }}>
            <Link href="/" className="hover:text-[#c99a4b] transition-colors"
              style={{ fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
              {lang === 'fa' ? 'خانه' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#c99a4b] transition-colors"
              style={{ fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
              {t(lang, 'nav_products')}
            </Link>
            <span>/</span>
            <span style={{ color: '#f1e9da', fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
              {name}
            </span>
          </nav>

          {/* Product detail */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Gallery */}
            <div>
              <div
                className="rounded overflow-hidden mb-3"
                style={{ border: '1px solid rgba(201,154,75,0.25)' }}
              >
                <img
                  src={images[activeImg]}
                  alt={name}
                  className="w-full object-cover"
                  style={{ aspectRatio: '1', cursor: 'zoom-in' }}
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className="rounded overflow-hidden transition-all"
                      style={{
                        width: '64px',
                        height: '64px',
                        border: i === activeImg ? '2px solid #c99a4b' : '1px solid rgba(201,154,75,0.2)',
                      }}
                    >
                      <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {categoryName && (
                <p className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)', letterSpacing: '0.15em' }}>
                  {categoryName}
                </p>
              )}
              <h1
                className="mb-4"
                style={{
                  fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
                  fontSize: lang === 'fa' ? 'clamp(1.3rem, 4vw, 2rem)' : 'clamp(1.5rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: '#f1e9da',
                  lineHeight: lang === 'fa' ? '2.2' : '1.3',
                }}
              >
                {name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-4 mb-4">
                <span style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)', fontSize: '1.75rem', fontWeight: 700 }}>
                  {formatPrice(product.price)}
                </span>
                <span
                  className="px-2 py-0.5 text-xs rounded"
                  style={{
                    backgroundColor: product.inStock ? 'rgba(62,92,69,0.3)' : 'rgba(100,40,40,0.3)',
                    color: product.inStock ? '#5b7d62' : '#c07070',
                    border: `1px solid ${product.inStock ? 'rgba(91,125,98,0.4)' : 'rgba(192,112,112,0.3)'}`,
                    fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)',
                  }}
                >
                  {t(lang, product.inStock ? 'in_stock' : 'out_of_stock')}
                </span>
              </div>

              {/* Description */}
              <p
                className="mb-6"
                style={{
                  color: '#cdbfa8',
                  fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-cormorant), serif',
                  fontSize: lang === 'fa' ? '0.95rem' : '1.05rem',
                  lineHeight: lang === 'fa' ? '2.1' : '1.8',
                }}
              >
                {description}
              </p>

              {/* Specs */}
              {(product.dimensions || product.weight) && (
                <div className="mb-6 space-y-2">
                  {product.dimensions && (
                    <div className="flex gap-3 text-sm">
                      <span style={{ color: '#c99a4b', minWidth: '80px', fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
                        {t(lang, 'dimensions_label')}:
                      </span>
                      <span style={{ color: '#f1e9da', fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
                        {product.dimensions}
                      </span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex gap-3 text-sm">
                      <span style={{ color: '#c99a4b', minWidth: '80px', fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
                        {t(lang, 'weight_label')}:
                      </span>
                      <span style={{ color: '#f1e9da', fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
                        {product.weight}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* WhatsApp Order Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded text-base font-medium transition-all duration-300 hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: '#25D366',
                  color: '#fff',
                  fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)',
                  fontSize: lang === 'fa' ? '1rem' : '1rem',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.121 1.524 5.858L.057 23.486a.5.5 0 00.485.635.5.5 0 00.132-.018l5.791-1.525A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.945 9.945 0 01-5.088-1.39l-.364-.218-3.77.993.993-3.652-.241-.382A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                {t(lang, 'order_whatsapp')}
              </a>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <>
            <NuristaniDivider />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
              <h2
                className="mb-8"
                style={{
                  fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
                  fontSize: lang === 'fa' ? 'clamp(1.2rem, 3.5vw, 1.8rem)' : 'clamp(1.5rem, 3.5vw, 2rem)',
                  fontWeight: 700,
                  color: '#f1e9da',
                  lineHeight: lang === 'fa' ? '2.2' : '1.3',
                }}
              >
                {t(lang, 'related_products')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
