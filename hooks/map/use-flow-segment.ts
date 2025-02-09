import { useState, useCallback } from 'react'
import tt from '@tomtom-international/web-sdk-maps'

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
  frc: string // Functional Road Class
}

interface UseFlowSegmentOptions {
  map: tt.Map | null
  style?: 'absolute' | 'relative'
}

export function useFlowSegment({ map, style = 'relative' }: UseFlowSegmentOptions) {
  const [segmentData, setSegmentData] = useState<FlowSegmentData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSegmentData = useCallback(async (latitude: number, longitude: number) => {
    if (!map) return

    setIsLoading(true)
    setError(null)

    try {
      const zoom = Math.round(map.getZoom())
      const response = await fetch(
        `https://api.tomtom.com/traffic/services/4/flowSegmentData/${style}/${zoom}/json` +
        `?key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}` +
        `&point=${latitude},${longitude}` +
        `&unit=kmph`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch flow segment data')
      }

      const data = await response.json()
      setSegmentData({
        currentSpeed: data.flowSegmentData.currentSpeed,
        freeFlowSpeed: data.flowSegmentData.freeFlowSpeed,
        currentTravelTime: data.flowSegmentData.currentTravelTime,
        freeFlowTravelTime: data.flowSegmentData.freeFlowTravelTime,
        confidence: data.flowSegmentData.confidence,
        roadClosure: data.flowSegmentData.roadClosure,
        coordinates: data.flowSegmentData.coordinates.coordinate,
        frc: data.flowSegmentData.frc,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching flow segment data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [map, style])

  return {
    segmentData,
    isLoading,
    error,
    fetchSegmentData,
  }
} 