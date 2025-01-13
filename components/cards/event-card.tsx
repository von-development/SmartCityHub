"use client";

import { Card } from "@/components/ui";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import type { Event } from "@/types";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const imageSrc = event.image || '/img/placeholder.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="overflow-hidden">
        <div className="relative h-[300px] overflow-hidden">
          <Image
            src={imageSrc}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {event.description}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 