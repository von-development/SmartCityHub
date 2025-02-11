'use client'

import { useEffect } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import type { Feature, LineString } from 'geojson'

interface FlowSegmentMarkerProps {
  map: tt.Map
  coordinates: {
    latitude: number
    longitude: number
  }[]
  onClick?: () => void
}

export function FlowSegmentMarker({ map, coordinates, onClick }: FlowSegmentMarkerProps) {
  useEffect(() => {
    if (!map || !coordinates.length) return

    // Create a line string feature with proper GeoJSON typing
    const line: Feature<LineString> = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coordinates.map(coord => [coord.longitude, coord.latitude])
      }
    }

    // Add the line to the map
    map.addLayer({
      id: 'flow-segment',
      type: 'line',
      source: {
        type: 'geojson',
        data: line
      },
      paint: {
        'line-color': '#ff0000',
        'line-width': 4,
        'line-opacity': 0.8
      }
    })

    // Add click handler
    if (onClick) {
      map.on('click', 'flow-segment', onClick)
    }

    // Cleanup
    return () => {
      if (map.getLayer('flow-segment')) {
        map.removeLayer('flow-segment')
      }
      if (map.getSource('flow-segment')) {
        map.removeSource('flow-segment')
      }
      if (onClick) {
        map.off('click', 'flow-segment', onClick)
      }
    }
  }, [map, coordinates, onClick])

  return null
} 