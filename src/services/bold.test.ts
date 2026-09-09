import { describe, expect, it } from 'vitest'
import { normalizeBoldResponse } from './bold'

describe('BOLD adapter', () => {
  it('normalizes returned public records without inventing missing identifiers', () => {
    const records = normalizeBoldResponse({ records: [{ processid: 'AB-1', identification: 'Catopuma badia', markercode: 'COI', country: 'Malaysia' }] })
    expect(records).toHaveLength(1); expect(records[0].sourceId).toBe('AB-1'); expect(records[0].marker).toBe('COI')
    expect(normalizeBoldResponse({ records: [{ identification: 'Catopuma badia' }] })).toEqual([])
  })
})
