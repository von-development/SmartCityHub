'use client'

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Car, Clock, AlertTriangle, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FlowSegmentData {
  currentSpeed: number
  freeFlowSpeed: number
  currentTravelTime: number
  freeFlowTravelTime: number
  confidence: number
  roadClosure: boolean
  frc: string
  streetName?: string
  coordinates: {
    latitude: number
    longitude: number
  }[]
}

interface FlowSegmentInfoProps {
  data: FlowSegmentData | null
  isLoading: boolean
  error: string | null
  onClose?: () => void
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

export function FlowSegmentInfo({ data, isLoading, error, onClose }: FlowSegmentInfoProps) {
  if (error) {
    return (
      <Card className="p-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="p-4 mt-4 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Card>
    )
  }

  if (!data) return null

  const speedDifference = data.currentSpeed - data.freeFlowSpeed
  const timeDifference = data.currentTravelTime - data.freeFlowTravelTime

  const getSpeedStatus = () => {
    if (data.currentSpeed < 5) return { color: 'text-red-500', text: 'Trânsito Parado' }
    if (data.currentSpeed < data.freeFlowSpeed * 0.25) return { color: 'text-red-500', text: 'Muito Congestionado' }
    if (data.currentSpeed < data.freeFlowSpeed * 0.5) return { color: 'text-orange-500', text: 'Congestionado' }
    if (data.currentSpeed < data.freeFlowSpeed * 0.75) return { color: 'text-yellow-500', text: 'Lento' }
    return { color: 'text-green-500', text: 'Fluído' }
  }

  const status = getSpeedStatus()

  return (
    <Card className="p-4 mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <h3 className="text-sm font-medium">
              {data.streetName || roadClasses[data.frc] || 'Via não identificada'}
            </h3>
          </div>
          <span className={`text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {data.roadClosure && (
        <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-2 rounded">
          <AlertTriangle className="h-4 w-4" />
          <p className="text-sm font-medium">Via fechada</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Car className="h-4 w-4" />
            <span>Velocidade</span>
          </div>
          <p className="text-lg font-medium">{Math.round(data.currentSpeed)} km/h</p>
          <p className="text-xs text-muted-foreground">
            {speedDifference > 0 ? '+' : ''}{Math.round(speedDifference)} km/h do normal
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Tempo</span>
          </div>
          <p className="text-lg font-medium">
            {Math.round(data.currentTravelTime / 60)} min
          </p>
          <p className="text-xs text-muted-foreground">
            {timeDifference > 0 ? '+' : ''}{Math.round(timeDifference / 60)} min do normal
          </p>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Confiança dos dados: {Math.round(data.confidence * 100)}%
      </div>
    </Card>
  )
} 