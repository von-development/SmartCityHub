'use client'

import dynamic from 'next/dynamic'
import { MapHeader } from "./_components/map-header";
import { MapSidebar } from "./_components/map-sidebar";

// Dynamically import MapView with no SSR
const MapView = dynamic(
  () => import('./_components/map-view').then(mod => mod.MapView),
  { 
    ssr: false, // This is important
    loading: () => <div className="flex-1 bg-muted" /> // Optional loading state
  }
)

export default function MapPage() {
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