'use client'
import { useState, useEffect } from 'react'
import { AdminLogin } from './components/AdminLogin'
import { AdminDashboard } from './components/AdminDashboard'

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_token')
    if (saved) setToken(saved)
  }, [])

  function handleLogin(t: string) {
    sessionStorage.setItem('admin_token', t)
    setToken(t)
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_token')
    setToken(null)
  }

  if (!token) return <AdminLogin onLogin={handleLogin} />
  return <AdminDashboard token={token} onLogout={handleLogout} />
}
