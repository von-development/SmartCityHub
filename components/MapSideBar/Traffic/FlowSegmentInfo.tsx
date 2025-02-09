'use client'

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Car, Clock, AlertTriangle } from "lucide-react"

interface FlowSegmentData {
  currentSpeed: number
  freeFlowSpeed: number
  currentTravelTime: number
  freeFlowTravelTime: number
  confidence: number
  roadClosure: boolean
  frc: string
}

interface FlowSegmentInfoProps {
  data: FlowSegmentData | null
  isLoading: boolean
  error: string | null
}

const roadClasses: Record<string, string> = {
  'FRC0': 'Autoestrada ou via principal',
  'FRC1': 'Estrada principal',
  'FRC2': 'Estrada secundária',
  'FRC3': 'Estrada de ligação',
  'FRC4': 'Estrada local importante',
  'FRC5': 'Estrada local',
  'FRC6': 'Estrada menor',
}

export function FlowSegmentInfo({ data, isLoading, error }: FlowSegmentInfoProps) {
  if (error) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="p-4 space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Informação do Segmento</h4>
        <p className="text-sm text-muted-foreground">
          {roadClasses[data.frc] || 'Tipo de estrada desconhecido'}
        </p>
      </div>

      {data.roadClosure && (
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <p className="text-sm font-medium">Estrada fechada</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Car className="h-4 w-4" />
            <span>Velocidade Atual</span>
          </div>
          <p className="text-lg font-medium">{data.currentSpeed} km/h</p>
          <p className="text-xs text-muted-foreground">
            Velocidade ideal: {data.freeFlowSpeed} km/h
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Tempo de Viagem</span>
          </div>
          <p className="text-lg font-medium">
            {Math.round(data.currentTravelTime / 60)} min
          </p>
          <p className="text-xs text-muted-foreground">
            Tempo ideal: {Math.round(data.freeFlowTravelTime / 60)} min
          </p>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Confiança dos dados: {Math.round(data.confidence * 100)}%
      </div>
    </Card>
  )
} 