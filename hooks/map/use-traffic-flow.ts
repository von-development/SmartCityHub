import { useState, useCallback, useEffect } from 'react'
import tt from '@tomtom-international/web-sdk-maps'

export type TrafficStyle = 'absolute' | 'relative' | 'relative-delay'

interface UseTrafficFlowOptions {
  map: tt.Map | null
  showTraffic: boolean
  trafficStyle: TrafficStyle
  onToggle: (show: boolean) => void
  onStyleChange: (style: TrafficStyle) => void
}

// Define the options interface to match TomTom's API
interface TrafficFlowOptions {
  style?: TrafficStyle
  refresh?: number
  thickness?: number
  absoluteSpeedThresholds?: number[]
  relativeSpeedThresholds?: number[]
  baseSpeed?: number
  grayscale?: boolean
  opacity?: number
}

// Extend the tt.Map type to include the traffic methods
interface ExtendedMap extends tt.Map {
  showTrafficFlow(options?: TrafficFlowOptions): void
  hideTrafficFlow(): void
}

export function useTrafficFlow({ 
  map, 
  showTraffic, 
  trafficStyle,
  onToggle,
  onStyleChange 
}: UseTrafficFlowOptions) {
  console.log('useTrafficFlow received map:', {
    hasMap: !!map,
    mapType: map ? typeof map : 'null'
  })

  // Initialize traffic state when map changes
  useEffect(() => {
    console.log('useTrafficFlow effect triggered, map:', !!map)
    if (!map) return

    const extendedMap = map as ExtendedMap
    try {
      console.log('Initializing traffic state')
      // Hide traffic initially
      extendedMap.hideTrafficFlow()
      onToggle(false)

      // Cleanup when component unmounts or map changes
      return () => {
        try {
          extendedMap.hideTrafficFlow()
        } catch (error) {
          console.error('Error cleaning up traffic flow:', error)
        }
      }
    } catch (error) {
      console.error('Error initializing traffic flow:', error)
    }
  }, [map, onToggle])

  const toggleTraffic = useCallback((checked: boolean) => {
    console.log('Toggle traffic called:', { checked, hasMap: !!map })
    if (!map) {
      console.warn('Toggle called but no map instance available')
      return
    }
    
    const extendedMap = map as ExtendedMap
    try {
      if (checked) {
        console.log('Showing traffic with style:', trafficStyle)
        extendedMap.showTrafficFlow({
          style: trafficStyle,
          refresh: 30000,
          thickness: 8,
          absoluteSpeedThresholds: [0, 20, 40, 60, 80],
          relativeSpeedThresholds: [0.2, 0.4, 0.6, 0.8],
        })
      } else {
        console.log('Hiding traffic')
        extendedMap.hideTrafficFlow()
      }
      onToggle(checked)
    } catch (error) {
      console.error('Error toggling traffic:', error)
    }
  }, [map, trafficStyle, onToggle])

  const changeTrafficStyle = useCallback((style: TrafficStyle) => {
    console.log('Changing traffic style:', { style, showTraffic })
    if (!map) return

    const extendedMap = map as ExtendedMap
    try {
      onStyleChange(style)
      
      if (showTraffic) {
        // Hide current traffic layer first
        try {
          extendedMap.hideTrafficFlow()
        } catch (error) {
          console.error('Error hiding traffic flow:', error)
        }
        
        // Wait a bit before showing new layer
        setTimeout(() => {
          try {
            // Show new traffic layer with new style
            extendedMap.showTrafficFlow({
              style,
              refresh: 30000,
              thickness: 8, // Add thickness
              absoluteSpeedThresholds: [0, 20, 40, 60, 80], // Add speed thresholds
              relativeSpeedThresholds: [0.2, 0.4, 0.6, 0.8], // Add relative thresholds
            })
          } catch (error) {
            console.error('Error showing traffic flow:', error)
          }
        }, 100)
      }
    } catch (error) {
      console.error('Error changing traffic style:', error)
    }
  }, [map, showTraffic, onStyleChange])

  return {
    toggleTraffic,
    changeTrafficStyle,
  }
} 