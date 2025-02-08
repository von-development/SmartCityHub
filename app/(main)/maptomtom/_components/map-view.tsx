'use client'

import { useEffect, useRef, useState } from 'react'
import tt from '@tomtom-international/web-sdk-maps'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useTrafficFlow } from '@/hooks/map/use-traffic-flow'
import { useTrafficIncidents } from '@/hooks/map/use-traffic-incidents'
import { TrafficControls } from './traffic/traffic-controls'
import { AVEIRO_CENTER } from '@/utils/constants'
import { useChargingStations } from '@/hooks/map/use-charging-stations'
import { ChargingMarker } from './charging/charging-marker'
import { createRoot } from 'react-dom/client'
import { useFlowSegment } from '@/hooks/map/use-flow-segment'
import { FlowInfo } from './traffic/flow-info'

export function MapView() {
  const mapElement = useRef<HTMLDivElement>(null)
  const mapRef = useRef<tt.Map | null>(null)
  const [bounds, setBounds] = useState<tt.LngLatBounds | null>(null)
  const [showTraffic, setShowTraffic] = useState(false)
  const [showIncidents, setShowIncidents] = useState(false)
  const [trafficStyle, setTrafficStyle] = useState<'relative' | 'absolute'>('relative')
  const [isStyleLoaded, setIsStyleLoaded] = useState(false)
  const [showChargingStations, setShowChargingStations] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState<tt.LngLat | null>(null)
  const [popup, setPopup] = useState<tt.Popup | null>(null)
  const { data: flowSegment, isLoading, error } = useFlowSegment(selectedPoint)

  // Get traffic data
  const { data: trafficFlow } = useTrafficFlow(bounds)
  const { data: trafficIncidents } = useTrafficIncidents(bounds)
  const { data: chargingStations } = useChargingStations(bounds)

  // Function to close any existing popup
  const closePopup = () => {
    if (popup) {
      popup.remove();
      setPopup(null);
      setSelectedPoint(null);
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapElement.current) return

    const map = tt.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY!,
      container: mapElement.current,
      center: [AVEIRO_CENTER.lng, AVEIRO_CENTER.lat],
      zoom: AVEIRO_CENTER.zoom,
      language: 'pt-BR',
    })

    mapRef.current = map

    // Listen for style load
    map.on('styledata', () => {
      setIsStyleLoaded(true)
    })

    // Update bounds when map moves
    map.on('moveend', () => {
      setBounds(map.getBounds())
    })

    // Initial bounds
    setBounds(map.getBounds())

    // Add click handler for any point on the map
    map.on('click', async (e) => {
      // Close any existing popup first
      closePopup();

      const coordinates = e.lngLat;
      setSelectedPoint(coordinates);

      // Get street name using reverse geocoding
      try {
        const response = await fetch(
          `https://api.tomtom.com/search/2/reverseGeocode/${coordinates.lat},${coordinates.lng}.json?` +
          `key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}&language=pt-BR`
        );
        const data = await response.json();
        const streetName = data.addresses[0]?.address?.streetName || 'Via não identificada';

        // Create new popup with loading state
        const newPopup = new tt.Popup({
          closeButton: false,
          closeOnClick: false,
          anchor: 'bottom',
          offset: [0, -15]
        })
          .setLngLat(coordinates)
          .setHTML('<div class="p-2">Carregando informações...</div>')
          .addTo(map);

        setPopup(newPopup);
      } catch (error) {
        console.error('Error getting street name:', error);
      }
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [])

  // Update traffic style
  useEffect(() => {
    if (!mapRef.current || !isStyleLoaded) return
    
    const map = mapRef.current

    try {
      // First remove the layer if it exists
      if (map.getLayer('traffic-flow')) {
        map.removeLayer('traffic-flow')
      }

      // Then remove the source if it exists
      if (map.getSource('traffic-flow')) {
        map.removeSource('traffic-flow')
      }

      // Add new source with improved settings
      map.addSource('traffic-flow', {
        type: 'raster',
        tiles: [
          `https://api.tomtom.com/traffic/map/4/tile/flow/${trafficStyle}/{z}/{x}/{y}.png?` +
          `key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}&` +
          `thickness=2&` +
          `tileSize=512&` +
          `opacity=0.8&` +
          `style=relative-delay&` +
          `baseSpeed=50&` +
          `grayscale=false`
        ],
        tileSize: 512,
      })

      // Add new layer
      map.addLayer({
        id: 'traffic-flow',
        type: 'raster',
        source: 'traffic-flow',
        layout: {
          visibility: showTraffic ? 'visible' : 'none'
        },
        paint: {
          'raster-opacity': 0.8
        }
      })
    } catch (error) {
      console.error('Error updating traffic style:', error)
    }
  }, [trafficStyle, isStyleLoaded, showTraffic])

  // Handle traffic incidents data
  useEffect(() => {
    if (!mapRef.current || !trafficIncidents?.incidents || !showIncidents) return

    // Remove existing incident markers
    const existingMarkers = document.querySelectorAll('.traffic-incident-marker')
    existingMarkers.forEach(marker => marker.remove())

    // Add new incident markers
    trafficIncidents.incidents.forEach(incident => {
      const element = document.createElement('div')
      element.className = 'traffic-incident-marker'
      element.innerHTML = `
        <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
          <span class="text-xs">!</span>
        </div>
      `

      const coordinates = incident.geometry.coordinates[0]
      new tt.Marker({ element })
        .setLngLat(coordinates)
        .addTo(mapRef.current!)
    })
  }, [trafficIncidents, showIncidents])

  // Add effect for charging stations
  useEffect(() => {
    if (!mapRef.current || !chargingStations?.stations || !showChargingStations) return

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.charging-station-marker')
    existingMarkers.forEach(marker => marker.remove())

    // Add new markers
    chargingStations.stations.forEach(station => {
      const element = document.createElement('div')
      element.className = 'charging-station-marker'
      
      // Render the ChargingMarker component into the element
      const root = createRoot(element)
      root.render(<ChargingMarker station={station} />)

      new tt.Marker({ element })
        .setLngLat([station.location.lng, station.location.lat])
        .addTo(mapRef.current!)
    })
  }, [chargingStations, showChargingStations])

  // Update popup content when flow data is loaded
  useEffect(() => {
    if (!mapRef.current || !popup || !flowSegment) return;

    const map = mapRef.current;
    const popupContent = document.createElement('div');
    const root = createRoot(popupContent);
    
    console.log('Flow segment speeds:', {
      current: flowSegment.currentSpeed,
      freeFlow: flowSegment.freeFlowSpeed
    }); // Debug log
    
    root.render(
      <FlowInfo
        currentSpeed={flowSegment.currentSpeed}
        freeFlowSpeed={flowSegment.freeFlowSpeed}
        currentTravelTime={flowSegment.currentTravelTime}
        freeFlowTravelTime={flowSegment.freeFlowTravelTime}
        onClose={closePopup}
        isLoading={isLoading}
        error={error}
        street={flowSegment.street} // Pass street name if available
      />
    );

    popup.setDOMContent(popupContent);
  }, [flowSegment, isLoading, error]);

  return (
    <div className="flex-1 relative">
      <div ref={mapElement} className="h-full w-full" />
      
      <TrafficControls 
        showTraffic={showTraffic}
        showIncidents={showIncidents}
        trafficStyle={trafficStyle}
        onToggleTraffic={() => setShowTraffic(!showTraffic)}
        onToggleIncidents={() => setShowIncidents(!showIncidents)}
        onToggleStyle={() => setTrafficStyle(s => s === 'relative' ? 'absolute' : 'relative')}
        showChargingStations={showChargingStations}
        onToggleChargingStations={() => setShowChargingStations(!showChargingStations)}
      />
    </div>
  )
} 