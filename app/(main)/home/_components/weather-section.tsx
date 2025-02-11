"use client"

import { Card } from "@/components/ui/card"
import { useCurrentWeather } from "@/hooks/weather/use-current-weather"
import { useWeatherForecast } from "@/hooks/weather/use-weather-forecast"
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  Sun,
  Thermometer,
  Umbrella,
  Wind,
  LucideIcon
} from "lucide-react"
import { motion } from "framer-motion"

// Define a type for the weather icon keys
type WeatherIconKey = 
  | "01d" | "01n" 
  | "02d" | "02n" 
  | "03d" | "03n" 
  | "04d" | "04n"
  | "09d" | "09n" 
  | "10d" | "10n"
  | "11d" | "11n"
  | "13d" | "13n"
  | "50d" | "50n"

// Define the weatherIcons object with the correct type
const weatherIcons: Record<WeatherIconKey, LucideIcon> = {
  "01d": Sun,
  "01n": Sun,
  "02d": Cloud,
  "02n": Cloud,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudRain,
  "09n": CloudRain,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,
}

function getTemperatureGradient(temperature: number): string {
  if (temperature < 10) {
    return "from-blue-500 via-blue-700 to-blue-900"
  } else if (temperature < 20) {
    return "from-green-500 via-green-700 to-green-900"
  } else if (temperature < 30) {
    return "from-yellow-500 via-yellow-700 to-yellow-900"
  } else {
    return "from-red-500 via-red-700 to-red-900"
  }
}

function getTimeGradient(): string {
  const now = new Date()
  const hours = now.getHours()
  if (hours < 6 || hours >= 18) {
    return "bg-gradient-to-b from-blue-900 to-black"
  } else {
    return "bg-gradient-to-b from-yellow-500 to-yellow-200"
  }
}

export function WeatherSection() {
  const { data: weather, isLoading: isLoadingCurrent } = useCurrentWeather()
  const { data: forecast, isLoading: isLoadingForecast } = useWeatherForecast()

  if (isLoadingCurrent || isLoadingForecast) {
    return (
      <Card className="h-48 animate-pulse bg-muted">
        <div className="h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </Card>
    )
  }

  if (!weather || !forecast) return null

  // Type assertion to ensure weather.icon is a valid key
  const WeatherIcon = weatherIcons[weather.icon as WeatherIconKey] || Cloud
  const tempGradient = getTemperatureGradient(weather.temperature)
  const timeGradient = getTimeGradient()

  return (
    <section className="container px-4 py-2">
      <Card className="overflow-hidden shadow-lg">
        <div className={`bg-gradient-to-br ${tempGradient}`}>
          <div className={`${timeGradient}`}>
            <div className="p-3">
              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,2fr] gap-4">
                {/* Current Weather */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
                      <WeatherIcon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl font-bold text-white"
                      >
                        {Math.round(weather.temperature)}°C
                      </motion.h2>
                      <p className="text-sm text-white/90 capitalize">{weather.description}</p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Thermometer, label: `Sensação ${Math.round(weather.feels_like)}°C` },
                      { icon: Droplets, label: `Humidade ${weather.humidity}%` },
                      { icon: Wind, label: `${Math.round(weather.wind_speed * 3.6)} km/h` },
                      { icon: Umbrella, label: "30% chance" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 bg-white/10 rounded-lg p-1.5"
                      >
                        <item.icon className="h-3.5 w-3.5 text-white" />
                        <span className="text-xs text-white">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Forecast */}
                <div className="grid grid-cols-5 gap-2">
                  {forecast.map((day, index) => {
                    const ForecastIcon = weatherIcons[day.icon as WeatherIconKey] || Cloud
                    return (
                      <motion.div
                        key={day.date}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                          <p className="text-[10px] font-medium mb-1 text-white">
                            {new Date(day.date).toLocaleDateString("pt-BR", {
                              weekday: "short",
                            })}
                          </p>
                          <div className="p-1 rounded-full bg-white/10 mx-auto w-fit mb-1">
                            <ForecastIcon className="h-5 w-5 text-white" />
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-xs font-medium text-white">{Math.round(day.temp_max)}°</div>
                            <div className="text-[10px] text-white/70">{Math.round(day.temp_min)}°</div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}

