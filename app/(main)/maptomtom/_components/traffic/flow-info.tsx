'use client'

import { Card } from "@/components/ui/card"
import { Car, Clock, X, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/utils"

interface FlowInfoProps {
  currentSpeed: number;
  freeFlowSpeed: number;
  currentTravelTime: number;
  freeFlowTravelTime: number;
  onClose: () => void;
  isLoading?: boolean;
  error?: Error | null;
  street?: string;
}

export function FlowInfo({ 
  currentSpeed, 
  freeFlowSpeed, 
  currentTravelTime, 
  freeFlowTravelTime,
  onClose,
  isLoading,
  error,
  street
}: FlowInfoProps) {
  if (isLoading) {
    return (
      <Card className="p-4 space-y-3 min-w-[300px] animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-3 w-24 bg-muted rounded mt-1" />
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div className="h-12 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 space-y-3 min-w-[300px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="h-4 w-4" />
            <h3 className="text-sm font-medium">Erro ao carregar dados</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Não foi possível obter dados de tráfego para esta localização.
        </p>
      </Card>
    );
  }

  const speedPercentage = Math.round((currentSpeed / freeFlowSpeed) * 100);
  const delayMinutes = Math.round((currentTravelTime - freeFlowTravelTime) / 60);
  const speedDiff = Math.round(currentSpeed - freeFlowSpeed);
  
  const getSpeedStatus = () => {
    if (currentSpeed < 5) return { color: 'text-red-700', text: 'Trânsito Parado' };
    if (currentSpeed < 10) return { color: 'text-red-600', text: 'Congestionamento Severo' };
    if (currentSpeed < 15) return { color: 'text-red-500', text: 'Congestionamento' };
    if (currentSpeed < 20) return { color: 'text-orange-500', text: 'Tráfego Pesado' };
    if (currentSpeed < 25) return { color: 'text-yellow-600', text: 'Tráfego Lento' };
    if (currentSpeed < 30) return { color: 'text-yellow-500', text: 'Fluxo Reduzido' };
    if (currentSpeed < 40) return { color: 'text-green-600', text: 'Fluxo Moderado' };
    return { color: 'text-green-500', text: 'Fluxo Normal' };
  };

  const status = getSpeedStatus();

  return (
    <Card className="p-4 space-y-4 min-w-[320px] shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Informações de Tráfego</h3>
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", 
              status.color, "bg-opacity-10 bg-current")}>
              {status.text}
            </span>
          </div>
          {street && (
            <p className="text-xs text-muted-foreground mt-1">{street}</p>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg">
          <Car className="h-5 w-5 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className={cn("text-sm font-medium", status.color)}>
                {Math.round(currentSpeed)} km/h
              </p>
              <div className="flex items-center gap-1 text-xs">
                {speedDiff < 0 ? (
                  <ArrowDown className="h-3 w-3 text-red-500" />
                ) : (
                  <ArrowUp className="h-3 w-3 text-green-500" />
                )}
                <span className={speedDiff < 0 ? "text-red-500" : "text-green-500"}>
                  {Math.abs(speedDiff)} km/h
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-muted-foreground">
                Velocidade normal: {Math.round(freeFlowSpeed)} km/h
              </p>
              <p className="text-xs font-medium">
                {speedPercentage}% do normal
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg">
          <Clock className="h-5 w-5 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {Math.round(currentTravelTime / 60)} min
              </p>
              {delayMinutes > 0 && (
                <span className="text-xs text-red-500 font-medium">
                  +{delayMinutes} min
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tempo normal: {Math.round(freeFlowTravelTime / 60)} min
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
} 