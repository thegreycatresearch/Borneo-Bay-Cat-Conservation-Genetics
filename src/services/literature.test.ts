import { describe, expect, it } from 'vitest'
import { normalizePubMedRecord } from './literature'

describe('literature normalization', () => {
  it('preserves PubMed provenance and optional DOI', () => {
    const record = normalizePubMedRecord({ uid: '123', title: 'Bay cat study', pubdate: '2020 Jan', source: 'Journal', articleids: [{ idtype: 'doi', value: '10.1/example' }] })
    expect(record.pmid).toBe('123'); expect(record.doi).toBe('10.1/example'); expect(record.originalUrl).toContain('/123')
  })
})
