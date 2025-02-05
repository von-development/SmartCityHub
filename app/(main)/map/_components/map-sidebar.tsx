'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Coffee,
  Hotel,
  Landmark,
  MapPin,
  UtensilsCrossed,
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
]

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

export function MapSidebar() {
  return (
    <Card className="w-80 border-r rounded-none">
      <Tabs defaultValue="places" className="h-full">
        <div className="p-4 border-b">
          <TabsList className="w-full">
            <TabsTrigger value="places" className="flex-1">
              Locais
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex-1">
              Rotas
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="places" className="m-0">
          <div className="p-4 border-b grid grid-cols-3 gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className="flex flex-col h-auto gap-2 p-2"
              >
                <category.icon className="h-4 w-4" />
                <span className="text-xs">{category.name}</span>
              </Button>
            ))}
          </div>

          <ScrollArea className="h-[calc(100vh-14rem)]">
            <div className="p-4 space-y-4">
              {places.map((place) => (
                <Card key={place.id} className="p-4">
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
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="routes" className="m-0 p-4">
          <div className="text-center text-muted-foreground p-4">
            Funcionalidade de rotas em breve...
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
} 