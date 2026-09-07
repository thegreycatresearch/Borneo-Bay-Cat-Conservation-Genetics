import { useCallback, useState } from 'react'

export function useResource<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const load = useCallback(async () => {
    setLoading(true); setError(false)
    try { setData(await loader()) } catch { setError(true) } finally { setLoading(false) }
  }, [loader])
  return { data, loading, error, load }
}
