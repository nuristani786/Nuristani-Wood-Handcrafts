'use client'
import { useState, useEffect } from 'react'

export function SettingsManager({ token }: { token: string }) {
  const [form, setForm] = useState({
    whatsapp_number: '',
    contact_email: '',
    instagram_url: '',
    facebook_url: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setForm(f => ({
            whatsapp_number: data.whatsapp_number ?? f.whatsapp_number,
            contact_email: data.contact_email ?? f.contact_email,
            instagram_url: data.instagram_url ?? f.instagram_url,
            facebook_url: data.facebook_url ?? f.facebook_url,
          }))
        }
      })
      .catch(() => {})
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminToken: token, ...form }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    backgroundColor: '#1d140d',
    border: '1px solid rgba(201,154,75,0.3)',
    color: '#f1e9da',
    padding: '10px 14px',
    borderRadius: '4px',
    outline: 'none',
    width: '100%',
    fontSize: '0.9rem',
  }

  return (
    <div>
      <h2 style={{ color: '#c99a4b', fontFamily: 'var(--font-nastaliq), serif', lineHeight: '2', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        تنظیمات عمومی
      </h2>

      <form onSubmit={handleSave} className="max-w-xl space-y-5">
        <div>
          <label className="block text-sm mb-1" style={{ color: '#c99a4b', fontFamily: 'var(--font-vazirmatn)' }}>
            شماره واتساپ (بدون + )
          </label>
          <input
            style={{ ...inputStyle, direction: 'ltr' }}
            value={form.whatsapp_number}
            onChange={e => setForm(f => ({ ...f, whatsapp_number: e.target.value }))}
            placeholder="93749274000"
          />
          <p className="text-xs mt-1" style={{ color: '#6b5a4a', fontFamily: 'var(--font-vazirmatn)' }}>مثال: 93749274000</p>
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: '#c99a4b', fontFamily: 'var(--font-vazirmatn)' }}>
            ایمیل تماس
          </label>
          <input
            type="email"
            style={{ ...inputStyle, direction: 'ltr' }}
            value={form.contact_email}
            onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))}
            placeholder="info@nuristaniwood.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: '#c99a4b', fontFamily: 'var(--font-vazirmatn)' }}>
            لینک اینستاگرام
          </label>
          <input
            style={{ ...inputStyle, direction: 'ltr' }}
            value={form.instagram_url}
            onChange={e => setForm(f => ({ ...f, instagram_url: e.target.value }))}
            placeholder="https://instagram.com/nuristaniwood"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" style={{ color: '#c99a4b', fontFamily: 'var(--font-vazirmatn)' }}>
            لینک فیسبوک
          </label>
          <input
            style={{ ...inputStyle, direction: 'ltr' }}
            value={form.facebook_url}
            onChange={e => setForm(f => ({ ...f, facebook_url: e.target.value }))}
            placeholder="https://facebook.com/nuristaniwood"
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded font-medium transition-all hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: '#c99a4b', color: '#1d140d', fontFamily: 'var(--font-vazirmatn)' }}
          >
            {saving ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
          </button>
          {saved && (
            <span style={{ color: '#5b7d62', fontSize: '0.85rem', fontFamily: 'var(--font-vazirmatn)' }}>
              ✓ تنظیمات ذخیره شد
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
