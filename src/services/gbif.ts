import type { OccurrenceQuery, OccurrenceQueryResult, OccurrenceRecord } from '../types'
import { getJson } from './http'

interface GbifResponse { results: Array<Record<string, unknown>>; count: number }

export async function fetchOccurrences(query: OccurrenceQuery = {}): Promise<OccurrenceQueryResult> {
  const limit = Math.min(Math.max(query.limit || 25, 1), 100)
  const offset = Math.max(query.offset || 0, 0)
  const params = new URLSearchParams({ scientificName: query.scientificName || 'Catopuma badia', limit: String(limit), offset: String(offset) })
  const data = await getJson<GbifResponse>(`https://api.gbif.org/v1/occurrence/search?${params}`, 300_000, 250)
  return { records: data.results.map(normalizeOccurrence), count: data.count, limit, offset }
}

export function normalizeOccurrence(record: Record<string, unknown>): OccurrenceRecord {
  const latitude = Number(record.decimalLatitude)
  const longitude = Number(record.decimalLongitude)
  return {
    source: 'GBIF', sourceId: String(record.key), retrievedAt: new Date().toISOString(),
    originalUrl: `https://www.gbif.org/occurrence/${record.key}`, scientificName: String(record.scientificName || ''),
    acceptedScientificName: stringValue(record.acceptedScientificName), taxonomicRank: stringValue(record.taxonRank),
    kingdom: stringValue(record.kingdom), phylum: stringValue(record.phylum), className: stringValue(record.class),
    order: stringValue(record.order), family: stringValue(record.family), genus: stringValue(record.genus), species: stringValue(record.species),
    country: stringValue(record.country), countryCode: stringValue(record.countryCode), region: stringValue(record.stateProvince), locality: stringValue(record.locality),
    eventDate: stringValue(record.eventDate || record.year), basisOfRecord: stringValue(record.basisOfRecord), occurrenceStatus: stringValue(record.occurrenceStatus),
    institution: stringValue(record.institutionCode), collection: stringValue(record.collectionCode), dataset: stringValue(record.datasetName),
    datasetKey: stringValue(record.datasetKey), publishingOrganization: stringValue(record.publishingOrgKey), license: stringValue(record.license), recordedBy: stringValue(record.recordedBy),
    latitude: isValidCoordinate(latitude, longitude) ? latitude : undefined, longitude: isValidCoordinate(latitude, longitude) ? longitude : undefined
  }
}

function stringValue(value: unknown): string | undefined { return value === undefined || value === null || value === '' ? undefined : String(value) }

export function isValidCoordinate(latitude?: number, longitude?: number): boolean {
  return Number.isFinite(latitude) && Number.isFinite(longitude) && latitude! >= -90 && latitude! <= 90 && longitude! >= -180 && longitude! <= 180
}
