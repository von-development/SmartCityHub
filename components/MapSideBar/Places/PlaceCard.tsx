'use client'

import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface PlaceCardProps {
  place: {
    id: string
    name: string
    category: string
    address: string
    description: string
    image: string
  }
  onClick?: () => void
}

export function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div
          className="w-20 h-20 rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${place.image})` }}
        />
        <div className="flex-1">
          <h3 className="font-semibold">{place.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {place.description}
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {place.address}
          </div>
        </div>
      </div>
    </Card>
  )
} 