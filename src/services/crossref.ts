import type { LiteratureRecord } from '../types'
import { getJson } from './http'

interface CrossrefResponse { message: { items: Array<Record<string, unknown>> } }
const BASE = 'https://api.crossref.org/works'

export async function fetchCrossrefLiterature(limit = 10): Promise<LiteratureRecord[]> {
  const rows = Math.min(Math.max(limit, 1), 25)
  const url = `${BASE}?query.bibliographic=${encodeURIComponent('Catopuma badia OR Pardofelis badia OR Bornean bay cat')}&rows=${rows}&select=DOI,title,author,published,container-title,publisher`
  const response = await getJson<CrossrefResponse>(url, 600_000, 350)
  return response.message.items.map(normalizeCrossrefRecord).filter((record) => record.title)
}

export function normalizeCrossrefRecord(record: Record<string, unknown>): LiteratureRecord {
  const doi = stringValue(record.DOI)
  const titles = Array.isArray(record.title) ? record.title : []
  const authors = Array.isArray(record.author) ? record.author.map((author) => { const value = author as Record<string, unknown>; return [value.given, value.family].filter(Boolean).join(' ') }).filter(Boolean).join(', ') : undefined
  const published = record.published as { 'date-parts'?: number[][] } | undefined
  const year = published?.['date-parts']?.[0]?.[0]
  const journal = Array.isArray(record['container-title']) ? String(record['container-title'][0] || '') : undefined
  return { source: 'Crossref', sourceId: doi || String(record.URL || ''), retrievedAt: new Date().toISOString(), originalUrl: doi ? `https://doi.org/${doi}` : String(record.URL || 'https://api.crossref.org/works'), scientificName: 'Catopuma badia', title: String(titles[0] || ''), authors, year: year ? String(year) : undefined, journal, doi }
}

function stringValue(value: unknown): string | undefined { return value === undefined || value === null || value === '' ? undefined : String(value) }
