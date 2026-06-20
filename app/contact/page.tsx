'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { NuristaniDivider } from '@/components/site/NuristaniDivider'
import { useLang } from '@/lib/lang-context'
import { t } from '@/lib/i18n'

export default function ContactPage() {
  const { lang, dir } = useLang()
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(data => setSettings(data || {})).catch(() => {})
  }, [])

  const wa = settings['whatsapp_number'] || '93749274000'
  const email = settings['contact_email'] || 'info@nuristaniwood.com'
  const instagram = settings['instagram_url'] || 'https://instagram.com/nuristaniwood'
  const facebook = settings['facebook_url'] || 'https://facebook.com/nuristaniwood'

  return (
    <div style={{ backgroundColor: '#1d140d', minHeight: '100vh', direction: dir }}>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-widest mb-4"
            style={{ color: '#c99a4b', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', letterSpacing: '0.25em' }}>
            {lang === 'fa' ? 'ارتباط با ما' : 'Get in Touch'}
          </p>
          <h1
            className="mb-6"
            style={{
              fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
              fontSize: lang === 'fa' ? 'clamp(1.8rem, 5vw, 3rem)' : 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: '#f1e9da',
              lineHeight: lang === 'fa' ? '2.2' : '1.2',
            }}
          >
            {t(lang, 'contact_title')}
          </h1>
          <p style={{
            fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-cormorant), serif',
            fontStyle: lang === 'en' ? 'italic' : 'normal',
            color: '#cdbfa8',
            fontSize: lang === 'fa' ? '0.95rem' : '1.1rem',
            lineHeight: lang === 'fa' ? '2' : '1.8',
            marginBottom: '3rem',
          }}>
            {lang === 'fa'
              ? 'برای سفارش، سوال یا همکاری با ما تماس بگیرید.'
              : 'For orders, questions, or partnerships, reach out to us.'}
          </p>
        </section>

        <NuristaniDivider />

        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 rounded transition-all duration-300 hover:border-[rgba(201,154,75,0.5)]"
              style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.2)', textDecoration: 'none' }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.121 1.524 5.858L.057 23.486a.5.5 0 00.485.635l5.923-1.558A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.945 9.945 0 01-5.088-1.39l-.364-.218-3.77.993.993-3.652-.241-.382A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              <div className="text-center">
                <p style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)', fontWeight: 600, marginBottom: '4px' }}>
                  {t(lang, 'contact_whatsapp')}
                </p>
                <p style={{ color: '#cdbfa8', fontSize: '0.85rem', fontFamily: 'var(--font-playfair)', direction: 'ltr' }}>
                  +{wa}
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex flex-col items-center gap-4 p-8 rounded transition-all duration-300 hover:border-[rgba(201,154,75,0.5)]"
              style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.2)', textDecoration: 'none' }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201,154,75,0.1)', border: '1px solid rgba(201,154,75,0.3)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c99a4b" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="text-center">
                <p style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)', fontWeight: 600, marginBottom: '4px' }}>
                  {t(lang, 'contact_email')}
                </p>
                <p style={{ color: '#cdbfa8', fontSize: '0.85rem', fontFamily: 'var(--font-playfair)', direction: 'ltr' }}>
                  {email}
                </p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 rounded transition-all duration-300 hover:border-[rgba(201,154,75,0.5)]"
              style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.2)', textDecoration: 'none' }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201,154,75,0.08)', border: '1px solid rgba(201,154,75,0.25)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c99a4b" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#c99a4b" stroke="none"/>
                </svg>
              </div>
              <div className="text-center">
                <p style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)', fontWeight: 600, marginBottom: '4px' }}>
                  {t(lang, 'contact_instagram')}
                </p>
                <p style={{ color: '#cdbfa8', fontSize: '0.75rem', fontFamily: 'var(--font-playfair)', direction: 'ltr', overflowWrap: 'anywhere' }}>
                  {instagram.replace('https://', '')}
                </p>
              </div>
            </a>

            {/* Facebook */}
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 rounded transition-all duration-300 hover:border-[rgba(201,154,75,0.5)]"
              style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.2)', textDecoration: 'none' }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201,154,75,0.08)', border: '1px solid rgba(201,154,75,0.25)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#c99a4b">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="text-center">
                <p style={{ color: '#c99a4b', fontFamily: 'var(--font-playfair)', fontWeight: 600, marginBottom: '4px' }}>
                  {t(lang, 'contact_facebook')}
                </p>
                <p style={{ color: '#cdbfa8', fontSize: '0.75rem', fontFamily: 'var(--font-playfair)', direction: 'ltr', overflowWrap: 'anywhere' }}>
                  {facebook.replace('https://', '')}
                </p>
              </div>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
