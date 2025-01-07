"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

export function MapHeader() {
  return (
    <div className="bg-background border-b">
      <div className="container px-4 h-16 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search locations..." className="pl-8" />
        </div>
        <Button variant="outline" size="sm">
          <MapPin className="h-4 w-4 mr-2" />
          Current Location
        </Button>
      </div>
    </div>
  );
} 