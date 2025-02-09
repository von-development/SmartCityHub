'use client'

import dynamic from 'next/dynamic'
import { MapHeader } from "./_components/map-header";
import { MapSidebar } from "./_components/map-sidebar";
import { useState } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import { useFlowSegment } from '@/hooks/map/use-flow-segment'

// Dynamically import MapView with no SSR
const MapView = dynamic(
  () => import('./_components/map-view').then(mod => {
    console.log('MapView module loaded')
    return mod.default
  }),
  { 
    ssr: false,
    loading: () => {
      console.log('MapView loading placeholder shown')
      return <div className="flex-1 bg-muted animate-pulse" />
    }
  }
)

export default function MapPage() {
  const [map, setMap] = useState<tt.Map | null>(null)
  const { fetchSegmentData, segmentData, isLoading, error } = useFlowSegment({ map })

  const handleSegmentClick = (lat: number, lng: number) => {
    fetchSegmentData(lat, lng)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <MapHeader />
      <div className="flex-1 flex">
        <MapSidebar 
          map={map} 
          flowSegmentData={segmentData}
          flowSegmentLoading={isLoading}
          flowSegmentError={error}
        />
        <MapView 
          onMapReady={setMap} 
          onSegmentClick={handleSegmentClick}
        />
      </div>
    </div>
  );
} 