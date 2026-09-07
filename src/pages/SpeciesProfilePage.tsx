import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n'

export function SpeciesProfilePage() {
  const { t } = useI18n()
  return <div className="page"><section className="page-header"><p className="eyebrow">{t('profile.kicker')}</p><h1><em>Catopuma badia</em></h1><p>{t('profile.description')}</p></section><div className="profile-grid"><section className="panel"><p className="eyebrow">{t('profile.known')}</p><h2>{t('profile.accepted')}</h2><p><em>Catopuma badia</em></p><p className="muted">{t('profile.historical')}: <em>Pardofelis badia</em></p><div className="actions"><Link className="button quiet" to="/taxonomy">{t('nav.taxonomy')} <ArrowUpRight size={15} /></Link><Link className="button quiet" to="/availability">{t('nav.availability')} <ArrowUpRight size={15} /></Link></div></section><section className="panel"><p className="eyebrow">{t('profile.unknown')}</p><h2>{t('methodology.unknown')}</h2><p className="muted">{t('methodology.unknownText')}</p><p className="muted">{t('methodology.limitsText')}</p></section></div></div>
}
