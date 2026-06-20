'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { NuristaniDivider } from '@/components/site/NuristaniDivider'
import { ProductCard } from '@/components/site/ProductCard'
import { useLang } from '@/lib/lang-context'
import { t } from '@/lib/i18n'

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
}

export default function HomePage() {
  const { lang, dir } = useLang()
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setFeatured(data))
      .catch(() => {})
  }, [])

  return (
    <div style={{ backgroundColor: '#1d140d', minHeight: '100vh', direction: dir }}>
      <Header />

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center min-h-screen px-6"
        style={{ paddingTop: '64px' }}
      >
        {/* Background texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, rgba(201,154,75,0.06) 0%, transparent 70%)`,
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: '#c99a4b', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', letterSpacing: '0.25em' }}
          >
            {lang === 'fa' ? 'افغانستان — نورستان' : 'Afghanistan — Nuristan'}
          </p>

          <h1
            className="mb-4"
            style={{
              fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
              fontSize: lang === 'fa' ? 'clamp(2rem, 6vw, 3.5rem)' : 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: '#f1e9da',
              lineHeight: lang === 'fa' ? '2.2' : '1.2',
            }}
          >
            {lang === 'fa' ? 'صنایع دستی چوبی نورستانی' : 'Nuristani Wood Handcrafts'}
          </h1>

          <p
            className="mb-10 max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: '#cdbfa8',
              lineHeight: '1.7',
            }}
          >
            Handcrafted in the Mountains of Nuristan, Afghanistan
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 rounded text-sm font-medium transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: '#c99a4b',
                color: '#1d140d',
                fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)',
              }}
            >
              {t(lang, 'hero_cta_products')}
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded text-sm font-medium transition-all duration-300"
              style={{
                border: '1px solid rgba(201,154,75,0.5)',
                color: '#c99a4b',
                fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)',
              }}
            >
              {t(lang, 'hero_cta_story')}
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[rgba(201,154,75,0.4)]" />
        </div>
      </section>

      <NuristaniDivider />

      {/* Philosophy */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={dir === 'rtl' ? 'order-2 md:order-1' : 'order-1'}>
            <p className="text-xs uppercase tracking-widest mb-3"
              style={{ color: '#c99a4b', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', letterSpacing: '0.2em' }}>
              {lang === 'fa' ? 'فلسفه ما' : 'Our Philosophy'}
            </p>
            <h2
              className="mb-5"
              style={{
                fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
                fontSize: lang === 'fa' ? 'clamp(1.4rem, 4vw, 2rem)' : 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#f1e9da',
                lineHeight: lang === 'fa' ? '2.2' : '1.3',
              }}
            >
              {lang === 'fa' ? 'هنر دیرینه کوهستان‌های نورستان' : 'The Ancient Art of Nuristan Mountains'}
            </h2>
            <p
              className="leading-relaxed mb-4"
              style={{
                color: '#cdbfa8',
                fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-cormorant), serif',
                fontSize: lang === 'fa' ? '0.95rem' : '1.05rem',
                lineHeight: lang === 'fa' ? '2' : '1.8',
              }}
            >
              {lang === 'fa'
                ? 'در دل کوهستان‌های نورستان، جایی که طبیعت دست‌نخورده باقی مانده، صنعتگران ما با چوب‌های گردو و سدر کار می‌کنند. هر قطعه داستانی دارد — از دست‌هایی که آن را شکل داده‌اند تا نقوشی که از نسل‌ها پیش به ارث رسیده.'
                : 'In the heart of Nuristan\'s mountains, where nature remains untouched, our artisans work with walnut and cedar wood. Each piece tells a story — from the hands that shaped it to the patterns inherited from generations past.'}
            </p>
            <p
              style={{
                color: '#cdbfa8',
                fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-cormorant), serif',
                fontSize: lang === 'fa' ? '0.95rem' : '1.05rem',
                lineHeight: lang === 'fa' ? '2' : '1.8',
              }}
            >
              {lang === 'fa'
                ? 'ما به شما این افتخار را می‌دهیم که یک اثر هنری واقعی را — با تمام نقص‌های زیبایش — به خانه‌تان ببرید.'
                : 'We give you the privilege of bringing a genuine artwork — with all its beautiful imperfections — into your home.'}
            </p>
          </div>
          <div className={dir === 'rtl' ? 'order-1 md:order-2' : 'order-2'}>
            <div
              className="rounded overflow-hidden"
              style={{ border: '1px solid rgba(201,154,75,0.25)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800"
                alt={lang === 'fa' ? 'کارگاه صنعتگران نورستانی' : 'Nuristani artisan workshop'}
                loading="lazy"
                className="w-full object-cover"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </div>
        </div>
      </section>

      <NuristaniDivider />

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2
            style={{
              fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
              fontSize: lang === 'fa' ? 'clamp(1.2rem, 3.5vw, 1.8rem)' : 'clamp(1.5rem, 3.5vw, 2.2rem)',
              fontWeight: 700,
              color: '#f1e9da',
              lineHeight: lang === 'fa' ? '2.2' : '1.3',
            }}
          >
            {t(lang, 'section_featured')}
          </h2>
          <Link
            href="/products"
            className="text-sm hover:text-[#e0bd7e] transition-colors"
            style={{ color: '#c99a4b', fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}
          >
            {lang === 'fa' ? 'مشاهده همه ←' : '← View All'}
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded overflow-hidden animate-pulse"
                style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.1)' }}
              >
                <div className="aspect-square" style={{ backgroundColor: '#3a2518' }} />
                <div className="p-4 space-y-2">
                  <div className="h-3 rounded" style={{ backgroundColor: '#3a2518', width: '60%' }} />
                  <div className="h-4 rounded" style={{ backgroundColor: '#3a2518', width: '80%' }} />
                  <div className="h-4 rounded" style={{ backgroundColor: '#3a2518', width: '40%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </section>

      <NuristaniDivider />

      {/* Trust Bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: '✦', label: t(lang, 'trust_handmade'), value: lang === 'fa' ? '۱۰۰٪' : '100%' },
            { icon: '◈', label: t(lang, 'trust_artisans'), value: lang === 'fa' ? '۱۲+' : '12+' },
            { icon: '◆', label: t(lang, 'trust_shipping'), value: lang === 'fa' ? 'جهانی' : 'Global' },
            { icon: '◇', label: t(lang, 'trust_wood'), value: lang === 'fa' ? 'گردو و سدر' : 'Walnut & Cedar' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <span style={{ color: '#c99a4b', fontSize: '1.5rem' }}>{item.icon}</span>
              <div
                className="text-xl sm:text-2xl font-bold"
                style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)' }}
              >
                {item.value}
              </div>
              <p
                className="text-xs sm:text-sm"
                style={{
                  color: '#cdbfa8',
                  fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)',
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
