'use client'
// ajuste
import dynamic from 'next/dynamic'
import { useState } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import { useFlowSegment } from '@/hooks/map/use-flow-segment'
import { TrafficStyle, useTrafficFlow } from '@/hooks/map/use-traffic-flow'


// Dynamically import MapView with no SSR
const MapView = dynamic(
  () => import('./_components/map-view').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="flex-1 bg-muted animate-pulse min-h-[400px]" />
    )
  }
)

export default function MapPage() {
  const [map, setMap] = useState<tt.Map | null>(null)
  const [showTraffic, setShowTraffic] = useState(false)
  const [trafficStyle, setTrafficStyle] = useState<TrafficStyle>('relative')

  // Use the hook just for methods
  const { toggleTraffic, changeTrafficStyle } = useTrafficFlow({ 
    map,
    showTraffic,
    trafficStyle,
    onToggle: setShowTraffic,
    onStyleChange: setTrafficStyle
  })

  const { 
    fetchSegmentData, 
    segmentData, 
    setSegmentData,
    isLoading, 
    error 
  } = useFlowSegment({ 
    map,
    style: trafficStyle
  })

  console.log('MapPage render, map instance:', !!map)

  const handleSegmentClick = (lat: number, lng: number) => {
    console.log('Segment click:', { lat, lng, showTraffic })
    if (showTraffic) {
      fetchSegmentData(lat, lng)
    } else {
      console.log('Traffic flow is disabled. Enable it to see segment data.')
    }
  }

  const handleCloseSegment = () => {
    setSegmentData(null)
  }

  const handleMapReady = (mapInstance: tt.Map) => {
    console.log('Map ready callback received')
    setMap(mapInstance)
  }

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <MapView 
        onMapReady={handleMapReady}
        onSegmentClick={handleSegmentClick}
        flowSegmentData={segmentData}
        showTraffic={showTraffic}
        trafficStyle={trafficStyle}
        onToggleTraffic={toggleTraffic}
        onChangeTrafficStyle={changeTrafficStyle}
      />
    </div>
  );
} 