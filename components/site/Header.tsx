'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'
import { t } from '@/lib/i18n'

export function Header() {
  const { lang, setLang, dir } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/products', label: t(lang, 'nav_products') },
    { href: '/about', label: t(lang, 'nav_about') },
    { href: '/contact', label: t(lang, 'nav_contact') },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: 'rgba(29,20,13,0.95)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(201,154,75,0.2)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span
              className="text-lg font-nastaliq"
              style={{
                fontFamily: 'var(--font-nastaliq), serif',
                color: '#c99a4b',
                lineHeight: '2',
                fontWeight: 700,
              }}
            >
              {lang === 'fa' ? 'نورستانی' : 'Nuristani'}
            </span>
            <span
              style={{
                fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-cormorant), serif',
                color: '#cdbfa8',
                fontSize: '0.65rem',
                fontStyle: lang === 'en' ? 'italic' : 'normal',
                letterSpacing: '0.05em',
              }}
            >
              {lang === 'fa' ? 'صنایع دستی چوبی' : 'Wood Handcrafts'}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:text-[#c99a4b]"
                style={{
                  color: '#cdbfa8',
                  fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-playfair), serif',
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              className="px-3 py-1 text-xs rounded border transition-all hover:border-[#c99a4b] hover:text-[#c99a4b]"
              style={{
                borderColor: 'rgba(201,154,75,0.4)',
                color: '#cdbfa8',
                fontFamily: lang === 'fa' ? 'var(--font-playfair), serif' : 'var(--font-vazirmatn), sans-serif',
              }}
            >
              {t(lang, 'lang_switch')}
            </button>
          </nav>

          {/* Mobile: lang toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              className="px-2 py-1 text-xs rounded border"
              style={{ borderColor: 'rgba(201,154,75,0.4)', color: '#cdbfa8' }}
            >
              {t(lang, 'lang_switch')}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded"
              style={{ color: '#c99a4b' }}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {menuOpen ? (
                  <>
                    <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t pb-4 pt-3 flex flex-col gap-3" style={{ borderColor: 'rgba(201,154,75,0.15)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 text-sm transition-colors hover:text-[#c99a4b]"
                style={{
                  color: '#cdbfa8',
                  fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-playfair), serif',
                  textAlign: dir === 'rtl' ? 'right' : 'left',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
