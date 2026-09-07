import type { LiteratureRecord } from '../types'
import { getJson } from './http'

interface SearchResponse { esearchresult: { idlist: string[]; count: string } }
interface SummaryResponse { result: { uids: string[]; [key: string]: Record<string, unknown> | string[] } }
const BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'

export async function fetchLiterature(limit = 25): Promise<LiteratureRecord[]> {
  const search = await getJson<SearchResponse>(`${BASE}/esearch.fcgi?db=pubmed&retmode=json&retmax=${limit}&term=${encodeURIComponent('"Catopuma badia" OR "Pardofelis badia" OR "Bornean bay cat"')}`, 600_000, 350)
  if (!search.esearchresult.idlist.length) return []
  const summary = await getJson<SummaryResponse>(`${BASE}/esummary.fcgi?db=pubmed&retmode=json&id=${search.esearchresult.idlist.join(',')}`, 600_000, 350)
  return search.esearchresult.idlist.map((id) => normalizePubMedRecord((summary.result[id] as Record<string, unknown> | undefined) || { uid: id }))
}

export function normalizePubMedRecord(record: Record<string, unknown>): LiteratureRecord {
  const pmid = String(record.uid || ''); const articleIds = Array.isArray(record.articleids) ? record.articleids as Array<Record<string, unknown>> : []; const doi = articleIds.find((item) => item.idtype === 'doi')?.value
  const authors = Array.isArray(record.authors) ? (record.authors as Array<Record<string, unknown>>).map((author) => String(author.name || '')).filter(Boolean).join(', ') : undefined
  return { source: 'PubMed', sourceId: pmid, retrievedAt: new Date().toISOString(), originalUrl: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, scientificName: 'Catopuma badia', title: String(record.title || ''), authors, year: String(record.pubdate || '').slice(0, 4), journal: String(record.fulljournalname || record.source || ''), doi: doi ? String(doi) : undefined, pmid, abstractAvailable: undefined }
}
