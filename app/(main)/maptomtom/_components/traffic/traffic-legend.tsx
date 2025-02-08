'use client'

import { Card } from "@/components/ui/card"

interface TrafficLegendProps {
  style: 'relative' | 'absolute'
}

export function TrafficLegend({ style }: TrafficLegendProps) {
  const items = style === 'relative' ? [
    { color: '#00ff00', label: 'Fluxo livre (100%)', description: 'Velocidade igual ou superior à normal' },
    { color: '#40ff00', label: 'Fluxo bom (90-100%)', description: 'Velocidade próxima à normal' },
    { color: '#80ff00', label: 'Fluxo moderado (80-90%)', description: 'Velocidade levemente reduzida' },
    { color: '#ffff00', label: 'Fluxo reduzido (70-80%)', description: 'Velocidade moderadamente reduzida' },
    { color: '#ffbf00', label: 'Tráfego lento (60-70%)', description: 'Velocidade reduzida' },
    { color: '#ff8000', label: 'Tráfego pesado (40-60%)', description: 'Velocidade muito reduzida' },
    { color: '#ff0000', label: 'Congestionado (20-40%)', description: 'Congestionamento' },
    { color: '#800000', label: 'Parado (<20%)', description: 'Trânsito praticamente parado' },
    { color: '#000000', label: 'Via fechada', description: 'Trânsito interrompido' },
  ] : [
    { color: '#00ff00', label: '> 50 km/h', description: 'Fluxo livre' },
    { color: '#40ff00', label: '40-50 km/h', description: 'Fluxo normal' },
    { color: '#80ff00', label: '30-40 km/h', description: 'Fluxo moderado' },
    { color: '#ffff00', label: '25-30 km/h', description: 'Fluxo reduzido' },
    { color: '#ffbf00', label: '20-25 km/h', description: 'Tráfego lento' },
    { color: '#ff8000', label: '15-20 km/h', description: 'Tráfego pesado' },
    { color: '#ff4000', label: '10-15 km/h', description: 'Congestionamento leve' },
    { color: '#ff0000', label: '5-10 km/h', description: 'Congestionamento' },
    { color: '#800000', label: '< 5 km/h', description: 'Congestionamento severo' },
    { color: '#000000', label: 'Via fechada', description: 'Trânsito interrompido' },
  ];

  return (
    <Card className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-sm font-medium mb-3">
        Legenda - Tráfego {style === 'relative' ? 'Relativo' : 'Absoluto'}
      </h3>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.label} className="flex items-start gap-2">
            <div className="flex items-center gap-2 min-w-[150px]">
              <div 
                className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <p className="text-xs text-muted-foreground flex-1">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
} 