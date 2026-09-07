import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { useI18n } from '../i18n'
import { fetchOccurrences } from '../services/gbif'
import { fetchGeneticRecords } from '../services/ncbi'
import { fetchLiterature } from '../services/literature'
import { StatusMessage } from '../components/StatusMessage'

export function DataAvailabilityPage() {
  const { t } = useI18n(); const [loading, setLoading] = useState(false); const [error, setError] = useState(false); const [values, setValues] = useState<Record<string, string | number> | null>(null)
  const load = async () => { setLoading(true); setError(false); try { const [occurrences, genetics, literature] = await Promise.all([fetchOccurrences({ limit: 100 }), fetchGeneticRecords(0, 50), fetchLiterature(25)]); const genes = new Set(genetics.records.map((record) => record.gene || record.marker).filter(Boolean)); setValues({ occurrences: occurrences.count, genetics: genetics.count, genes: genes.size, publications: literature.length, georeferenced: occurrences.records.filter((record) => record.latitude !== undefined).length, bold: t('common.notConnected') }) } catch { setError(true) } finally { setLoading(false) } }
  const cards = ['occurrences', 'genetics', 'genes', 'publications', 'georeferenced', 'bold']
  return <div className="page"><section className="page-header"><p className="eyebrow">{t('availability.kicker')}</p><h1>{t('availability.title')}</h1><p>{t('availability.description')}</p></section><button className="button primary" onClick={load} disabled={loading}><BarChart3 size={16} />{t('availability.load')}</button>{loading && <StatusMessage loading />}{error && <StatusMessage error onRetry={load} />}{values && <div className="metric-grid availability-grid">{cards.map((key) => <div className="metric" key={key}><span>{t(`availability.${key}`)}</span><strong>{values[key]}</strong><small>{key === 'bold' ? t('common.notConnected') : t('common.observed')}</small></div>)}</div>}<div className="notice"><BarChart3 size={18} /><span>{t('home.summaryText')}</span></div></div>
}
