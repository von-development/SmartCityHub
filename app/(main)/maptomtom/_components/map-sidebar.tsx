'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Car,
  Clock,
  MapPin,
} from "lucide-react"

// Import the constant from a shared location
import { AVEIRO_CENTER } from '@/utils/constants'

interface TrafficIncident {
  id: string
  type: string
  severity: number
  from: string
  to: string
  length: number
  delay: number
  description: string
}

export function MapSidebar() {
  const [trafficIncidents, setTrafficIncidents] = useState<TrafficIncident[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const response = await fetch(
          `https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${AVEIRO_CENTER.lat},${AVEIRO_CENTER.lng}/10/-1/json?key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}&language=pt-BR`
        )
        const data = await response.json()
        setTrafficIncidents(data.incidents || [])
      } catch (error) {
        console.error('Error fetching traffic data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrafficData()
    // Set up polling every 5 minutes instead of 30 seconds
    const interval = setInterval(fetchTrafficData, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1: return 'text-yellow-500'
      case 2: return 'text-orange-500'
      case 3: return 'text-red-500'
      case 4: return 'text-red-700'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Card className="w-80 border-r rounded-none">
      <Tabs defaultValue="traffic" className="h-full">
        <div className="p-4 border-b">
          <TabsList className="w-full">
            <TabsTrigger value="traffic" className="flex-1">
              Tráfego
            </TabsTrigger>
            <TabsTrigger value="places" className="flex-1">
              Locais
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="traffic" className="m-0">
          <ScrollArea className="h-[calc(100vh-14rem)]">
            <div className="p-4 space-y-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">
                  Carregando informações de tráfego...
                </p>
              ) : trafficIncidents.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum incidente de tráfego reportado.
                </p>
              ) : (
                trafficIncidents.map((incident) => (
                  <Card key={incident.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${getSeverityColor(incident.severity)}`} />
                      <div className="space-y-2">
                        <p className="font-medium">{incident.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Atraso: {Math.round(incident.delay / 60)} min</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Car className="h-4 w-4" />
                          <span>Extensão: {(incident.length / 1000).toFixed(1)} km</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="places" className="m-0 p-4">
          <p className="text-sm text-muted-foreground">
            Implementação do TomTom Places em breve...
          </p>
        </TabsContent>
      </Tabs>
    </Card>
  )
} 