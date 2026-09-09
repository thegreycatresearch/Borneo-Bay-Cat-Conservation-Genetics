import { describe, expect, it } from 'vitest'
import { normalizeCrossrefRecord } from './crossref'

describe('Crossref adapter', () => {
  it('normalizes DOI, title, authors and publication year', () => {
    const record = normalizeCrossrefRecord({ DOI: '10.1000/example', title: ['A study'], author: [{ given: 'A', family: 'Researcher' }], published: { 'date-parts': [[2022]] }, 'container-title': ['Journal'] })
    expect(record.source).toBe('Crossref'); expect(record.doi).toBe('10.1000/example'); expect(record.year).toBe('2022'); expect(record.authors).toBe('A Researcher')
  })
})
