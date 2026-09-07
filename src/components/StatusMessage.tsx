import { AlertCircle, LoaderCircle } from 'lucide-react'
import { useI18n } from '../i18n'

export function StatusMessage({ loading, error, empty = false }: { loading?: boolean; error?: boolean; empty?: boolean }) {
  const { t } = useI18n()
  if (loading) return <div className="status"><LoaderCircle className="spin" size={18} /> {t('common.loading')}</div>
  if (error) return <div className="status error"><AlertCircle size={18} /> {t('common.error')}</div>
  if (empty) return <div className="status">{t('common.empty')}</div>
  return null
}
