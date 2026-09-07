import { useState } from 'react'
import { Database } from 'lucide-react'
import { useI18n } from '../i18n'
import { DistributionPage } from './DistributionPage'
import { GeneticsPage } from './GeneticsPage'

export function DataExplorerPage() {
  const { t } = useI18n(); const [mode, setMode] = useState<'occurrences' | 'genetics'>('occurrences')
  return <div className="page"><section className="page-header"><p className="eyebrow">{t('pages.explorer.kicker')}</p><h1>{t('pages.explorer.title')}</h1><p>{t('pages.explorer.description')}</p></section><div className="explorer-tabs"><button className={mode === 'occurrences' ? 'active' : ''} onClick={() => setMode('occurrences')}>{t('explorer.occurrences')}</button><button className={mode === 'genetics' ? 'active' : ''} onClick={() => setMode('genetics')}>{t('explorer.genetics')}</button><button disabled>{t('explorer.literature')}</button></div>{mode === 'occurrences' ? <DistributionPage compact /> : <GeneticsPage compact />}<div className="notice"><Database size={18} /><span>{t('explorer.attribution')}</span></div></div>
}
