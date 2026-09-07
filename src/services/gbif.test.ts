import { describe, expect, it } from 'vitest'
import { normalizeOccurrence } from './gbif'

describe('GBIF adapters', () => {
  it('normalizes an occurrence while preserving provenance', () => {
    const record = normalizeOccurrence({ key: 42, scientificName: 'Catopuma badia', country: 'Malaysia', decimalLatitude: 1.2, decimalLongitude: 110.1 })
    expect(record.source).toBe('GBIF')
    expect(record.sourceId).toBe('42')
    expect(record.originalUrl).toContain('/42')
    expect(record.latitude).toBe(1.2)
  })
})
