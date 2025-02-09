'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import L from 'leaflet'
import type { LatLngExpression } from 'leaflet'

// Fix for default markers
const icon = L.icon({
  iconUrl: '/img/markers/marker-icon.png',
  shadowUrl: '/img/markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

const AVEIRO_CENTER = {
  lat: 40.6405,
  lng: -8.6537,
  zoom: 14
} as const

const center: LatLngExpression = [AVEIRO_CENTER.lat, AVEIRO_CENTER.lng]

// This component handles map events and updates
function MapEvents() {
  const map = useMap()

  useEffect(() => {
    map.on('moveend', () => {
      const bounds = map.getBounds()
      console.log('Map bounds:', bounds)
    })

    return () => {
      map.off('moveend')
    }
  }, [map])

  return null
}

export function MapView() {
  useEffect(() => {
    // Fix for SSR
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/img/markers/marker-icon-2x.png',
      iconUrl: '/img/markers/marker-icon.png',
      shadowUrl: '/img/markers/marker-shadow.png',
    })
  }, [])

  return (
    <div className="flex-1 relative">
      <MapContainer
        center={center}
        zoom={AVEIRO_CENTER.zoom}
        className="h-full w-full"
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={center} 
          icon={icon}
        >
          <Popup>
            Centro de Aveiro
          </Popup>
        </Marker>
        <MapEvents />
      </MapContainer>
    </div>
  )
}

export default MapView 