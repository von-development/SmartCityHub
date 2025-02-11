import tt from '@tomtom-international/web-sdk-maps'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Bus, Navigation2 } from "lucide-react"
import { POICategories } from './POICategories'
import { usePOISearch } from '@/hooks/map/use-poi-search'
import React from 'react'

export function PlacesControls({ map }: { map: tt.Map | null }) {
  const { searchPOIs, clearMarkers, isLoading } = usePOISearch({ map })

  const handleCategorySelect = async (category: string) => {
    if (!map) return
    
    if (category) {
      await searchPOIs([category])
    } else {
      clearMarkers()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <POICategories 
        onSelectCategory={handleCategorySelect}
        isLoading={isLoading}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Bus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Paragens de autocarro
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Navigation2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Rotas
        </TooltipContent>
      </Tooltip>
    </div>
  )
} 