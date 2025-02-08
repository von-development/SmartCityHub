'use client'

import { Button } from "@/components/ui/button"
import { Car, Layers, AlertTriangle, BatteryCharging } from "lucide-react"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TrafficControlsProps {
  showTraffic: boolean
  showIncidents: boolean
  trafficStyle: 'relative' | 'absolute'
  onToggleTraffic: () => void
  onToggleIncidents: () => void
  onToggleStyle: () => void
  showChargingStations: boolean
  onToggleChargingStations: () => void
}

export function TrafficControls({
  showTraffic,
  showIncidents,
  trafficStyle,
  onToggleTraffic,
  onToggleIncidents,
  onToggleStyle,
  showChargingStations,
  onToggleChargingStations
}: TrafficControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showTraffic ? "default" : "outline"}
              size="icon"
              onClick={onToggleTraffic}
            >
              <Car className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mostrar tráfego</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showIncidents ? "default" : "outline"}
              size="icon"
              onClick={onToggleIncidents}
            >
              <AlertTriangle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mostrar incidentes</p>
          </TooltipContent>
        </Tooltip>

        {showTraffic && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onToggleStyle}
              >
                <Layers className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Estilo: {trafficStyle === 'relative' ? 'Relativo' : 'Absoluto'}</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showChargingStations ? "default" : "outline"}
              size="icon"
              onClick={onToggleChargingStations}
            >
              <BatteryCharging className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mostrar postos de carregamento</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
} 