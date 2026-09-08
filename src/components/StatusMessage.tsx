import { AlertCircle, LoaderCircle } from 'lucide-react'
import { useI18n } from '../i18n'

export function StatusMessage({ loading, error, empty = false, onRetry }: { loading?: boolean; error?: boolean; empty?: boolean; onRetry?: () => void }) {
  const { t } = useI18n()
  if (loading) return <div className="status" role="status" aria-live="polite"><LoaderCircle className="spin" size={18} aria-hidden="true" /> {t('common.loading')}</div>
  if (error) return <div className="status error" role="alert"><AlertCircle size={18} aria-hidden="true" /> <span>{t('common.error')}</span>{onRetry && <button className="text-button" onClick={onRetry}>{t('common.retry')}</button>}</div>
  if (empty) return <div className="status" role="status">{t('common.empty')}</div>
  return null
}
