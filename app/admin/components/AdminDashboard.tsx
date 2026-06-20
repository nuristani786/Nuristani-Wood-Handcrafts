'use client'
import { useState } from 'react'
import { ProductsManager } from './ProductsManager'
import { CategoriesManager } from './CategoriesManager'
import { SettingsManager } from './SettingsManager'

type Tab = 'products' | 'categories' | 'settings'

const tabs = [
  { id: 'products' as Tab, label: 'محصولات', icon: '◈' },
  { id: 'categories' as Tab, label: 'دسته‌بندی‌ها', icon: '◇' },
  { id: 'settings' as Tab, label: 'تنظیمات', icon: '◆' },
]

export function AdminDashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('products')

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1d140d' }} dir="rtl">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: 'rgba(29,20,13,0.95)', borderColor: 'rgba(201,154,75,0.2)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span style={{ fontFamily: 'var(--font-nastaliq), serif', color: '#c99a4b', lineHeight: '2', fontWeight: 700 }}>
              پنل مدیریت
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs px-3 py-1.5 rounded border transition-all"
              style={{ color: '#cdbfa8', borderColor: 'rgba(201,154,75,0.3)', fontFamily: 'var(--font-vazirmatn)' }}
            >
              مشاهده سایت
            </a>
            <button
              onClick={onLogout}
              className="text-xs px-3 py-1.5 rounded border transition-all hover:border-red-500 hover:text-red-400"
              style={{ color: '#cdbfa8', borderColor: 'rgba(201,154,75,0.3)', fontFamily: 'var(--font-vazirmatn)' }}
            >
              خروج
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 text-sm rounded-t transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? '#2b1d14' : 'transparent',
                color: activeTab === tab.id ? '#c99a4b' : '#cdbfa8',
                fontFamily: 'var(--font-vazirmatn)',
                borderBottom: activeTab === tab.id ? '2px solid #c99a4b' : '2px solid transparent',
              }}
            >
              <span className="me-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'products' && <ProductsManager token={token} />}
        {activeTab === 'categories' && <CategoriesManager token={token} />}
        {activeTab === 'settings' && <SettingsManager token={token} />}
      </main>
    </div>
  )
}
