'use client'

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Car } from "lucide-react"
import { useTraffic } from './traffic-context'

export function TrafficFlowSection() {
  const { showTraffic, trafficStyle, setShowTraffic, setTrafficStyle } = useTraffic()

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4" />
          <h3 className="text-sm font-medium">Fluxo de Tráfego</h3>
        </div>
        <Switch
          checked={showTraffic}
          onCheckedChange={setShowTraffic}
        />
      </div>

      {showTraffic && (
        <div className="flex items-center gap-2">
          <Button
            variant={trafficStyle === 'relative' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTrafficStyle('relative')}
            className="flex-1"
          >
            Relativo
          </Button>
          <Button
            variant={trafficStyle === 'absolute' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTrafficStyle('absolute')}
            className="flex-1"
          >
            Absoluto
          </Button>
        </div>
      )}
    </Card>
  )
} 