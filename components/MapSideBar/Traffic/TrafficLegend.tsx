'use client'

import { Card } from "@/components/ui/card"

const legendItems = [
  { color: '#00ff00', label: 'Fluído' },
  { color: '#ffff00', label: 'Lento' },
  { color: '#ff0000', label: 'Congestionado' },
  { color: '#000000', label: 'Fechado' },
]

export function TrafficLegend() {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3">Legenda</h3>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.color} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }} 
            />
            <span className="text-sm text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
} 