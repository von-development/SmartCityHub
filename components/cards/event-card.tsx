"use client";

import { Card, CardHeader, CardFooter } from "@/components/ui";
import { Calendar, MapPin, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <Card className={cn("flex flex-col overflow-hidden group", className)}>
      <Link href={`/events/${event.id}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-muted flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <CardHeader>
          <h3 className="font-semibold line-clamp-1">{event.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </CardHeader>
        <CardFooter className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
} 