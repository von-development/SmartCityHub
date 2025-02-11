'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

import { FlowSegmentMarker } from "@/components/FlowSegment/FlowSegmentMarker"
import { createFlowSegmentPopup } from '@/components/FlowSegment/FlowSegmentPopup'
import { SearchBox } from '@/components/MapSideBar/Search/SearchBox'
import { SearchResults } from '@/components/MapSideBar/Search/SearchResults'
import { useSearch } from '@/hooks/map/use-search'

import { TooltipProvider } from "@/components/ui/tooltip"

import { TrafficControls } from "@/components/MapControls/TrafficControls"
import { PlacesControls } from "@/components/MapControls/PlacesControls"
import { TrafficStyle } from '@/hooks/map/use-traffic-flow'
import type { TrafficFlowStyle, TrafficIncidentsStyle } from '@tomtom-international/web-sdk-maps'

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
  showTraffic: boolean
  trafficStyle: TrafficStyle
  onToggleTraffic: (checked: boolean) => void
  onChangeTrafficStyle: (style: TrafficStyle) => void
}

// Add this interface to extend the TomTom Map type
interface ExtendedMap extends tt.Map {
  showTrafficFlow(options?: {
    style?: TrafficFlowStyle;
    refresh?: number;
  }): void;
  hideTrafficFlow(): void;
}

export function MapView({ 
  onMapReady, 
  onSegmentClick,
  flowSegmentData,
  showTraffic,
  trafficStyle,
  onToggleTraffic,
  onChangeTrafficStyle
}: MapViewProps) {
  console.log('MapView render:', { showTraffic, trafficStyle })

  const mapElement = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<tt.Map | null>(null)
  const [bounds, setBounds] = useState<tt.LngLatBounds | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [activePopup, setActivePopup] = useState<tt.Popup | null>(null)
  const [lastClickCoords, setLastClickCoords] = useState<[number, number] | null>(null)

  const { 
    results: searchResults,
    isLoading: isSearching,
    searchPlace,
    clearResults
  } = useSearch({ map: mapInstance.current })

  // Initialize traffic layers when map is ready
  useEffect(() => {
    if (!mapInstance.current || !isMapLoaded) return

    console.log('Initializing traffic layers:', { showTraffic, trafficStyle })

    try {
      const map = mapInstance.current as ExtendedMap

      if (showTraffic) {
        map.showTrafficFlow({
          style: trafficStyle as TrafficFlowStyle,
          refresh: 30000 // Refresh every 30 seconds
        })
      } else {
        map.hideTrafficFlow()
      }
    } catch (error) {
      console.error('Error updating traffic layers:', error)
    }

  }, [isMapLoaded, showTraffic, trafficStyle])

  // Effect to handle popup when flow data changes
  useEffect(() => {
    if (!mapInstance.current || !flowSegmentData || !lastClickCoords) return
    console.log('Creating popup for flow data:', { lastClickCoords, flowSegmentData })

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
        coordinates: lastClickCoords,
        onClose: () => {
          setActivePopup(null)
          setLastClickCoords(null)
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

  // Handle map clicks for traffic segments
  useEffect(() => {
    if (!mapInstance.current || !isMapLoaded || !onSegmentClick) return

    const map = mapInstance.current

    const handleMapClick = async (e: tt.MapMouseEvent<'click'>) => {
      const { lat, lng } = e.lngLat
      console.log('Map clicked:', { lat, lng, showTraffic })

      // Get all features at click point
      const features = map.queryRenderedFeatures(e.point)
      console.log('Features at click point:', features)

      // Improved road detection
      const isRoadFeature = features.some(feature => {
        const layerId = feature.layer.id.toLowerCase()
        const sourceLayer = feature.sourceLayer?.toLowerCase() || ''
        
        const isRoad = layerId.includes('road') || 
                      layerId.includes('street') || 
                      layerId.includes('traffic')
        
        const isRoadSource = sourceLayer.includes('road') || 
                            sourceLayer.includes('traffic') ||
                            sourceLayer.includes('transportation')

        if (isRoad || isRoadSource) {
          console.log('Road feature detected:', { layerId, sourceLayer, properties: feature.properties })
        }

        return isRoad || isRoadSource
      })

      if (isRoadFeature && showTraffic) {
        console.log('Processing road click:', { lat, lng })
        setLastClickCoords([lng, lat])
        onSegmentClick(lat, lng)
      }
    }

    map.on('click', handleMapClick)

    return () => {
      map.off('click', handleMapClick)
    }
  }, [isMapLoaded, onSegmentClick, showTraffic])

  // Initialize map
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
      console.log('Initializing map')
      
      try {
        tt.setProductInfo('Aveiro Smart City', '1.0')
        
        const map = tt.map({
          key: apiKey,
          container: mapElement.current,
          center: [AVEIRO_CENTER.lng, AVEIRO_CENTER.lat],
          zoom: AVEIRO_CENTER.zoom,
          language: 'pt-PT',
          stylesVisibility: {
            trafficFlow: showTraffic,
            trafficIncidents: true // We're only showing flow for now
          },
          minZoom: 3,
          maxZoom: 22,
          renderWorldCopies: false,
        })
        
        mapInstance.current = map

        map.on('error', (e) => {
          console.error('Map error:', e)
        })

        let styleLoaded = false
        let sourceLoaded = false

        const checkIfReady = () => {
          if (styleLoaded && sourceLoaded) {
            console.log('Map fully loaded')
            setIsMapLoaded(true)
            if (onMapReady) {
              onMapReady(map)
            }
          }
        }

        map.once('styledata', () => {
          console.log('Map style loaded')
          styleLoaded = true
          checkIfReady()
        })

        map.once('sourcedata', () => {
          console.log('Map source data loaded')
          sourceLoaded = true
          checkIfReady()
        })

        map.on('moveend', () => {
          if (map) {
            setBounds(map.getBounds())
          }
        })

        return () => {
          console.log('Cleaning up map')
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

  // Handle traffic toggle
  const handleTrafficToggle = useCallback((checked: boolean) => {
    console.log('Traffic toggle clicked:', checked)
    onToggleTraffic(checked)
  }, [onToggleTraffic])

  return (
    <div className="flex-1 relative w-full h-full">
      <div 
        ref={mapElement} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Top Controls */}
      <div className="absolute top-4 left-0 right-0 flex justify-center px-4 gap-2 z-10">
        {/* Search Box */}
        <div className="w-full max-w-md">
          <div className="bg-background rounded-lg shadow-lg">
            <SearchBox
              onSearch={searchPlace}
              isLoading={isSearching}
              onClear={clearResults}
            />
            {searchResults.length > 0 && (
              <div className="mt-2">
                <SearchResults
                  results={searchResults}
                  onSelectResult={(result) => {
                    if (mapInstance.current && result.position) {
                      mapInstance.current.easeTo({
                        center: [result.position.lon, result.position.lat],
                        zoom: 16,
                        duration: 1000
                      });
                      clearResults();
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <TooltipProvider>
            <div className="flex gap-2">
              <TrafficControls
                showTraffic={showTraffic}
                trafficStyle={trafficStyle}
                onToggleTraffic={handleTrafficToggle}
                onChangeStyle={onChangeTrafficStyle}
              />
              <PlacesControls map={mapInstance.current} />
            </div>
          </TooltipProvider>
        </div>
      </div>

      {/* Flow Segment Marker */}
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