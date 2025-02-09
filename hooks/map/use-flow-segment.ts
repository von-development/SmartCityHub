import { useState, useCallback } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import { debounce } from 'lodash'
import type { TrafficStyle } from './use-traffic-flow'

interface FlowSegmentData {
  currentSpeed: number
  freeFlowSpeed: number
  currentTravelTime: number
  freeFlowTravelTime: number
  confidence: number
  roadClosure: boolean
  coordinates: {
    latitude: number
    longitude: number
  }[]
  frc: string
  streetName?: string
}

interface UseFlowSegmentOptions {
  map: tt.Map | null
  style: TrafficStyle
}

export function useFlowSegment({ map, style }: UseFlowSegmentOptions) {
  const [segmentData, setSegmentData] = useState<FlowSegmentData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSegmentData = useCallback(
    debounce(async (latitude: number, longitude: number) => {
      console.log('Fetching segment data:', { latitude, longitude, style })
      if (!map) return

      setIsLoading(true)
      setError(null)

      try {
        const zoom = Math.round(map.getZoom())
        const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY

        console.log('Making geocode request...')
        const geocodeResponse = await fetch(
          `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?` +
          `key=${apiKey}&language=pt-PT`
        )

        console.log('Geocode response:', await geocodeResponse.clone().json())

        if (!geocodeResponse.ok) {
          throw new Error('Failed to get location information')
        }

        const geocodeData = await geocodeResponse.json()
        const streetName = geocodeData.addresses?.[0]?.address?.streetName

        const flowResponse = await fetch(
          `https://api.tomtom.com/traffic/services/4/flowSegmentData/${style}/${zoom}/json` +
          `?key=${apiKey}` +
          `&point=${latitude},${longitude}` +
          `&unit=kmph`
        )

        if (!flowResponse.ok) {
          throw new Error(`Traffic data error: ${flowResponse.statusText}`)
        }

        const flowData = await flowResponse.json()

        if (!flowData.flowSegmentData) {
          throw new Error('No traffic data available for this location')
        }

        const requiredFields = [
          'currentSpeed',
          'freeFlowSpeed',
          'currentTravelTime',
          'freeFlowTravelTime',
          'confidence',
          'coordinates'
        ]

        for (const field of requiredFields) {
          if (!(field in flowData.flowSegmentData)) {
            throw new Error(`Missing required field: ${field}`)
          }
        }

        setSegmentData({
          currentSpeed: flowData.flowSegmentData.currentSpeed,
          freeFlowSpeed: flowData.flowSegmentData.freeFlowSpeed,
          currentTravelTime: flowData.flowSegmentData.currentTravelTime,
          freeFlowTravelTime: flowData.flowSegmentData.freeFlowTravelTime,
          confidence: flowData.flowSegmentData.confidence,
          roadClosure: flowData.flowSegmentData.roadClosure || false,
          coordinates: flowData.flowSegmentData.coordinates.coordinate,
          frc: flowData.flowSegmentData.frc,
          streetName
        })
      } catch (err) {
        console.error('Detailed error:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error('Error fetching flow segment data:', err)
        setError(errorMessage)
        setSegmentData(null)
      } finally {
        setIsLoading(false)
      }
    }, 1000),
    [map, style]
  )

  return {
    segmentData,
    setSegmentData,
    isLoading,
    error,
    fetchSegmentData,
  }
} 