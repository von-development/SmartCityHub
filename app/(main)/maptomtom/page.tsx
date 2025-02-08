'use client'

import dynamic from 'next/dynamic'
import { MapHeader } from "./_components/map-header";
import { MapSidebar } from "./_components/map-sidebar";

// Dynamically import MapView with no SSR to avoid window undefined issues
const MapView = dynamic(
  () => import('./_components/map-view').then(mod => ({ default: mod.MapView })),
  { 
    ssr: false,
    loading: () => <div className="flex-1 bg-muted" />
  }
)

export default function MapTomTomPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <MapHeader />
      <div className="flex-1 flex">
        <MapSidebar />
        <MapView />
      </div>
    </div>
  );
} 