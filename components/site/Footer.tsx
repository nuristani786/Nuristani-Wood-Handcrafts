'use client'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'
import { t } from '@/lib/i18n'
import { NuristaniDivider } from './NuristaniDivider'

export function Footer() {
  const { lang } = useLang()

  return (
    <footer style={{ backgroundColor: '#2b1d14', borderTop: '1px solid rgba(201,154,75,0.15)' }}>
      <NuristaniDivider />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-start">
            <div
              className="text-xl mb-1"
              style={{
                fontFamily: 'var(--font-nastaliq), serif',
                color: '#c99a4b',
                lineHeight: '2',
                fontWeight: 700,
              }}
            >
              {lang === 'fa' ? 'صنایع دستی چوبی نورستانی' : 'Nuristani Wood Handcrafts'}
            </div>
            <p style={{ color: '#cdbfa8', fontSize: '0.8rem', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}>
              {lang === 'fa' ? 'ساخته‌شده با افتخار در نورستان، افغانستان' : 'Proudly made in Nuristan, Afghanistan'}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: '#cdbfa8' }}>
            <Link href="/products" className="hover:text-[#c99a4b] transition-colors"
              style={{ fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
              {t(lang, 'nav_products')}
            </Link>
            <Link href="/about" className="hover:text-[#c99a4b] transition-colors"
              style={{ fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
              {t(lang, 'nav_about')}
            </Link>
            <Link href="/contact" className="hover:text-[#c99a4b] transition-colors"
              style={{ fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-playfair)' }}>
              {t(lang, 'nav_contact')}
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-4 text-center text-xs" style={{ color: '#6b5a4a', borderTop: '1px solid rgba(201,154,75,0.1)' }}>
          © {new Date().getFullYear()} Nuristani Wood Handcrafts — {t(lang, 'footer_rights')}
        </div>
      </div>
    </footer>
  )
}
