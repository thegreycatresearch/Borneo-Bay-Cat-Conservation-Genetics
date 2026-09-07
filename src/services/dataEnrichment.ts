import type { EnrichedScientificRecord, EnrichedValue, SourceRecord } from '../types'

export function resolveMissingData<T extends SourceRecord>(record: T, candidates: Record<string, EnrichedValue<unknown> | undefined>): EnrichedScientificRecord {
  const fields: Record<string, EnrichedValue<unknown>> = {}
  for (const [key, candidate] of Object.entries(candidates)) fields[key] = candidate || { value: null, source: record.source, sourceId: record.sourceId, sourceUrl: record.originalUrl, retrievedAt: record.retrievedAt, confidence: 'unknown' }
  return { original: record, fields }
}

export function directValue<T>(record: SourceRecord, value: T | null, fieldSource = record.source): EnrichedValue<T> {
  return { value, source: fieldSource, sourceId: record.sourceId, sourceUrl: record.originalUrl, retrievedAt: record.retrievedAt, confidence: value === null ? 'unknown' : 'direct' }
}
