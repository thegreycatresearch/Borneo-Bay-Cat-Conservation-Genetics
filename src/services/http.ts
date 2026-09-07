const cache = new Map<string, { expires: number; value: unknown }>()

export async function getJson<T>(url: string, ttl = 300_000): Promise<T> {
  const cached = cache.get(url)
  if (cached && cached.expires > Date.now()) return cached.value as T
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 12_000)
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`Request failed: ${response.status}`)
    const value = await response.json() as T
    cache.set(url, { expires: Date.now() + ttl, value })
    return value
  } finally {
    window.clearTimeout(timer)
  }
}
