'use client'

import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Car, 
  Bus, 
  Route,
  Coffee,
  Building2,
  Hotel,
  Utensils,
  Building,
  Landmark,
  Zap,
  CircleParking,
  Camera,
  Bike,
  AlertTriangle

} from "lucide-react"

const mainCategories = [
  {
    id: "places",
    icon: MapPin,
    label: "Locais",
    subcategories: [
      { id: "attractions", icon: Landmark, label: "Atrações" },
      { id: "restaurants", icon: Utensils, label: "Restaurantes" },
      { id: "hotels", icon: Hotel, label: "Hotéis" },
      { id: "cafes", icon: Coffee, label: "Cafés" },
      { id: "services", icon: Building2, label: "Serviços" },
      { id: "public", icon: Building, label: "Públicos" },
    ]
  },
  {
    id: "traffic",
    icon: Car,
    label: "Tráfego"
  },
  {
    id: "charging",
    icon: Zap,
    label: "Carregadores"
  },
  {
    id: "parking",
    icon: CircleParking,
    label: "Estacionamento"
  },
  {
    id: "bus-stops",
    icon: Bus,
    label: "Paragens"
  },
  {
    id: "bike-sharing",
    icon: Bike,
    label: "Bicicletas"
  },
  {
    id: "cameras",
    icon: Camera,
    label: "Câmeras"
  },
  {
    id: "routes",
    icon: Route,
    label: "Rotas"
  }
]

interface MapSidebarHeaderProps {
  onSelectCategory: (category: string) => void
}

export function MapSidebarHeader({ onSelectCategory }: MapSidebarHeaderProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {mainCategories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-6"
          onClick={() => onSelectCategory(category.id)}
        >
          <category.icon className="h-8 w-8" />
          <span className="text-sm font-medium">{category.label}</span>
        </Button>
      ))}
    </div>
  )
} 