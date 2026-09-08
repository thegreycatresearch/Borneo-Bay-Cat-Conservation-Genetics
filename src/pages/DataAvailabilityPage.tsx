import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { useI18n } from '../i18n'
import { fetchOccurrences } from '../services/gbif'
import { fetchGeneticRecords } from '../services/ncbi'
import { fetchLiterature } from '../services/literature'
import { StatusMessage } from '../components/StatusMessage'

type SourceAvailability = { key: string; status: 'available' | 'limited' | 'unavailable' | 'notConnected'; records: string | number; queriedAt?: string; limitation: string; url: string }

export function DataAvailabilityPage() {
  const { t } = useI18n(); const [loading, setLoading] = useState(false); const [sources, setSources] = useState<SourceAvailability[] | null>(null)
  const load = async () => { setLoading(true); const queriedAt = new Date().toISOString(); const results = await Promise.allSettled([fetchOccurrences({ limit: 100 }), fetchGeneticRecords(0, 50), fetchLiterature(25)]); const [occurrences, genetics, literature] = results; setSources([
    occurrences.status === 'fulfilled' ? { key: 'gbif', status: 'limited', records: occurrences.value.count, queriedAt: occurrences.value.records[0]?.retrievedAt || queriedAt, limitation: t('availability.gbifLimit'), url: 'https://www.gbif.org/' } : { key: 'gbif', status: 'unavailable', records: t('common.noData'), limitation: t('availability.unavailableLimit'), url: 'https://www.gbif.org/' },
    genetics.status === 'fulfilled' ? { key: 'ncbi', status: 'limited', records: genetics.value.count, queriedAt: genetics.value.records[0]?.retrievedAt || queriedAt, limitation: t('availability.ncbiLimit'), url: 'https://www.ncbi.nlm.nih.gov/nuccore/' } : { key: 'ncbi', status: 'unavailable', records: t('common.noData'), limitation: t('availability.unavailableLimit'), url: 'https://www.ncbi.nlm.nih.gov/' },
    literature.status === 'fulfilled' ? { key: 'pubmed', status: 'available', records: literature.value.length, queriedAt: literature.value[0]?.retrievedAt || queriedAt, limitation: t('availability.pubmedLimit'), url: 'https://pubmed.ncbi.nlm.nih.gov/' } : { key: 'pubmed', status: 'unavailable', records: t('common.noData'), limitation: t('availability.unavailableLimit'), url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { key: 'bold', status: 'notConnected', records: t('common.noData'), limitation: t('availability.boldLimit'), url: 'https://www.boldsystems.org/' },
    { key: 'crossref', status: 'notConnected', records: t('common.noData'), limitation: t('availability.crossrefLimit'), url: 'https://www.crossref.org/' },
    { key: 'dryad', status: 'notConnected', records: t('common.noData'), limitation: t('availability.dryadLimit'), url: 'https://datadryad.org/' }
  ]); setLoading(false) }
  return <div className="page"><section className="page-header"><p className="eyebrow">{t('availability.kicker')}</p><h1>{t('availability.title')}</h1><p>{t('availability.description')}</p></section><button className="button primary" onClick={load} disabled={loading}><BarChart3 size={16} />{t('availability.load')}</button>{loading && <StatusMessage loading />}{sources && <div className="panel table-wrap availability-table"><table><thead><tr><th>{t('availability.source')}</th><th>{t('availability.status')}</th><th>{t('availability.recordsReturned')}</th><th>{t('availability.lastQueried')}</th><th>{t('availability.limitations')}</th><th>{t('common.source')}</th></tr></thead><tbody>{sources.map((source) => <tr key={source.key}><td><strong>{source.key === 'ncbi' ? 'NCBI / GenBank' : source.key.toUpperCase()}</strong></td><td><span className={`availability-status ${source.status}`}>{t(`availability.${source.status}`)}</span></td><td>{source.records}</td><td>{source.queriedAt ? source.queriedAt.slice(0, 19).replace('T', ' ') : t('common.noData')}</td><td>{source.limitation}</td><td><a href={source.url} target="_blank" rel="noreferrer">{t('common.learnMore')}</a></td></tr>)}</tbody></table></div>}<div className="notice"><BarChart3 size={18} /><span>{t('home.summaryText')}</span></div></div>
}
