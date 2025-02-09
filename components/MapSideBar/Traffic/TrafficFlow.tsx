'use client'
//CORIGIR O PROBLEMA DO ABSOLUTO E RELATIVO
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Car, Layers } from "lucide-react"
import type { TrafficStyle } from "@/hooks/map/use-traffic-flow"

interface TrafficFlowProps {
  showTraffic: boolean
  trafficStyle: TrafficStyle
  onToggleTraffic: (checked: boolean) => void
  onChangeStyle: (style: TrafficStyle) => void
}

const trafficStyles = [
  {
    id: 'relative' as const,
    label: 'Relativo',
    description: 'Mostra a velocidade em relação à velocidade de fluxo livre'
  },
  {
    id: 'absolute' as const,
    label: 'Absoluto',
    description: 'Mostra os valores reais de velocidade'
  },
  {
    id: 'relative-delay' as const,
    label: 'Atraso',
    description: 'Mostra o tempo de atraso em relação à velocidade de fluxo livre'
  }
]

export function TrafficFlow({
  showTraffic,
  trafficStyle,
  onToggleTraffic,
  onChangeStyle,
}: TrafficFlowProps) {
  // Add debug log
  console.log('TrafficFlow render:', { showTraffic, trafficStyle })

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4" />
          <h3 className="text-sm font-medium">Fluxo de Tráfego</h3>
        </div>
        <Switch
          checked={showTraffic}
          onCheckedChange={(checked) => {
            console.log('Switch toggled:', checked) // Debug log
            onToggleTraffic(checked)
          }}
        />
      </div>

      {showTraffic && (
        <div className="flex flex-col gap-4">
          {trafficStyles.map((style) => (
            <div key={style.id} className="space-y-2">
              <Button
                variant={trafficStyle === style.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => onChangeStyle(style.id)}
                className="w-full justify-start"
              >
                <Layers className="h-4 w-4 mr-2" />
                {style.label}
              </Button>
              <p className="text-xs text-muted-foreground px-2">
                {style.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
} 