'use client'

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Car, Layers } from "lucide-react"

interface TrafficFlowProps {
  showTraffic: boolean
  trafficStyle: 'relative' | 'absolute'
  onToggleTraffic: (checked: boolean) => void
  onChangeStyle: (style: 'relative' | 'absolute') => void
}

export function TrafficFlow({
  showTraffic,
  trafficStyle,
  onToggleTraffic,
  onChangeStyle,
}: TrafficFlowProps) {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4" />
          <h3 className="text-sm font-medium">Fluxo de Tráfego</h3>
        </div>
        <Switch
          checked={showTraffic}
          onCheckedChange={onToggleTraffic}
        />
      </div>

      {showTraffic && (
        <div className="flex items-center gap-2">
          <Button
            variant={trafficStyle === 'relative' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChangeStyle('relative')}
            className="flex-1"
          >
            <Layers className="h-4 w-4 mr-2" />
            Relativo
          </Button>
          <Button
            variant={trafficStyle === 'absolute' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChangeStyle('absolute')}
            className="flex-1"
          >
            <Layers className="h-4 w-4 mr-2" />
            Absoluto
          </Button>
        </div>
      )}
    </Card>
  )
} 