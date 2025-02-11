'use client'

import { Button } from "@/components/ui/button"
import { 
  Building2, 
  Coffee, 
  Hotel, 
  Landmark, 
  UtensilsCrossed,
  Building 
} from "lucide-react"

const categories = [
  {
    id: "attractions",
    name: "Atrações",
    icon: Landmark,
  },
  {
    id: "restaurants",
    name: "Restaurantes",
    icon: UtensilsCrossed,
  },
  {
    id: "hotels",
    name: "Hotéis",
    icon: Hotel,
  },
  {
    id: "cafes",
    name: "Cafés",
    icon: Coffee,
  },
  {
    id: "services",
    name: "Serviços",
    icon: Building2,
  },
  {
    id: "public",
    name: "Públicos",
    icon: Building,
  },
] as const

interface CategoryGridProps {
  selectedCategory?: string
  onSelectCategory: (category: string) => void
}

export function CategoryGrid({ selectedCategory, onSelectCategory }: CategoryGridProps) {
  return (
    <div className="p-4 border-b grid grid-cols-3 gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "ghost"}
          className="flex flex-col h-auto gap-2 p-2"
          onClick={() => onSelectCategory(category.id)}
        >
          <category.icon className="h-4 w-4" />
          <span className="text-xs">{category.name}</span>
        </Button>
      ))}
    </div>
  )
} 