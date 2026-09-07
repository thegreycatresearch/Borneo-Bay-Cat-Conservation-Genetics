import { useCallback, useState } from 'react'
import { ArrowRight, Globe2 } from 'lucide-react'
import { useI18n } from '../i18n'
import { fetchOccurrences } from '../services/gbif'
import { useResource } from '../hooks/useResource'
import { filterOccurrences, paginate, type OccurrenceFilters } from '../utils/occurrences'
import { MapView } from '../components/MapView'
import { StatusMessage } from '../components/StatusMessage'
import type { OccurrenceRecord } from '../types'

const pageSize = 10

export function DistributionPage({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n()
  const [scientificName, setScientificName] = useState('Catopuma badia')
  const [filters, setFilters] = useState<OccurrenceFilters>({})
  const [page, setPage] = useState(0)
  const loader = useCallback(() => fetchOccurrences({ scientificName, limit: 100 }), [scientificName])
  const resource = useResource(loader)
  const records = resource.data?.records || []
  const filtered = filterOccurrences(records, filters)
  const visible = paginate(filtered, page, pageSize)
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const options = (key: keyof OccurrenceFilters) => [...new Set(records.map((record) => {
    if (key === 'year') return record.eventDate?.slice(0, 4)
    if (key === 'country') return record.country
    if (key === 'region') return record.region
    if (key === 'basisOfRecord') return record.basisOfRecord
    return record.dataset
  }).filter(Boolean))] as string[]
  const setFilter = (key: keyof OccurrenceFilters, value: string) => { setPage(0); setFilters((current) => ({ ...current, [key]: value || undefined })) }
  const clearFilters = () => { setPage(0); setFilters({}) }
  const select = (key: keyof OccurrenceFilters, label: string) => <label className="filter"><span>{label}</span><select value={filters[key] || ''} onChange={(event) => setFilter(key, event.target.value)}><option value="">{t('common.all')}</option>{options(key).map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
  return <div className={compact ? 'explorer-panel' : 'page'}>
    {!compact && <PageHeader />}
    <div className="toolbar data-toolbar"><label className="filter species-filter"><span>{t('common.scientificName')}</span><select value={scientificName} onChange={(event) => setScientificName(event.target.value)}><option>Catopuma badia</option><option>Pardofelis badia</option></select></label><button className="button primary" onClick={resource.load} disabled={resource.loading}><Globe2 size={17} />{t('common.search')}</button><span className="data-badge">GBIF · 100 {t('common.records')}</span></div>
    {resource.error && <StatusMessage error onRetry={resource.load} />}{resource.loading && <StatusMessage loading />}
    {resource.data && <>
      <div className="filter-row">{select('year', t('common.year'))}{select('country', t('common.country'))}{select('region', t('distribution.region'))}{select('basisOfRecord', t('distribution.basis'))}{select('dataset', t('common.dataset'))}<button className="text-button" onClick={clearFilters}>{t('common.clear')}</button></div>
      <div className="result-count"><strong>{filtered.length}</strong> {t('distribution.shownOf')} <strong>{resource.data.count}</strong> {t('common.records')}</div>
      <div className="distribution-grid"><div className="panel map-panel"><div className="panel-title"><h2>{t('distribution.map')}</h2><span>{visible.filter((record) => record.latitude !== undefined).length} {t('distribution.mapped')}</span></div><MapView records={visible} /></div><div className="panel stats-panel"><div className="stat"><span>{t('distribution.total')}</span><strong>{resource.data.count}</strong></div><div className="stat"><span>{t('distribution.georeferenced')}</span><strong>{records.filter((record) => record.latitude !== undefined).length}</strong></div><p className="muted">{t('distribution.precision')}</p></div></div>
      <OccurrenceTable records={visible} />
      <div className="pagination"><button className="text-button" disabled={page === 0} onClick={() => setPage(page - 1)}>{t('common.previous')}</button><span>{page + 1} / {pages}</span><button className="text-button" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>{t('common.next')}</button></div>
    </>}
    {!resource.data && !resource.loading && !resource.error && <StatusMessage empty />}
  </div>
}

function PageHeader() { const { t } = useI18n(); return <section className="page-header"><p className="eyebrow">{t('pages.distribution.kicker')}</p><h1>{t('pages.distribution.title')}</h1><p>{t('pages.distribution.description')}</p></section> }

export function OccurrenceTable({ records }: { records: OccurrenceRecord[] }) { const { t } = useI18n(); return <div className="panel table-wrap"><table><thead><tr><th>{t('common.scientificName')}</th><th>{t('common.year')}</th><th>{t('common.country')}</th><th>{t('common.locality')}</th><th>{t('common.dataset')}</th><th>GBIF ID</th></tr></thead><tbody>{records.map((record) => <tr key={record.sourceId}><td><em>{record.scientificName}</em></td><td>{record.eventDate || t('common.noData')}</td><td>{record.country || t('common.noData')}</td><td>{record.locality || t('common.noData')}</td><td>{record.dataset || t('common.noData')}</td><td><a href={record.originalUrl} target="_blank" rel="noreferrer">{record.sourceId} <ArrowRight size={12} /></a></td></tr>)}</tbody></table></div> }
