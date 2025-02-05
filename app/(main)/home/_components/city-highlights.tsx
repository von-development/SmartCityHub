"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Landmark, Waves, Ship, Coffee } from "lucide-react";
import { motion } from "framer-motion";

interface Highlight {
  title: string;
  description: string;
  icon: React.ElementType;
}

const highlights: Highlight[] = [
  {
    title: "Historic Center",
    description: "Explore the beautiful Art Nouveau architecture",
    icon: Landmark,
  },
  {
    title: "Canals",
    description: "Take a tour through the city's famous canals",
    icon: Waves,
  },
  {
    title: "Moliceiros",
    description: "Traditional boats with unique designs",
    icon: Ship,
  },
  {
    title: "Local Cuisine",
    description: "Taste the famous ovos moles and fresh seafood",
    icon: Coffee,
  },
];

export function CityHighlights() {
  return (
    <section className="container px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">City Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <highlight.icon className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 