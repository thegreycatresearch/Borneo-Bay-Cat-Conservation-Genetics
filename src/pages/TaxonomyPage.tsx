import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { TAXONOMY_RECORDS } from '../services/taxonomy'

export function TaxonomyPage() {
  const { t } = useI18n()
  return <div className="page"><section className="page-header"><p className="eyebrow">{t('taxonomy.kicker')}</p><h1>{t('taxonomy.title')}</h1><p>{t('taxonomy.description')}</p></section><div className="panel table-wrap"><table><thead><tr><th>{t('taxonomy.name')}</th><th>{t('taxonomy.relation')}</th><th>{t('common.source')}</th><th>{t('common.original')}</th></tr></thead><tbody>{TAXONOMY_RECORDS.map((record) => <tr key={record.name}><td><em>{record.name}</em></td><td>{t(`taxonomy.${record.status}`)}</td><td>{record.source}</td><td><a href={record.originalUrl} target="_blank" rel="noreferrer">{record.sourceId} <ArrowUpRight size={12} /></a></td></tr>)}</tbody></table></div></div>
}
