'use client'

import { useEffect, useRef, useCallback } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useTrafficFlow } from '@/hooks/map/use-traffic-flow'

const AVEIRO_CENTER = {
  lat: 40.6405,
  lng: -8.6537,
  zoom: 14
} as const

interface MapViewProps {
  onMapReady?: (map: tt.Map) => void
  onSegmentClick?: (lat: number, lng: number) => void
}

export function MapView({ onMapReady, onSegmentClick }: MapViewProps) {
  const mapElement = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<tt.Map | null>(null)

  const handleMapClick = useCallback((e: tt.MapMouseEvent<'click'>) => {
    if (onSegmentClick) {
      onSegmentClick(e.lngLat.lat, e.lngLat.lng)
    }
  }, [onSegmentClick])

  useEffect(() => {
    console.log('Map init - element exists:', !!mapElement.current)
    if (!mapElement.current) return

    const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY
    console.log('API Key exists:', !!apiKey)
    
    if (!apiKey) {
      console.error('TomTom API key is missing')
      return
    }

    // Initialize map only if it hasn't been initialized yet
    if (!mapInstance.current) {
      console.log('Creating new map instance')
      try {
        const map = tt.map({
          key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY!,
          container: mapElement.current,
          center: [AVEIRO_CENTER.lng, AVEIRO_CENTER.lat],
          zoom: AVEIRO_CENTER.zoom,
          language: 'pt-PT',
          stylesVisibility: {
            trafficIncidents: false,
            trafficFlow: false,
          },
        })
        
        mapInstance.current = map
        console.log('Map instance created successfully')

        // Add zoom controls
        map.addControl(new tt.NavigationControl())

        // Add click handler
        map.on('click', handleMapClick)

        // Notify parent when map is ready
        if (onMapReady) {
          map.once('load', () => {
            console.log('Map loaded and ready')
            onMapReady(map)
          })
        }
      } catch (error) {
        console.error('Error creating map:', error)
      }
    }

    // Cleanup function
    return () => {
      const map = mapInstance.current
      if (map) {
        map.off('click', handleMapClick)
        map.remove()
        mapInstance.current = null
      }
    }
  }, [onMapReady, handleMapClick])

  return (
    <div className="flex-1 relative w-full h-full">
      <div ref={mapElement} className="absolute inset-0" />
    </div>
  )
}

export default MapView 