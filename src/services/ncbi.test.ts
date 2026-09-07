import { describe, expect, it } from 'vitest'
import { normalizeGeneticRecord } from './ncbi'

describe('NCBI adapters', () => {
  it('normalizes complete and incomplete GenBank summaries', () => {
    const complete = normalizeGeneticRecord({ uid: '1', accessionversion: 'NC_028300.1', organism: 'Catopuma badia', moltype: 'genomic DNA', slen: 16693, sourcedb: 'refseq', projectid: '927338' })
    const incomplete = normalizeGeneticRecord({ uid: '2' })
    expect(complete.accession).toBe('NC_028300.1'); expect(complete.sequenceLength).toBe(16693); expect(complete.bioProject).toBe('927338'); expect(incomplete.sequenceLength).toBeUndefined(); expect(incomplete.originalUrl).toContain('/2')
  })
})
