import { describe, expect, it, vi } from 'vitest'
import { deduplicateGeneticRecords, fetchGeneticRecords, normalizeGeneticRecord } from './ncbi'

describe('NCBI adapters', () => {
  it('normalizes complete and incomplete GenBank summaries', () => {
    const complete = normalizeGeneticRecord({ uid: '1', accessionversion: 'NC_028300.1', organism: 'Catopuma badia', moltype: 'genomic DNA', slen: 16693, sourcedb: 'refseq', projectid: '927338' })
    const incomplete = normalizeGeneticRecord({ uid: '2' })
    expect(complete.accession).toBe('NC_028300.1'); expect(complete.sequenceLength).toBe(16693); expect(complete.bioProject).toBe('927338'); expect(incomplete.sequenceLength).toBeUndefined(); expect(incomplete.originalUrl).toContain('/2')
  })
  it('preserves explicit marker metadata and removes duplicate accessions', () => {
    const first = normalizeGeneticRecord({ uid: '1', accessionversion: 'A.1', organism: 'Catopuma badia', marker: 'COI' })
    const duplicate = normalizeGeneticRecord({ uid: '2', accessionversion: 'A.1', organism: 'Pardofelis badia', marker: 'COI' })
    expect(first.marker).toBe('COI'); expect(deduplicateGeneticRecords([first, duplicate])).toHaveLength(1)
  })
  it('handles an empty NCBI search response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ esearchresult: { idlist: [], count: '0' } }) }))
    const result = await fetchGeneticRecords(0, 25, `Catopuma badia empty-${Date.now()}`)
    expect(result.records).toEqual([]); expect(result.count).toBe(0)
    vi.unstubAllGlobals()
  })
})
