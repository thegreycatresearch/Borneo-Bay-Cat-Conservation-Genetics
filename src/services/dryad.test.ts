import { describe, expect, it } from 'vitest'
import { normalizeDryadRecord } from './dryad'

describe('Dryad adapter', () => {
  it('normalizes dataset identifiers and source links', () => {
    const record = normalizeDryadRecord({ identifier: 'doi:10.5061/dryad.example', title: 'Dataset', publicationDate: '2023-01-02', _links: { self: { href: '/api/v2/datasets/doi%3A10.5061%2Fdryad.example' } } })
    expect(record.source).toBe('Dryad'); expect(record.title).toBe('Dataset'); expect(record.year).toBe('2023'); expect(record.originalUrl).toContain('datadryad.org')
  })
})
