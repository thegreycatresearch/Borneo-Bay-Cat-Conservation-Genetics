import { describe, expect, it } from 'vitest'
import { toCsv, toFasta } from './exports'

describe('exports', () => {
  it('exports attributed CSV and FASTA without changing sequence text', () => {
    expect(toCsv([{ source: 'NCBI', sourceId: '1' }])).toContain('sourceId')
    expect(toFasta([{ source: 'NCBI', sourceId: '1', retrievedAt: '', originalUrl: '', scientificName: 'Catopuma badia', accession: 'A1', sequence: 'ACGT', gene: 'COI' }])).toContain('>A1|Catopuma_badia|COI')
  })
})
