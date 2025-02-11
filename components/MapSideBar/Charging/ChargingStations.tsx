'use client'

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Zap, Battery, Clock } from "lucide-react"

interface ChargingStation {
  id: string
  name: string
  address: string
  available: number
  total: number
  types: Array<'Type2' | 'CCS' | 'CHAdeMO'>
  power: number // kW
}

interface ChargingStationsProps {
  showChargers: boolean
  stations: ChargingStation[]
  onToggleChargers: (checked: boolean) => void
  isLoading?: boolean
}

export function ChargingStations({
  showChargers,
  stations,
  onToggleChargers,
  isLoading
}: ChargingStationsProps) {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <h3 className="text-sm font-medium">Postos de Carregamento</h3>
        </div>
        <Switch
          checked={showChargers}
          onCheckedChange={onToggleChargers}
        />
      </div>

      {showChargers && (
        <ScrollArea className="h-[calc(100vh-14rem)]">
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">
                Carregando postos...
              </p>
            ) : stations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum posto encontrado nesta área.
              </p>
            ) : (
              stations.map((station) => (
                <Card key={station.id} className="p-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">{station.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {station.address}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Battery className="h-4 w-4" />
                        <span>{station.available}/{station.total} livres</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        <span>{station.power}kW</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {station.types.map((type) => (
                        <span 
                          key={type}
                          className="text-xs bg-secondary px-2 py-1 rounded"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      )}
    </Card>
  )
} 