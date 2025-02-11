import { useState, useEffect } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import { toast } from 'sonner'
import { createPOIPopup } from '@/components/MapMarkers/POIPopup'

interface POIMarker {
  marker: tt.Marker;
  category: string;
}

interface POISearchOptions {
  map: tt.Map | null;
  radius?: number;
  limit?: number;
}

export function usePOISearch({ map, radius = 5000, limit = 50 }: POISearchOptions) {
  const [markers, setMarkers] = useState<POIMarker[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cleanup markers on unmount
  useEffect(() => {
    return () => {
      markers.forEach(({ marker }) => marker.remove())
    }
  }, [markers])

  const searchPOIs = async (categories: string[]) => {
    if (!map) return

    setIsLoading(true)
    setError(null)

    try {
      const center = map.getCenter()
      
      // Clear existing markers
      markers.forEach(({ marker }) => marker.remove())

      // Use the nearby search endpoint instead
      const response = await fetch(
        `https://api.tomtom.com/search/2/nearbySearch/.json?` +
        `key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}` +
        `&lat=${center.lat}` +
        `&lon=${center.lng}` +
        `&radius=${radius}` +
        `&limit=${limit}` +
        `&categorySet=${categories.join(',')}` +
        `&language=pt-PT`
      )

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.detailedError?.message || 'Failed to fetch POIs')
      }

      const data = await response.json()
      console.log('POI search results:', data)

      const newMarkers: POIMarker[] = data.results.map((poi: any) => {
        const marker = new tt.Marker()
          .setLngLat([poi.position.lon, poi.position.lat])
          .addTo(map)

        const popup = new tt.Popup({ 
          offset: 30,
          maxWidth: '300px'
        })
          .setHTML(createPOIPopup(poi))

        marker.setPopup(popup)

        return { marker, category: categories[0] }
      })

      setMarkers(newMarkers)

      // Fit map to show all markers if there are any
      if (newMarkers.length > 0) {
        const bounds = new tt.LngLatBounds()
        data.results.forEach((poi: any) => {
          bounds.extend([poi.position.lon, poi.position.lat])
        })
        map.fitBounds(bounds, { padding: 50 })
      }

    } catch (err) {
      console.error('Error searching POIs:', err)
      setError(err instanceof Error ? err.message : 'Failed to search POIs')
      toast.error('Failed to load points of interest')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    markers,
    isLoading,
    error,
    searchPOIs,
    clearMarkers: () => {
      markers.forEach(({ marker }) => marker.remove())
      setMarkers([])
    }
  }
} 