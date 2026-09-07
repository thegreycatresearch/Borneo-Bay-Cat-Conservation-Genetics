import { describe, expect, it } from 'vitest'
import { normalizeScientificName, TAXONOMY_RECORDS } from './taxonomy'

describe('taxonomy normalization', () => {
  it('maps the historical name to the accepted name', () => { expect(normalizeScientificName('Pardofelis badia')).toBe('Catopuma badia'); expect(TAXONOMY_RECORDS[1].status).toBe('historical') })
})
