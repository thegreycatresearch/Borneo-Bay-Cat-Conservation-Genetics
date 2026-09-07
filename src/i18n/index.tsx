import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import es from './es/common.json'
import en from './en/common.json'

type Locale = 'es' | 'en'
type Messages = typeof es

const messages: Record<Locale, Messages> = { es, en }

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function resolve(object: unknown, path: string): string {
  return path.split('.').reduce<unknown>((value, part) => (value as Record<string, unknown>)?.[part], object) as string || path
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('locale') as Locale) || 'es')
  useEffect(() => {
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }, [locale])
  const value = useMemo(() => ({ locale, setLocale, t: (key: string) => resolve(messages[locale], key) }), [locale])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
