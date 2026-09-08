import type { GeneRecord, GeneticQueryResult, GeneticRecord } from '../types'
import { getJson, getText } from './http'

interface ESearchResponse { esearchresult: { idlist: string[]; count: string } }
interface ESummaryResponse { result: { uids: string[]; [key: string]: Record<string, unknown> | string[] } }
const NCBI_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'
const ncbiParams = () => { const params = new URLSearchParams({ tool: import.meta.env.VITE_NCBI_TOOL || 'borneo_bay_cat_explorer' }); if (import.meta.env.VITE_NCBI_EMAIL) params.set('email', import.meta.env.VITE_NCBI_EMAIL); return params }

export async function fetchGeneticRecords(page = 0, limit = 25, scientificName = 'Catopuma badia'): Promise<GeneticQueryResult> {
  const offset = Math.max(page, 0) * Math.min(Math.max(limit, 1), 50); const pageSize = Math.min(Math.max(limit, 1), 50); const alias = scientificName === 'Catopuma badia' ? 'Pardofelis badia' : 'Catopuma badia'
  const params = ncbiParams(); params.set('db', 'nuccore'); params.set('retmode', 'json'); params.set('retstart', String(offset)); params.set('retmax', String(pageSize)); params.set('term', `${scientificName}[Organism] OR ${alias}[Organism]`)
  const search = await getJson<ESearchResponse>(`${NCBI_BASE}/esearch.fcgi?${params}`, 600_000, 350); const ids = search.esearchresult.idlist
  if (!ids.length) return { records: [], count: Number(search.esearchresult.count), limit: pageSize, offset }
  const summaryParams = ncbiParams(); summaryParams.set('db', 'nuccore'); summaryParams.set('retmode', 'json'); summaryParams.set('id', ids.join(','))
  const summary = await getJson<ESummaryResponse>(`${NCBI_BASE}/esummary.fcgi?${summaryParams}`, 600_000, 350)
  const records = ids.map((id) => normalizeGeneticRecord((summary.result[id] as Record<string, unknown> | undefined) || { uid: id }))
  return { records: deduplicateGeneticRecords(records), count: Number(search.esearchresult.count), limit: pageSize, offset }
}

export function deduplicateGeneticRecords(records: GeneticRecord[]): GeneticRecord[] {
  const seen = new Set<string>()
  return records.filter((record) => { const key = record.accession || record.sourceId; if (seen.has(key)) return false; seen.add(key); return true })
}

export function normalizeGeneticRecord(record: Record<string, unknown>): GeneticRecord {
  const accession = String(record.accessionversion || record.caption || record.uid || '')
  return { source: 'NCBI / GenBank', sourceId: String(record.uid || accession), accession, retrievedAt: new Date().toISOString(), originalUrl: `https://www.ncbi.nlm.nih.gov/nuccore/${accession}`, scientificName: String(record.organism || 'Catopuma badia'), organism: optional(record.organism), molecule: optional(record.moltype || record.biomol), marker: optional(record.marker), gene: optional(record.gene), sequenceLength: numberValue(record.slen), collectionDate: optional(record.collectiondate), geographicLocation: optional(record.sublocation || record.country), bioProject: optional(record.projectid), bioSample: optional(record.biosample), database: optional(record.sourcedb), publication: optional(record.title) }
}

export async function fetchGenBankRecord(accession: string): Promise<{ record: GeneticRecord; genes: GeneRecord[]; sequence: string }> {
  const params = ncbiParams(); params.set('db', 'nuccore'); params.set('rettype', 'gb'); params.set('retmode', 'text'); params.set('id', accession)
  const text = await getText(`${NCBI_BASE}/efetch.fcgi?${params}`, 600_000, 350)
  return { record: normalizeGenBankHeader(text, accession), genes: parseGenBankGenes(text, accession), sequence: parseGenBankSequence(text) }
}

export function normalizeGenBankHeader(text: string, accession: string): GeneticRecord {
  const definition = text.match(/^DEFINITION\s+(.+)$/m)?.[1]?.trim(); const organism = text.match(/^\s+ORGANISM\s+(.+)$/m)?.[1]?.trim(); const length = Number(text.match(/^LOCUS\s+\S+\s+(\d+)\s+bp/m)?.[1]); const project = text.match(/BioProject:\s*([^\s]+)/i)?.[1]
  return { source: 'NCBI / GenBank', sourceId: accession, accession, retrievedAt: new Date().toISOString(), originalUrl: `https://www.ncbi.nlm.nih.gov/nuccore/${accession}`, scientificName: organism || 'Catopuma badia', organism, sequenceLength: Number.isFinite(length) ? length : undefined, bioProject: project, publication: definition, molecule: text.match(/^SOURCE\s+(.+)$/m)?.[1]?.trim() }
}

export function parseGenBankGenes(text: string, accession: string): GeneRecord[] {
  const records: GeneRecord[] = []; const pattern = /^     (gene|rRNA|CDS|misc_feature|tRNA)\s+.*?(?=^     \S|^ORIGIN|^\/\/)/gms
  for (const match of text.matchAll(pattern)) { const value = match[0]; const gene = value.match(/\/gene="([^"]+)"/)?.[1]; const product = value.match(/\/product="([^"]+)"/)?.[1]; const locus = value.match(/\/locus_tag="([^"]+)"/)?.[1]; const name = gene || product || locus; if (!name) continue
    records.push({ geneName: normalizeGeneName(name), originalName: name, marker: product, accession, organism: text.match(/^\s+ORGANISM\s+(.+)$/m)?.[1]?.trim(), molecule: text.match(/^SOURCE\s+(.+)$/m)?.[1]?.trim(), geographicLocation: value.match(/\/country="([^"]+)"/)?.[1], specimenVoucher: value.match(/\/specimen_voucher="([^"]+)"/)?.[1], bioProject: text.match(/BioProject:\s*([^\s]+)/i)?.[1], source: 'NCBI / GenBank', sourceId: accession, sourceUrl: `https://www.ncbi.nlm.nih.gov/nuccore/${accession}`, retrievedAt: new Date().toISOString() })
  }
  return records
}

export function normalizeGeneName(name: string): string { const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, ''); if (['coi', 'co1', 'cox1', 'cytochromecoxidasesubuniti'].includes(normalized)) return 'COX1 / COI'; if (normalized.includes('controlregion')) return 'Control region'; return name }
export function parseGenBankSequence(text: string): string { const origin = text.split(/^ORIGIN/m)[1]?.split(/^\/\//m)[0] || ''; return origin.replace(/[^a-z]/gi, '').toUpperCase() }
function optional(value: unknown): string | undefined { return value === undefined || value === null || value === '' ? undefined : String(value) }
function numberValue(value: unknown): number | undefined { const number = Number(value); return Number.isFinite(number) ? number : undefined }
