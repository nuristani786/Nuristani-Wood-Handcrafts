'use client'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { NuristaniDivider } from '@/components/site/NuristaniDivider'
import { useLang } from '@/lib/lang-context'

export default function AboutPage() {
  const { lang, dir } = useLang()

  return (
    <div style={{ backgroundColor: '#1d140d', minHeight: '100vh', direction: dir }}>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-widest mb-4"
            style={{ color: '#c99a4b', fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic', letterSpacing: '0.25em' }}>
            {lang === 'fa' ? 'درباره ما' : 'About Us'}
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
            {lang === 'fa' ? 'داستان صنایع دستی نورستانی' : 'The Story of Nuristani Wood Handcrafts'}
          </h1>
          <p style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontStyle: 'italic',
            color: '#cdbfa8',
            fontSize: '1.1rem',
            lineHeight: '1.8',
          }}>
            Where ancient craft meets the modern world
          </p>
        </section>

        <NuristaniDivider />

        {/* Story */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"
                alt="Nuristani craftsman"
                loading="lazy"
                className="w-full rounded"
                style={{ border: '1px solid rgba(201,154,75,0.25)', aspectRatio: '4/3', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h2 className="mb-4"
                style={{
                  fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
                  fontSize: lang === 'fa' ? 'clamp(1.2rem, 3vw, 1.8rem)' : 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: '#c99a4b',
                  lineHeight: lang === 'fa' ? '2.2' : '1.3',
                }}>
                {lang === 'fa' ? 'ریشه‌های ما در نورستان' : 'Our Roots in Nuristan'}
              </h2>
              <p className="mb-4" style={{
                color: '#cdbfa8',
                fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-cormorant), serif',
                fontSize: lang === 'fa' ? '0.95rem' : '1.05rem',
                lineHeight: lang === 'fa' ? '2.1' : '1.9',
              }}>
                {lang === 'fa'
                  ? 'نورستان — ولایتی در شمال‌شرق افغانستان با کوهستان‌های سرسبز، رودخانه‌های پرخروش، و مردمانی که قرن‌هاست با چوب زندگی می‌کنند. چوب‌کاری در نورستان نه فقط یک حرفه، بلکه زبانی است که نسل به نسل منتقل می‌شود.'
                  : 'Nuristan — a province in northeastern Afghanistan with verdant mountains, rushing rivers, and people who have lived with wood for centuries. Woodcraft in Nuristan is not just a trade — it is a language passed from generation to generation.'}
              </p>
              <p style={{
                color: '#cdbfa8',
                fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-cormorant), serif',
                fontSize: lang === 'fa' ? '0.95rem' : '1.05rem',
                lineHeight: lang === 'fa' ? '2.1' : '1.9',
              }}>
                {lang === 'fa'
                  ? 'درختان گردو و سدر که از هزار سال پیش در این کوه‌ها ریشه دوانده‌اند، ماده خام اصلی کارگاه‌های ماست. هیچ درختی بدون نیاز قطع نمی‌شود.'
                  : 'Walnut and cedar trees that have rooted in these mountains for a thousand years are the primary raw material of our workshops. No tree is cut without need.'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className={`${lang === 'en' ? 'order-2' : 'order-2 md:order-1'}`}>
              <h2 className="mb-4"
                style={{
                  fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
                  fontSize: lang === 'fa' ? 'clamp(1.2rem, 3vw, 1.8rem)' : 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: '#c99a4b',
                  lineHeight: lang === 'fa' ? '2.2' : '1.3',
                }}>
                {lang === 'fa' ? 'صنعتگران ما' : 'Our Artisans'}
              </h2>
              <p className="mb-4" style={{
                color: '#cdbfa8',
                fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-cormorant), serif',
                fontSize: lang === 'fa' ? '0.95rem' : '1.05rem',
                lineHeight: lang === 'fa' ? '2.1' : '1.9',
              }}>
                {lang === 'fa'
                  ? 'با بیش از ۱۲ استادکار همکار از روستاهای مختلف نورستان، هر محصول ما دست‌کم چند روز وقت و مهارت یک انسان را در خود دارد. ابزارهای سنتی — اره، تیشه، قلم چوب — همچنان در کنار ابزارهای مدرن به کار می‌روند تا دقت حفظ شود.'
                  : 'Working with more than 12 master craftsmen from various villages of Nuristan, each of our products contains at minimum several days of a human being\'s time and skill. Traditional tools — saws, adzes, chisels — still work alongside modern instruments to preserve precision.'}
              </p>
            </div>
            <div className={`${lang === 'en' ? 'order-1' : 'order-1 md:order-2'}`}>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
                alt="Artisan workshop"
                loading="lazy"
                className="w-full rounded"
                style={{ border: '1px solid rgba(201,154,75,0.25)', aspectRatio: '4/3', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        <NuristaniDivider />

        {/* Location */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="p-8 rounded" style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.2)' }}>
            <div className="text-4xl mb-4">📍</div>
            <h3 style={{
              fontFamily: lang === 'fa' ? 'var(--font-nastaliq), serif' : 'var(--font-playfair), serif',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#c99a4b',
              lineHeight: lang === 'fa' ? '2.2' : '1.4',
              marginBottom: '0.75rem',
            }}>
              {lang === 'fa' ? 'نورستان، افغانستان' : 'Nuristan, Afghanistan'}
            </h3>
            <p style={{
              color: '#cdbfa8',
              fontFamily: lang === 'fa' ? 'var(--font-vazirmatn)' : 'var(--font-cormorant), serif',
              fontStyle: lang === 'en' ? 'italic' : 'normal',
              fontSize: lang === 'fa' ? '0.9rem' : '1rem',
              lineHeight: lang === 'fa' ? '2' : '1.8',
            }}>
              {lang === 'fa'
                ? 'کارگاه‌های ما در دل کوهستان‌های شمال‌شرق افغانستان قرار دارند، در ارتفاعی بیش از ۲۰۰۰ متر از سطح دریا.'
                : 'Our workshops are nestled in the mountains of northeastern Afghanistan, at elevations exceeding 2000 meters above sea level.'}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
