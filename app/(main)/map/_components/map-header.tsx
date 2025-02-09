'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Layers } from "lucide-react"

export function MapHeader() {
  return (
    <div className="bg-background border-b">
      <div className="container px-4 h-16 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Procurar locais..." className="pl-8" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            Localização Atual
          </Button>
          <Button variant="outline" size="icon">
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 