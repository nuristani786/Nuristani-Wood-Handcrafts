'use client'
import { useState } from 'react'

export function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        onLogin(data.token)
      } else {
        setError(data.error || 'رمز عبور نادرست است')
      }
    } catch {
      setError('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#1d140d' }}
      dir="rtl"
    >
      <div
        className="w-full max-w-sm p-8 rounded"
        style={{ backgroundColor: '#2b1d14', border: '1px solid rgba(201,154,75,0.3)' }}
      >
        <div className="text-center mb-8">
          <h1
            className="text-2xl mb-1"
            style={{ fontFamily: 'var(--font-nastaliq), serif', color: '#c99a4b', lineHeight: '2', fontWeight: 700 }}
          >
            پنل مدیریت
          </h1>
          <p style={{ color: '#cdbfa8', fontSize: '0.8rem', fontFamily: 'var(--font-vazirmatn)' }}>
            Nuristani Wood Handcrafts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm mb-2"
              style={{ color: '#cdbfa8', fontFamily: 'var(--font-vazirmatn)' }}
            >
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded outline-none"
              style={{
                backgroundColor: '#1d140d',
                border: '1px solid rgba(201,154,75,0.3)',
                color: '#f1e9da',
                fontFamily: 'var(--font-vazirmatn)',
              }}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: '#e07070', fontFamily: 'var(--font-vazirmatn)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-medium transition-all hover:opacity-90 disabled:opacity-60"
            style={{
              backgroundColor: '#c99a4b',
              color: '#1d140d',
              fontFamily: 'var(--font-vazirmatn)',
            }}
          >
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
      </div>
    </div>
  )
}
