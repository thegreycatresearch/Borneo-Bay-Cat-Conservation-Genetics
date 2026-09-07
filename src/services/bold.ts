import type { BoldRecord } from '../types'

export const BOLD_PUBLIC_API_STATUS = 'BOLD Systems public API endpoint requires verification before browser integration.'

export async function fetchBoldRecords(): Promise<BoldRecord[]> {
  // Do not guess an endpoint or bypass BOLD authentication/CORS restrictions.
  return []
}