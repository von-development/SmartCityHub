"use client";

import { EventCard } from "@/components/cards";
import type { Event } from "@/types";

// This will come from your API later
const EVENTS: Event[] = [
  {
    id: "1",
    title: "Art Festival",
    description: "Annual art festival featuring local artists",
    date: "2024-04-15",
    location: "City Center",
  },
  {
    id: "2",
    title: "Music in the Park",
    description: "Live music performances in the central park",
    date: "2024-04-20",
    location: "Central Park",
  },
  {
    id: "3",
    title: "Food & Wine Festival",
    description: "Taste the best of Aveiro's cuisine",
    date: "2024-04-22",
    location: "Praça do Peixe",
  },
];

export function EventList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {EVENTS.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
} 