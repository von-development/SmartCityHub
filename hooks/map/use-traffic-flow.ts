import { useState, useCallback, useEffect } from 'react'
import tt from '@tomtom-international/web-sdk-maps'

export type TrafficStyle = 'absolute' | 'relative' | 'relative-delay'

interface UseTrafficFlowOptions {
  map: tt.Map | null
}

// Define the options interface to match TomTom's API
interface TrafficFlowOptions {
  style?: TrafficStyle
  refresh?: number
}

// Extend the tt.Map type to include the traffic methods
interface ExtendedMap extends tt.Map {
  showTrafficFlow(options?: TrafficFlowOptions): void
  hideTrafficFlow(): void
}

export function useTrafficFlow({ map }: UseTrafficFlowOptions) {
  const [showTraffic, setShowTraffic] = useState(false)
  const [trafficStyle, setTrafficStyle] = useState<TrafficStyle>('relative')

  // Reset state when map changes
  useEffect(() => {
    if (map) {
      setShowTraffic(false);
      const extendedMap = map as ExtendedMap;
      try {
        extendedMap.hideTrafficFlow();
      } catch (error) {
        console.error('Error hiding traffic on mount:', error)
      }
    }
  }, [map])

  const toggleTraffic = useCallback((checked: boolean) => {
    if (!map) return;
    
    const extendedMap = map as ExtendedMap;
    console.log('Toggle traffic:', checked);

    try {
      if (checked) {
        console.log('Showing traffic with style:', trafficStyle);
        extendedMap.showTrafficFlow({
          style: trafficStyle,
          refresh: 300,
        });
      } else {
        console.log('Hiding traffic');
        extendedMap.hideTrafficFlow();
      }
      setShowTraffic(checked);
    } catch (error) {
      console.error('Error toggling traffic:', error);
    }
  }, [map, trafficStyle])

  const changeTrafficStyle = useCallback((style: TrafficStyle) => {
    if (!map) return;

    const extendedMap = map as ExtendedMap;
    try {
      setTrafficStyle(style);
      if (showTraffic) {
        extendedMap.showTrafficFlow({
          style,
          refresh: 300,
        });
      }
    } catch (error) {
      console.error('Error changing traffic style:', error);
    }
  }, [map, showTraffic])

  return {
    showTraffic,
    trafficStyle,
    toggleTraffic,
    changeTrafficStyle,
  }
} 