const cache = new Map<string, { expires: number; value: unknown }>()
const lastRequest = new Map<string, number>()

const CACHE_KEY = 'bbcat-api-cache'

function readSessionCache<T>(url: string): T | undefined {
  try {
    const stored = JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}') as Record<string, { expires: number; value: T }>
    const item = stored[url]
    return item && item.expires > Date.now() ? item.value : undefined
  } catch {
    return undefined
  }
}

function writeSessionCache<T>(url: string, item: { expires: number; value: T }) {
  try {
    const stored = JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}') as Record<string, unknown>
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ...stored, [url]: item }))
  } catch {
    // Storage can be unavailable in privacy-restricted browsers.
  }
}

export async function getJson<T>(url: string, ttl = 300_000, minInterval = 0): Promise<T> {
  const cached = cache.get(url)
  if (cached && cached.expires > Date.now()) return cached.value as T
  const sessionValue = readSessionCache<T>(url)
  if (sessionValue !== undefined) {
    cache.set(url, { expires: Date.now() + ttl, value: sessionValue })
    return sessionValue
  }
  const host = new URL(url).host
  const wait = Math.max(0, minInterval - (Date.now() - (lastRequest.get(host) || 0)))
  if (wait) await new Promise((resolve) => window.setTimeout(resolve, wait))
  lastRequest.set(host, Date.now())
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 12_000)
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`Request failed: ${response.status}`)
    const value = await response.json() as T
    const item = { expires: Date.now() + ttl, value }
    cache.set(url, item)
    writeSessionCache(url, item)
    return value
  } finally {
    window.clearTimeout(timer)
  }
}

export async function getText(url: string, ttl = 300_000, minInterval = 0): Promise<string> {
  const cacheUrl = `${url}::text`
  const cached = cache.get(cacheUrl)
  if (cached && cached.expires > Date.now()) return cached.value as string
  const host = new URL(url).host
  const wait = Math.max(0, minInterval - (Date.now() - (lastRequest.get(host) || 0)))
  if (wait) await new Promise((resolve) => window.setTimeout(resolve, wait))
  lastRequest.set(host, Date.now())
  const controller = new AbortController(); const timer = window.setTimeout(() => controller.abort(), 12_000)
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'text/plain, text/x-fasta' } })
    if (!response.ok) throw new Error(`Request failed: ${response.status}`)
    const value = await response.text(); cache.set(cacheUrl, { expires: Date.now() + ttl, value }); return value
  } finally { window.clearTimeout(timer) }
}
