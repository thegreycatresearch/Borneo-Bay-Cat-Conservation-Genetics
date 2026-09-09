import type { BoldRecord } from '../types'
import { getJson } from './http'

export const BOLD_PUBLIC_API_STATUS = 'BOLD Systems requires either direct provider access or an authorized server-side proxy when Cloudflare/CORS blocks browser requests.'

interface BoldResponse { [key: string]: unknown }
const ENDPOINT = 'https://v4.boldsystems.org/index.php/API_Public/combined'

export async function fetchBoldRecords(limit = 25): Promise<BoldRecord[]> {
  const base = import.meta.env.VITE_BOLD_PROXY_URL || ENDPOINT
  const separator = base.includes('?') ? '&' : '?'
  const url = `${base}${separator}taxon=${encodeURIComponent('Catopuma badia')}&page=1&per_page=${Math.min(Math.max(limit, 1), 100)}`
  const response = await getJson<BoldResponse>(url, 600_000, 350)
  return normalizeBoldResponse(response)
}

export function normalizeBoldResponse(response: BoldResponse): BoldRecord[] {
  const rows = Array.isArray(response.records) ? response.records : Array.isArray(response.data) ? response.data : []
  return rows.map((row) => {
    const record = row as Record<string, unknown>
    const id = String(record.processid || record.process_id || record.specimenid || record.specimen_id || record.sampleid || '')
    return { source: 'BOLD Systems', sourceId: id, retrievedAt: new Date().toISOString(), originalUrl: id ? `https://boldsystems.org/index.php/Public_RecordView?processid=${encodeURIComponent(id)}` : 'https://boldsystems.org/', scientificName: String(record.identification || record.species || 'Catopuma badia'), specimenId: stringValue(record.specimenid || record.specimen_id), processId: stringValue(record.processid || record.process_id), marker: stringValue(record.markercode || record.marker), country: stringValue(record.country), sequenceAvailable: Boolean(record.sequence || record.sequence_available) }
  }).filter((record) => record.sourceId)
}

function stringValue(value: unknown): string | undefined { return value === undefined || value === null || value === '' ? undefined : String(value) }