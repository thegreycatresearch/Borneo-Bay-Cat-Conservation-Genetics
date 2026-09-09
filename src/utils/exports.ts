import type { GeneticRecord, SourceRecord } from '../types'

export interface ResearchSnapshotInput {
  source: string
  query: Record<string, unknown>
  filters: Record<string, unknown>
  count: number
  records: SourceRecord[]
  limitations: string[]
}

export function toCsv(records: Array<Record<string, unknown>>): string {
  if (!records.length) return ''
  const keys = [...new Set(records.flatMap((record) => Object.keys(record)))]
  const quote = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`
  return [keys.map(quote).join(','), ...records.map((record) => keys.map((key) => quote(record[key])).join(','))].join('\n')
}

export function toFasta(records: GeneticRecord[]): string {
  return records.filter((record) => record.sequence).map((record) => `>${record.accession}|${record.scientificName.replace(/\s+/g, '_')}|${record.gene || record.marker || 'unknown'}\n${record.sequence}`).join('\n')
}

export function toResearchSnapshot(input: ResearchSnapshotInput): string {
  return JSON.stringify({
    snapshotType: 'research-query',
    exportedAt: new Date().toISOString(),
    source: input.source,
    query: input.query,
    filters: input.filters,
    resultCount: input.count,
    recordIds: input.records.map((record) => ({ sourceId: record.sourceId, originalUrl: record.originalUrl })),
    retrievalDates: [...new Set(input.records.map((record) => record.retrievedAt))],
    limitations: input.limitations
  }, null, 2)
}

export function downloadText(filename: string, content: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([content], { type })); const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url)
}
