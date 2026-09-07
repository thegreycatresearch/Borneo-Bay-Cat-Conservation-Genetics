import { describe, expect, it } from 'vitest'
import { directValue, resolveMissingData } from './dataEnrichment'

describe('data enrichment', () => {
  it('retains provenance and represents unresolved values as unknown', () => {
    const original = { source: 'GBIF', sourceId: '1', retrievedAt: 'now', originalUrl: 'https://gbif.org/1', scientificName: 'Catopuma badia' }
    const result = resolveMissingData(original, { institution: directValue(original, 'Museum'), locality: undefined })
    expect(result.fields.institution.value).toBe('Museum'); expect(result.fields.locality.value).toBeNull(); expect(result.fields.locality.confidence).toBe('unknown')
  })
})
