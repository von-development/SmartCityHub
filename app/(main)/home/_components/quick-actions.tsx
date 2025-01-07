"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Map, MessageSquare, Navigation } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "Find Events",
    description: "Discover what's happening in Aveiro",
    icon: Calendar,
    href: "/events",
  },
  {
    title: "Explore Map",
    description: "Navigate through the city",
    icon: Map,
    href: "/map",
  },
  {
    title: "Ask AI Guide",
    description: "Get personalized recommendations",
    icon: MessageSquare,
    href: "/chat",
  },
  {
    title: "Tourist Routes",
    description: "Follow curated city tours",
    icon: Navigation,
    href: "/map/routes",
  },
];

export function QuickActions() {
  return (
    <section className="container px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Card key={action.href} className="p-4">
            <Link href={action.href} className="flex flex-col items-center text-center gap-2">
              <action.icon className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">{action.title}</h3>
              <p className="text-sm text-muted-foreground hidden md:block">
                {action.description}
              </p>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
} 