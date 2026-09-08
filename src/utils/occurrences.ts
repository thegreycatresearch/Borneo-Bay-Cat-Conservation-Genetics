import type { OccurrenceRecord } from '../types'

export interface OccurrenceFilters { year?: string; country?: string; region?: string; basisOfRecord?: string; dataset?: string; institution?: string; georeferenced?: boolean }

export function filterOccurrences(records: OccurrenceRecord[], filters: OccurrenceFilters): OccurrenceRecord[] {
  return records.filter((record) => {
    if (filters.year && !record.eventDate?.startsWith(filters.year)) return false
    if (filters.country && record.country !== filters.country) return false
    if (filters.region && record.region !== filters.region) return false
    if (filters.basisOfRecord && record.basisOfRecord !== filters.basisOfRecord) return false
    if (filters.dataset && record.dataset !== filters.dataset) return false
    if (filters.institution && record.institution !== filters.institution) return false
    if (filters.georeferenced && (record.latitude === undefined || record.longitude === undefined)) return false
    return true
  })
}

export function paginate<T>(records: T[], page: number, pageSize: number): T[] {
  const safePageSize = Math.max(1, pageSize)
  return records.slice(Math.max(0, page) * safePageSize, (Math.max(0, page) + 1) * safePageSize)
}