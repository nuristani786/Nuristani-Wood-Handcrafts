'use client'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'
import { t, formatPrice } from '@/lib/i18n'

interface ProductCardProps {
  id: number
  nameFa: string
  nameEn: string
  price: number
  imageUrls: string[]
  inStock: boolean
  categoryNameFa?: string | null
  categoryNameEn?: string | null
}

export function ProductCard({ id, nameFa, nameEn, price, imageUrls, inStock, categoryNameFa, categoryNameEn }: ProductCardProps) {
  const { lang } = useLang()
  const name = lang === 'fa' ? nameFa : nameEn
  const categoryName = lang === 'fa' ? categoryNameFa : categoryNameEn
  const imgSrc = imageUrls?.[0] || `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600`

  return (
    <Link href={`/product/${id}`} className="group block">
      <div
        className="rounded overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: '#2b1d14',
          border: '1px solid rgba(201,154,75,0.2)',
        }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={imgSrc}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Stock badge */}
          {!inStock && (
            <div
              className="absolute top-2 end-2 px-2 py-0.5 text-xs rounded"
              style={{ backgroundColor: 'rgba(29,20,13,0.85)', color: '#cdbfa8', border: '1px solid rgba(201,154,75,0.3)' }}
            >
              {t(lang, 'out_of_stock')}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4">
          {categoryName && (
            <p className="text-xs mb-1 uppercase tracking-wider" style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)' }}>
              {categoryName}
            </p>
          )}
          <h3
            className="text-sm sm:text-base mb-2 line-clamp-2"
            style={{
              color: '#f1e9da',
              fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-playfair), serif',
              fontWeight: 500,
              lineHeight: lang === 'fa' ? '1.8' : '1.4',
            }}
          >
            {name}
          </h3>
          <p
            className="font-semibold"
            style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)', fontSize: '1rem' }}
          >
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </Link>
  )
}
