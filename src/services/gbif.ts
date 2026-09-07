import type { OccurrenceRecord } from '../types'
import { getJson } from './http'

interface GbifResponse { results: Array<Record<string, unknown>>; count: number }

export async function fetchOccurrences(limit = 100): Promise<OccurrenceRecord[]> {
  const params = new URLSearchParams({ scientificName: 'Catopuma badia', limit: String(limit), offset: '0' })
  const data = await getJson<GbifResponse>(`https://api.gbif.org/v1/occurrence/search?${params}`)
  return data.results.map((record) => ({
    source: 'GBIF', sourceId: String(record.key), retrievedAt: new Date().toISOString(),
    originalUrl: `https://www.gbif.org/occurrence/${record.key}`, scientificName: String(record.scientificName || 'Catopuma badia'),
    country: String(record.country || ''), region: String(record.stateProvince || ''), locality: String(record.locality || ''),
    eventDate: String(record.eventDate || record.year || ''), basisOfRecord: String(record.basisOfRecord || ''),
    institution: String(record.institutionCode || ''), dataset: String(record.datasetName || ''),
    latitude: typeof record.decimalLatitude === 'number' ? record.decimalLatitude : undefined,
    longitude: typeof record.decimalLongitude === 'number' ? record.decimalLongitude : undefined
  }))
}

export function normalizeOccurrence(record: Record<string, unknown>): OccurrenceRecord {
  return {
    source: 'GBIF', sourceId: String(record.key), retrievedAt: new Date().toISOString(),
    originalUrl: `https://www.gbif.org/occurrence/${record.key}`, scientificName: String(record.scientificName || ''),
    country: String(record.country || ''), latitude: Number(record.decimalLatitude), longitude: Number(record.decimalLongitude)
  }
}
