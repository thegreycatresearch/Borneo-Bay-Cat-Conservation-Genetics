import type { LiteratureRecord } from '../types'
import { getJson } from './http'

interface DryadResponse { count?: number; _embedded?: { 'stash:datasets'?: Array<Record<string, unknown>> } }
const BASE = 'https://datadryad.org/api/v2/search'

export async function fetchDryadDatasets(limit = 10): Promise<LiteratureRecord[]> {
  const size = Math.min(Math.max(limit, 1), 25)
  const base = import.meta.env.VITE_DRYAD_PROXY_URL || BASE
  const separator = base.includes('?') ? '&' : '?'
  const url = `${base}${separator}q=${encodeURIComponent('Catopuma badia')}&page%5Bsize%5D=${size}`
  const response = await getJson<DryadResponse>(url, 600_000, 350)
  return (response._embedded?.['stash:datasets'] || []).map(normalizeDryadRecord)
}

export function normalizeDryadRecord(record: Record<string, unknown>): LiteratureRecord {
  const links = record._links as Record<string, { href?: string }> | undefined
  const doi = stringValue(record.identifier) || stringValue(record.doi)
  const url = links?.self?.href ? `https://datadryad.org${links.self.href}` : doi ? `https://doi.org/${doi}` : 'https://datadryad.org/'
  return { source: 'Dryad', sourceId: doi || url, retrievedAt: new Date().toISOString(), originalUrl: url, scientificName: 'Catopuma badia', title: String(record.title || record.name || ''), authors: undefined, year: stringValue(record.publicationDate)?.slice(0, 4), journal: 'Dryad research dataset', doi }
}

function stringValue(value: unknown): string | undefined { return value === undefined || value === null || value === '' ? undefined : String(value) }
