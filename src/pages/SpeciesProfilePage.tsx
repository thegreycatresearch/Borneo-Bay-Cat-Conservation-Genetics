import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Leaf, ShieldCheck } from 'lucide-react'
import { useI18n } from '../i18n'

export function SpeciesProfilePage() {
  const { t } = useI18n()
  return <div className="page"><section className="page-header"><p className="eyebrow">{t('profile.kicker')}</p><h1><em>Catopuma badia</em></h1><p>{t('profile.description')}</p></section>
    <div className="profile-facts"><div><span>{t('profile.accepted')}</span><strong><em>Catopuma badia</em></strong></div><div><span>{t('profile.commonName')}</span><strong>{t('profile.commonNameValue')}</strong></div><div><span>{t('profile.status')}</span><strong>{t('profile.statusValue')}</strong></div><div><span>{t('profile.range')}</span><strong>{t('profile.rangeValue')}</strong></div></div>
    <div className="profile-grid"><section className="panel"><Leaf size={24} /><p className="eyebrow">{t('profile.biologyTitle')}</p><h2>{t('profile.biology')}</h2><p>{t('profile.biologyText')}</p><p className="muted">{t('profile.habitatText')}</p></section><section className="panel"><ShieldCheck size={24} /><p className="eyebrow">{t('profile.conservationTitle')}</p><h2>{t('profile.conservation')}</h2><p>{t('profile.conservationText')}</p><p className="muted">{t('profile.threatsText')}</p></section></div>
    <div className="profile-grid"><section className="panel profile-list"><p className="eyebrow">{t('profile.known')}</p><h2>{t('profile.evidenceTitle')}</h2><ul><li>{t('profile.knownDistribution')}</li><li>{t('profile.knownTaxonomy')}</li><li>{t('profile.knownRecords')}</li></ul></section><section className="panel profile-list"><p className="eyebrow">{t('profile.unknown')}</p><h2>{t('profile.gapsTitle')}</h2><ul><li>{t('profile.unknownPopulation')}</li><li>{t('profile.unknownGenetics')}</li><li>{t('profile.unknownDistribution')}</li></ul></section></div>
    <section className="panel source-note"><BookOpen size={20} /><div><p className="eyebrow">{t('profile.sourcesTitle')}</p><p>{t('profile.sourcesText')}</p><div className="actions"><a className="button quiet" href="https://www.catsg.org/" target="_blank" rel="noreferrer">{t('profile.catsgSource')} <ArrowUpRight size={15} /></a><Link className="button quiet" to="/taxonomy">{t('nav.taxonomy')} <ArrowUpRight size={15} /></Link></div></div></section>
  </div>
}
