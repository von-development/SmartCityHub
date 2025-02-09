'use client'

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrafficFlowSection } from "./traffic/traffic-flow-section"
import { TrafficIncidentsSection } from "./traffic/traffic-incidents-section"

export function MapSidebar() {
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
              <TrafficFlowSection />
              <TrafficIncidentsSection />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="places" className="m-0">
          <ScrollArea className="h-[calc(100vh-14rem)]">
            <div className="p-4 space-y-4">
              {/* Places content will go here */}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
} 