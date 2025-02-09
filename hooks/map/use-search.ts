import { useState, useCallback } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import { SearchResult } from '@/types/search'

interface UseSearchOptions {
  map: tt.Map | null
}

export function useSearch({ map }: UseSearchOptions) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchPlace = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY
      // Get map bounds for contextual search
      const bounds = map?.getBounds()
      
      const params = new URLSearchParams({
        key: apiKey!,
        query,
        limit: '10',
        language: 'pt-PT',
        countrySet: 'PT',
        lat: map?.getCenter().lat.toString() || '',
        lon: map?.getCenter().lng.toString() || '',
        radius: '10000', // 10km radius
        // Add bounds if available
        ...(bounds && {
          viewport: `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`
        })
      })

      const response = await fetch(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?${params}`
      )

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setResults(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [map])

  const clearResults = useCallback(() => {
    setResults([])
    setError(null)
  }, [])

  return {
    results,
    isLoading,
    error,
    searchPlace,
    clearResults
  }
} 