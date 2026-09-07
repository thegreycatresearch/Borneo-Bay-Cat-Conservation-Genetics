import { describe, expect, it, vi } from 'vitest'
import { getJson } from './http'

describe('HTTP service', () => {
  it('surfaces a failed public request without exposing response details', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }))
    await expect(getJson(`https://example.test/failure-${Date.now()}`, 0)).rejects.toThrow('Request failed: 503')
    vi.unstubAllGlobals()
  })
})