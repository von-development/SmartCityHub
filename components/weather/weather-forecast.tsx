"use client";

import { useWeatherForecast } from "@/hooks/weather/use-weather-forecast";
import { Card } from "@/components/ui/card";
import { WeatherIcon } from "./weather-icon";
import type { ForecastDay } from "@/types/weather";

export function WeatherForecast() {
  const { data: forecast, isLoading, error } = useWeatherForecast();

  if (isLoading) {
    return (
      <div className="grid grid-cols-5 gap-2">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="h-32 animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  if (error || !forecast) {
    return null;
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {forecast.map((day: ForecastDay) => (
        <Card key={day.date} className="p-3 text-center">
          <div className="text-sm text-muted-foreground">
            {new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
          </div>
          <WeatherIcon
            icon={day.icon}
            description={day.description}
            className="mx-auto my-2"
          />
          <div className="flex justify-center gap-2 text-sm">
            <span className="font-medium">{Math.round(day.temp_max)}°</span>
            <span className="text-muted-foreground">
              {Math.round(day.temp_min)}°
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
} 