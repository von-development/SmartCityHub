'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useTrafficFlow } from '@/hooks/map/use-traffic-flow'
import { FlowSegmentMarker } from "@/components/FlowSegment/FlowSegmentMarker"
import { createFlowSegmentPopup } from '@/components/FlowSegment/FlowSegmentPopup'

const AVEIRO_CENTER = {
  lat: 40.6405,
  lng: -8.6537,
  zoom: 14
} as const

interface MapViewProps {
  onMapReady?: (map: tt.Map) => void
  onSegmentClick?: (lat: number, lng: number) => void
  flowSegmentData?: {
    coordinates: {
      latitude: number
      longitude: number
    }[]
  } | null
}

export function MapView({ 
  onMapReady, 
  onSegmentClick,
  flowSegmentData 
}: MapViewProps) {
  const mapElement = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<tt.Map | null>(null)
  const [bounds, setBounds] = useState<tt.LngLatBounds | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [activePopup, setActivePopup] = useState<tt.Popup | null>(null)
  const [lastClickCoords, setLastClickCoords] = useState<[number, number] | null>(null)

  // Effect to handle popup when flow data changes
  useEffect(() => {
    if (!mapInstance.current || !flowSegmentData || !lastClickCoords) return
    console.log('Creating popup at:', lastClickCoords)

    // Remove existing popup
    if (activePopup) {
      activePopup.remove()
      setActivePopup(null)
    }

    // Create new popup with flow data at click location
    if (flowSegmentData.coordinates.length > 0) {
      const popup = createFlowSegmentPopup({
        map: mapInstance.current,
        data: flowSegmentData,
        coordinates: lastClickCoords, // Use the stored click coordinates
        onClose: () => {
          setActivePopup(null)
          setLastClickCoords(null) // Clear coordinates when popup is closed
        }
      })
      setActivePopup(popup)
    }
  }, [flowSegmentData, lastClickCoords])

  // Cleanup popup on unmount
  useEffect(() => {
    return () => {
      if (activePopup) {
        activePopup.remove()
      }
    }
  }, [])

  // Separate click handler setup from map initialization
  useEffect(() => {
    if (!mapInstance.current || !isMapLoaded || !onSegmentClick) return

    const map = mapInstance.current

    const handleMapClick = async (e: tt.MapMouseEvent<'click'>) => {
      const { lat, lng } = e.lngLat
      console.log('Clicked coordinates:', { lat, lng })

      // Get all features at click point
      const features = map.queryRenderedFeatures(e.point)
      console.log('All features at click point:', features)

      // Improved road detection
      const isRoadFeature = features.some(feature => {
        // Check layer ID
        const layerId = feature.layer.id.toLowerCase()
        const isRoad = layerId.includes('road') || 
                       layerId.includes('street') || 
                       layerId.includes('traffic')

        // Check source layer if available
        const sourceLayer = feature.sourceLayer?.toLowerCase() || ''
        const isRoadSource = sourceLayer.includes('road') || 
                            sourceLayer.includes('traffic') ||
                            sourceLayer.includes('transportation')

        // Log for debugging
        if (isRoad || isRoadSource) {
          console.log('Road feature detected:', {
            layerId,
            sourceLayer,
            properties: feature.properties
          })
        }

        return isRoad || isRoadSource
      })

      if (isRoadFeature) {
        console.log('Road detected at:', { lat, lng })
        // Store click coordinates for popup
        setLastClickCoords([lng, lat])
        onSegmentClick(lat, lng)
      } else {
        console.log('No road detected at click location')
      }
    }

    map.on('click', handleMapClick)

    return () => {
      map.off('click', handleMapClick)
    }
  }, [isMapLoaded, onSegmentClick])

  // Original map initialization effect
  useEffect(() => {
    if (!mapElement.current) {
      console.log('Map element not ready')
      return
    }

    const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY
    if (!apiKey) {
      console.error('TomTom API key is missing')
      return
    }

    if (!mapInstance.current) {
      try {
        console.log('Initializing new map instance')
        tt.setProductInfo('Aveiro Smart City', '1.0')
        
        const map = tt.map({
          key: apiKey,
          container: mapElement.current,
          center: [AVEIRO_CENTER.lng, AVEIRO_CENTER.lat],
          zoom: AVEIRO_CENTER.zoom,
          language: 'pt-PT',
          stylesVisibility: {
            trafficIncidents: true,
            trafficFlow: true,
          },
          minZoom: 3,
          maxZoom: 22,
          renderWorldCopies: false,
        })
        
        mapInstance.current = map

        // Add error handler for tile loading
        map.on('error', (e) => {
          console.error('Map error:', e)
        })

        // Wait for style and source loading
        map.once('styledata', () => {
          console.log('Map style loaded')
        })

        map.once('sourcedata', () => {
          console.log('Map source data loaded')
        })

        // Only notify parent when everything is ready
        let styleLoaded = false
        let sourceLoaded = false

        const checkIfReady = () => {
          if (styleLoaded && sourceLoaded) {
            console.log('Map fully loaded, notifying parent')
            setIsMapLoaded(true)
            if (onMapReady) {
              onMapReady(map)
            }
          }
        }

        map.once('styledata', () => {
          styleLoaded = true
          checkIfReady()
        })

        map.once('sourcedata', () => {
          sourceLoaded = true
          checkIfReady()
        })

        // Simple bounds tracking
        map.on('moveend', () => {
          if (map) {
            setBounds(map.getBounds())
          }
        })

        return () => {
          if (map) {
            map.remove()
          }
          mapInstance.current = null
        }
      } catch (error) {
        console.error('Error creating map:', error)
      }
    }
  }, [])

  return (
    <div className="flex-1 relative w-full h-full">
      <div 
        ref={mapElement} 
        className="absolute inset-0 w-full h-full"
        style={{ minHeight: '400px' }}
      />
      {mapInstance.current && flowSegmentData && !activePopup && (
        <FlowSegmentMarker
          map={mapInstance.current}
          coordinates={flowSegmentData.coordinates}
          onClick={() => {
            if (onSegmentClick && flowSegmentData.coordinates.length > 0) {
              const firstCoord = flowSegmentData.coordinates[0]
              onSegmentClick(firstCoord.latitude, firstCoord.longitude)
            }
          }}
        />
      )}
    </div>
  )
}

export default MapView 