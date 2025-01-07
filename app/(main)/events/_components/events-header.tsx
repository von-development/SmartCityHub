"use client";

import { motion } from "framer-motion";

export function EventsHeader() {
  return (
    <div className="bg-muted py-12">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-3xl font-bold mb-4">Events in Aveiro</h1>
          <p className="text-muted-foreground">
            Discover cultural events, festivals, exhibitions, and more happening in
            Aveiro. Filter by date, category, or location to find the perfect event
            for you.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 