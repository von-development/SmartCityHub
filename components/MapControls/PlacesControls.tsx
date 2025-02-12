import tt from '@tomtom-international/web-sdk-maps'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Bus, Navigation2, Compass, MapPin } from "lucide-react"
import { POICategories } from './POICategories'
import { usePOISearch } from '@/hooks/map/use-poi-search'
import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PlacesControls({ map }: { map: tt.Map | null }) {
  const { searchPOIs, clearMarkers, isLoading } = usePOISearch({ map })
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleCategorySelect = async (category: string) => {
    if (!map) return
    
    if (category) {
      await searchPOIs([category])
    } else {
      clearMarkers()
    }
    setIsPopoverOpen(false)
  }

  return (
    <Card className="bg-background/95 shadow-md w-auto">
      <div className="flex flex-col gap-2 p-2">
        {/* Points of Interest Button with Popover */}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MapPin className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              Pontos de Interesse
            </TooltipContent>
          </Tooltip>
          
          <PopoverContent className="w-64 p-2" side="right" align="start">
            <POICategories 
              onSelectCategory={handleCategorySelect}
              isLoading={isLoading}
              onClose={() => setIsPopoverOpen(false)}
            />
          </PopoverContent>
        </Popover>

        {/* Transportation Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Transportes
          </TooltipContent>
        </Tooltip>

        {/* Routes Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Navigation2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Rotas
          </TooltipContent>
        </Tooltip>

        {/* Navigation Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Compass className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Navegação
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  )
} 