'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { PlaceCard } from "./PlaceCard"

interface Place {
  id: string
  name: string
  category: string
  address: string
  description: string
  image: string
}

interface PlacesListProps {
  places: Place[]
  onSelectPlace?: (place: Place) => void
}

export function PlacesList({ places, onSelectPlace }: PlacesListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-14rem)]">
      <div className="p-4 space-y-4">
        {places.map((place) => (
          <PlaceCard 
            key={place.id} 
            place={place}
            onClick={() => onSelectPlace?.(place)}
          />
        ))}
      </div>
    </ScrollArea>
  )
} 