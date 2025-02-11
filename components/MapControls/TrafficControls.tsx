import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Car } from "lucide-react"
import type { TrafficStyle } from "@/hooks/map/use-traffic-flow"

interface TrafficControlsProps {
  showTraffic: boolean
  trafficStyle: TrafficStyle
  onToggleTraffic: (checked: boolean) => void
  onChangeStyle: (style: TrafficStyle) => void
}

export function TrafficControls({
  showTraffic,
  onToggleTraffic
}: TrafficControlsProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={showTraffic ? "default" : "outline"}
          size="icon"
          onClick={() => onToggleTraffic(!showTraffic)}
          className="relative"
        >
          <Car className="h-4 w-4" />
          {showTraffic && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Tráfego em tempo real
      </TooltipContent>
    </Tooltip>
  )
} 