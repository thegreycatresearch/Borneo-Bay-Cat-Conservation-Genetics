import { useResource } from '../hooks/useResource'
import { fetchLiterature } from '../services/literature'
import { useI18n } from '../i18n'
import { StatusMessage } from '../components/StatusMessage'

export function ResearchPage() {
  const { t } = useI18n(); const resource = useResource(fetchLiterature)
  return <div className="page"><section className="page-header"><p className="eyebrow">{t('pages.research.kicker')}</p><h1>{t('pages.research.title')}</h1><p>{t('pages.research.description')}</p></section><div className="toolbar"><button className="button primary" onClick={resource.load} disabled={resource.loading}>{t('common.search')}</button><span className="data-badge">PubMed · public metadata</span></div><StatusMessage loading={resource.loading} error={resource.error} onRetry={resource.load} empty={!!resource.data && resource.data.length === 0} />{resource.data && <div className="literature-list">{resource.data.map((record) => <article className="panel literature-card" key={record.sourceId}><p className="eyebrow">{record.source} · {record.year || t('common.noData')}</p><h2>{record.title || t('common.noData')}</h2><p className="muted">{record.authors || t('common.noData')}<br />{record.journal || t('common.noData')}</p><a href={record.originalUrl} target="_blank" rel="noreferrer">{t('common.original')}</a>{record.doi && <span className="data-badge">DOI: {record.doi}</span>}</article>)}</div>}</div>
}
