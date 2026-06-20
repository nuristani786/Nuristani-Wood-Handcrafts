'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from './i18n'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  dir: 'rtl' | 'ltr'
}

const LangContext = createContext<LangContextType>({
  lang: 'fa',
  setLang: () => {},
  dir: 'rtl',
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fa')

  useEffect(() => {
    const saved = localStorage.getItem('nwh-lang') as Lang | null
    if (saved === 'en' || saved === 'fa') setLangState(saved)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('nwh-lang', l)
    document.documentElement.setAttribute('dir', l === 'fa' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', l === 'fa' ? 'fa' : 'en')
  }

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang === 'fa' ? 'fa' : 'en')
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, dir: lang === 'fa' ? 'rtl' : 'ltr' }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
