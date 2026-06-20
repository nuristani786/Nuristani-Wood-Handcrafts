import type { Metadata, Viewport } from 'next'
import {
  Noto_Nastaliq_Urdu,
  Vazirmatn,
  Playfair_Display,
  Cormorant_Garamond,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AgentationGuard } from '@/components/AgentationGuard'
import { HappySeedsWatermark } from '@/components/HappySeedsWatermark'
import { LangProvider } from '@/lib/lang-context'
import jsonMetadata from '../metadata.json'
import './globals.css'

const notoNastaliq = Noto_Nastaliq_Urdu({
  variable: '--font-nastaliq',
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const vazirmatn = Vazirmatn({
  variable: '--font-vazirmatn',
  subsets: ['arabic'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = jsonMetadata as Metadata

export const viewport: Viewport = {
  themeColor: '#1d140d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${notoNastaliq.variable} ${vazirmatn.variable} ${playfair.variable} ${cormorant.variable} antialiased`}
        style={{ backgroundColor: '#1d140d', color: '#f1e9da' }}
      >
        <LangProvider>
          {children}
        </LangProvider>
        <HappySeedsWatermark />
        <AgentationGuard />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
