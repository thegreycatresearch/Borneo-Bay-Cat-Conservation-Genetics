import { describe, expect, it } from 'vitest'
import { normalizeGenBankHeader, normalizeGeneName, parseGenBankGenes, parseGenBankSequence } from './ncbi'

const fixture = `LOCUS       TEST                  12 bp    DNA     linear
DEFINITION  Catopuma badia test.
SOURCE      mitochondrion
  ORGANISM  Catopuma badia
FEATURES             Location/Qualifiers
     gene            1..12
                     /gene="COI"
     CDS             1..12
                     /product="cytochrome c oxidase subunit I"
ORIGIN
        1 acgtacgtacgt
//`

describe('GenBank parsing', () => {
  it('extracts header, genes and unmodified sequence', () => {
    expect(normalizeGenBankHeader(fixture, 'TEST.1').sequenceLength).toBe(12)
    expect(parseGenBankGenes(fixture, 'TEST.1').map((gene) => gene.geneName)).toContain('COI')
    expect(parseGenBankSequence(fixture)).toBe('ACGTACGTACGT')
    expect(normalizeGeneName('control-region')).toBe('Control region'); expect(normalizeGeneName('NADH dehydrogenase subunit 4L')).toBe('ND4L'); expect(normalizeGeneName('cytochrome b')).toBe('CYTB')
  })
})