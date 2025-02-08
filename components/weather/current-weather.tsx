"use client";

import { useCurrentWeather } from "@/hooks/weather/use-current-weather";
import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./weather-icon";
import { Thermometer, Droplets, Wind } from "lucide-react";

export function CurrentWeather() {
  const { data: weather, isLoading, error } = useCurrentWeather();

  if (isLoading) {
    return <Card className="h-32 animate-pulse bg-muted" />;
  }

  if (error || !weather) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <WeatherIcon
          icon={weather.icon}
          description={weather.description}
          className="w-16 h-16"
        />
        <div>
          <div className="text-2xl font-bold">
            {Math.round(weather.temperature)}°C
          </div>
          <div className="text-sm text-muted-foreground">
            {weather.description}
          </div>
        </div>
        <div className="ml-auto flex gap-4">
          <div className="flex items-center gap-1">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Feels like {Math.round(weather.feels_like)}°C
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{weather.wind_speed} m/s</span>
          </div>
        </div>
      </div>
    </Card>
  );
} 