'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapSidebarHeader } from "@/components/MapSideBar/Header"
import { CategoryGrid } from "@/components/MapSideBar/Places/CategoryGrid"
import { PlacesList } from "@/components/MapSideBar/Places/PlacesList"
import { TrafficSection } from "@/components/MapSideBar/Traffic"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { cn } from "@/utils/cn"
import { useMediaQuery } from "@/hooks/use-media-query"
import tt from '@tomtom-international/web-sdk-maps'
import { useTrafficFlow } from '@/hooks/map/use-traffic-flow'
import { TrafficFlow } from "@/components/MapSideBar/Traffic/TrafficFlow"
import { FlowSegmentInfo } from "@/components/MapSideBar/Traffic/FlowSegmentInfo"

// Sample data - Move to a separate file later
const places = [
  {
    id: "1",
    name: "Praia da Costa Nova",
    category: "attractions",
    address: "Costa Nova, Aveiro",
    description: "Famosas casas às riscas e praia bonita",
    image: "/img/places/costa-nova.jpg",
  },
  {
    id: "2",
    name: "Fórum Aveiro",
    category: "services",
    address: "R. Batalhão Caçadores 10, Aveiro",
    description: "Centro comercial no coração da cidade",
    image: "/img/places/forum-aveiro.jpg",
  },
  // Add more places as needed
]

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
  frc: string
}

export interface MapSidebarProps {
  map: tt.Map | null
  flowSegmentData: FlowSegmentData | null
  flowSegmentLoading: boolean
  flowSegmentError: string | null
}

export function MapSidebar({ 
  map, 
  flowSegmentData,
  flowSegmentLoading,
  flowSegmentError 
}: MapSidebarProps) {
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isMobile = useMediaQuery("(max-width: 768px)")

  const {
    showTraffic,
    trafficStyle,
    toggleTraffic,
    changeTrafficStyle
  } = useTrafficFlow({ map })

  // Auto collapse on mobile
  useEffect(() => {
    setIsCollapsed(isMobile)
  }, [isMobile])

  const renderSection = () => {
    switch (currentSection) {
      case 'places':
        return (
          <>
            <CategoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <PlacesList
              places={places.filter(place => 
                !selectedCategory || place.category === selectedCategory
              )}
              onSelectPlace={(place) => {
                console.log('Selected place:', place)
              }}
            />
          </>
        )
      
      case 'traffic':
        return (
          <>
            <TrafficFlow
              showTraffic={showTraffic}
              trafficStyle={trafficStyle}
              onToggleTraffic={toggleTraffic}
              onChangeStyle={changeTrafficStyle}
            />
            {flowSegmentData && (
              <FlowSegmentInfo
                data={flowSegmentData}
                isLoading={flowSegmentLoading}
                error={flowSegmentError}
              />
            )}
          </>
        )

      case 'bus-stops':
        return (
          <div className="p-4 text-center text-muted-foreground">
            Funcionalidade de paragens em breve...
          </div>
        )

      case 'routes':
        return (
          <div className="p-4 text-center text-muted-foreground">
            Funcionalidade de rotas em breve...
          </div>
        )

      default:
        return (
          <MapSidebarHeader onSelectCategory={setCurrentSection} />
        )
    }
  }

  return (
    <div className="relative flex h-full">
      <Card 
        className={cn(
          "border-r rounded-none transition-all duration-300",
          isCollapsed ? "w-0 overflow-hidden" : "w-80"
        )}
      >
        {currentSection && (
          <div className="p-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setCurrentSection(null)}
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>
          </div>
        )}
        {renderSection()}
      </Card>

      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute top-4 -right-10 transition-transform",
          isCollapsed && "rotate-180"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <PanelLeftOpen className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
} 