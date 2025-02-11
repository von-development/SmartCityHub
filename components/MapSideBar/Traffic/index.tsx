'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { TrafficFlow } from "./TrafficFlow"
import { TrafficIncidents } from "./TrafficIncidents"
import { TrafficLegend } from "./TrafficLegend"
import type { TrafficStyle } from "@/hooks/map/use-traffic-flow"

interface TrafficSectionProps {
  showTraffic: boolean
  showIncidents: boolean
  trafficStyle: TrafficStyle
  incidents: any[] // Replace with proper type
  onToggleTraffic: (checked: boolean) => void
  onToggleIncidents: (checked: boolean) => void
  onChangeStyle: (style: TrafficStyle) => void
  isLoading?: boolean
}

export function TrafficSection(props: TrafficSectionProps) {
  return (
    <ScrollArea className="h-[calc(100vh-14rem)]">
      <div className="p-4 space-y-4">
        <TrafficFlow
          showTraffic={props.showTraffic}
          trafficStyle={props.trafficStyle}
          onToggleTraffic={props.onToggleTraffic}
          onChangeStyle={props.onChangeStyle}
        />
        <TrafficIncidents
          showIncidents={props.showIncidents}
          incidents={props.incidents}
          onToggleIncidents={props.onToggleIncidents}
          isLoading={props.isLoading}
        />
        <TrafficLegend />
      </div>
    </ScrollArea>
  )
}

export { TrafficFlow } from './TrafficFlow' 