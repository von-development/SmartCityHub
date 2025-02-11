'use client'

import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Clock, Car } from "lucide-react"

interface TrafficIncident {
  id: string
  description: string
  severity: 1 | 2 | 3 | 4
  delay: number // in seconds
  length: number // in meters
}

interface TrafficIncidentsProps {
  showIncidents: boolean
  incidents: TrafficIncident[]
  onToggleIncidents: (checked: boolean) => void
  isLoading?: boolean
}

export function TrafficIncidents({
  showIncidents,
  incidents,
  onToggleIncidents,
  isLoading
}: TrafficIncidentsProps) {
  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1: return 'text-yellow-500'
      case 2: return 'text-orange-500'
      case 3: return 'text-red-500'
      case 4: return 'text-red-700'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <h3 className="text-sm font-medium">Incidentes</h3>
        </div>
        <Switch
          checked={showIncidents}
          onCheckedChange={onToggleIncidents}
        />
      </div>

      {showIncidents && (
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">
                Carregando incidentes...
              </p>
            ) : incidents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum incidente reportado.
              </p>
            ) : (
              incidents.map((incident) => (
                <Card key={incident.id} className="p-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle 
                      className={`h-4 w-4 flex-shrink-0 ${getSeverityColor(incident.severity)}`} 
                    />
                    <div className="space-y-2">
                      <p className="text-sm">{incident.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Atraso: {Math.round(incident.delay / 60)} min</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Car className="h-3 w-3" />
                        <span>Extensão: {(incident.length / 1000).toFixed(1)} km</span>
                      </div>
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