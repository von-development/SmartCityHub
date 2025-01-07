"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Compass, 
  Calendar, 
  UtensilsCrossed, 
  Bus, 
  Hotel 
} from "lucide-react";
import Link from "next/link";

const agents = [
  {
    id: "tourist-guide",
    name: "Tourist Guide",
    description: "Get recommendations for attractions, museums, and local experiences",
    icon: Compass,
    expertise: ["Attractions", "Museums", "Local Culture", "Walking Routes"],
  },
  {
    id: "event-planner",
    name: "Event Planner",
    description: "Find and plan your attendance to local events and festivals",
    icon: Calendar,
    expertise: ["Events", "Festivals", "Tickets", "Schedules"],
  },
  {
    id: "food-expert",
    name: "Food Expert",
    description: "Discover local cuisine, restaurants, and food experiences",
    icon: UtensilsCrossed,
    expertise: ["Restaurants", "Local Dishes", "Food Tours", "Markets"],
  },
  {
    id: "transport-assistant",
    name: "Transport Assistant",
    description: "Navigate public transport and get around the city easily",
    icon: Bus,
    expertise: ["Bus Routes", "Schedules", "Tickets", "Navigation"],
  },
  {
    id: "accommodation-advisor",
    name: "Accommodation Advisor",
    description: "Find the perfect place to stay based on your preferences",
    icon: Hotel,
    expertise: ["Hotels", "Apartments", "Areas", "Booking"],
  },
];

export function ChatAgents() {
  return (
    <div className="container px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <agent.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{agent.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {agent.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-full bg-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <Button className="mt-auto" asChild>
                <Link href={`/chat/${agent.id}`}>Chat Now</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 