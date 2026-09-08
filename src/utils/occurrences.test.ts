import { describe, expect, it } from 'vitest'
import { filterOccurrences, paginate } from './occurrences'

describe('occurrence filters', () => {
  const records = [{ source: 'GBIF', sourceId: '1', retrievedAt: '', originalUrl: '', scientificName: 'Catopuma badia', eventDate: '2020-01-01', country: 'Malaysia', region: 'Sarawak', basisOfRecord: 'HUMAN_OBSERVATION', dataset: 'A', institution: 'MY', latitude: 1, longitude: 110 }, { source: 'GBIF', sourceId: '2', retrievedAt: '', originalUrl: '', scientificName: 'Catopuma badia', eventDate: '2019', country: 'Indonesia', region: 'Kalimantan', basisOfRecord: 'MATERIAL_SAMPLE', dataset: 'B' }]
  it('combines year and country filters', () => { expect(filterOccurrences(records, { year: '2020', country: 'Malaysia' })).toHaveLength(1); expect(filterOccurrences(records, { basisOfRecord: 'MATERIAL_SAMPLE' })[0].sourceId).toBe('2') })
  it('returns one bounded page', () => { expect(paginate([1, 2, 3, 4, 5], 1, 2)).toEqual([3, 4]) })
  it('filters by institution and valid coordinates', () => { expect(filterOccurrences(records, { institution: 'MY', georeferenced: true })).toHaveLength(1); expect(filterOccurrences(records, { georeferenced: true })[0].sourceId).toBe('1') })
})
