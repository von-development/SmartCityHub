'use client'

import { BatteryCharging } from 'lucide-react'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ChargingStation } from '@/hooks/map/use-charging-stations'

interface ChargingMarkerProps {
  station: ChargingStation;
}

export function ChargingMarker({ station }: ChargingMarkerProps) {
  const availableConnectors = station.connectors.reduce((acc, conn) => acc + (conn.available ? 1 : 0), 0);
  const totalConnectors = station.connectors.reduce((acc, conn) => acc + conn.total, 0);
  
  const getStatusColor = () => {
    if (availableConnectors === 0) return 'text-red-500';
    if (availableConnectors < totalConnectors / 2) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="relative">
            <BatteryCharging className={`h-6 w-6 ${getStatusColor()}`} />
            <span className="absolute -top-2 -right-2 text-xs bg-white rounded-full px-1 border shadow-sm">
              {availableConnectors}/{totalConnectors}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2">
            <p className="font-medium">{station.name}</p>
            <p className="text-sm text-muted-foreground">{station.address}</p>
            <div className="space-y-1">
              {station.connectors.map((connector, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span>{connector.type} ({connector.powerKW}kW)</span>
                  <span className={connector.available ? 'text-green-500' : 'text-red-500'}>
                    {connector.available ? 'Available' : 'In Use'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 