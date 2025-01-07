"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";

export function EventFilters() {
  return (
    <Card className="p-4 lg:sticky lg:top-20 space-y-4">
      <div className="space-y-2">
        <h2 className="font-semibold">Search</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-8" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Date</h2>
        <div className="grid gap-2">
          <Button variant="outline" className="justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Select date
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Categories</h2>
        <div className="grid gap-2">
          {["All", "Cultural", "Music", "Food", "Sports"].map((category) => (
            <Button
              key={category}
              variant="ghost"
              className="justify-start font-normal"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
} 