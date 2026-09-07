import type { GeneticRecord } from '../types'

export function toCsv(records: Array<Record<string, unknown>>): string {
  if (!records.length) return ''
  const keys = [...new Set(records.flatMap((record) => Object.keys(record)))]
  const quote = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`
  return [keys.map(quote).join(','), ...records.map((record) => keys.map((key) => quote(record[key])).join(','))].join('\n')
}

export function toFasta(records: GeneticRecord[]): string {
  return records.filter((record) => record.sequence).map((record) => `>${record.accession}|${record.scientificName.replace(/\s+/g, '_')}|${record.gene || record.marker || 'unknown'}\n${record.sequence}`).join('\n')
}

export function downloadText(filename: string, content: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([content], { type })); const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url)
}
