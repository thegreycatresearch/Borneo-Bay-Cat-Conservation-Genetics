import { describe, expect, it } from 'vitest'
import { toCsv, toFasta } from './exports'
import { toResearchSnapshot } from './exports'

describe('exports', () => {
  it('exports attributed CSV and FASTA without changing sequence text', () => {
    expect(toCsv([{ source: 'NCBI', sourceId: '1' }])).toContain('sourceId')
    expect(toFasta([{ source: 'NCBI', sourceId: '1', retrievedAt: '', originalUrl: '', scientificName: 'Catopuma badia', accession: 'A1', sequence: 'ACGT', gene: 'COI' }])).toContain('>A1|Catopuma_badia|COI')
  })
  it('creates a compact reproducibility snapshot with provenance and limitations', () => {
    const snapshot = JSON.parse(toResearchSnapshot({ source: 'NCBI / GenBank', query: { scientificName: 'Catopuma badia' }, filters: { marker: 'COI' }, count: 1, records: [{ source: 'NCBI / GenBank', sourceId: '1', retrievedAt: '2026-09-09T00:00:00.000Z', originalUrl: 'https://example.test/1', scientificName: 'Catopuma badia' }], limitations: ['Not population diversity'] }))
    expect(snapshot.source).toBe('NCBI / GenBank'); expect(snapshot.recordIds[0].sourceId).toBe('1'); expect(snapshot.retrievalDates).toEqual(['2026-09-09T00:00:00.000Z']); expect(snapshot.limitations).toContain('Not population diversity'); expect(snapshot).not.toHaveProperty('sequence')
  })
})
