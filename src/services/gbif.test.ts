import { describe, expect, it } from 'vitest'
import { deduplicateOccurrences, isValidCoordinate, normalizeOccurrence } from './gbif'

describe('GBIF adapters', () => {
  it('normalizes occurrence metadata and provenance', () => {
    const record = normalizeOccurrence({ key: 42, scientificName: 'Catopuma badia', acceptedScientificName: 'Catopuma badia', country: 'Malaysia', countryCode: 'MY', stateProvince: 'Sarawak', datasetName: 'Dataset', decimalLatitude: 1.2, decimalLongitude: 110.1 })
    expect(record.source).toBe('GBIF'); expect(record.sourceId).toBe('42'); expect(record.originalUrl).toContain('/42'); expect(record.region).toBe('Sarawak'); expect(record.latitude).toBe(1.2)
  })
  it('rejects invalid or missing coordinates', () => {
    expect(isValidCoordinate(91, 110)).toBe(false); expect(isValidCoordinate(1, 181)).toBe(false); expect(normalizeOccurrence({ key: 1, decimalLatitude: 'unknown', decimalLongitude: 2 }).latitude).toBeUndefined()
  })
  it('removes duplicate occurrence identifiers', () => {
    const first = normalizeOccurrence({ key: 42, scientificName: 'Catopuma badia' })
    const duplicate = normalizeOccurrence({ key: 42, scientificName: 'Pardofelis badia' })
    expect(deduplicateOccurrences([first, duplicate])).toHaveLength(1)
  })
})
