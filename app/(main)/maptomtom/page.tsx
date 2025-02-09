'use client'

import { MapView } from './_components/map-view'
import { MapSidebar } from './_components/map-sidebar'
import { TrafficProvider } from './_components/traffic/traffic-context'

export default function MapPage() {
  return (
    <TrafficProvider>
      <div className="flex h-[calc(100vh-4rem)]">
        <MapSidebar />
        <MapView />
      </div>
    </TrafficProvider>
  )
} 