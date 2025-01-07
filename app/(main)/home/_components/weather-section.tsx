"use client";

import { Card } from "@/components/ui";
import { useCurrentWeather } from "@/hooks/weather/use-current-weather";
import { useWeatherForecast } from "@/hooks/weather/use-weather-forecast";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  Snowflake,
  Sun,
  Thermometer,
  Umbrella,
  Wind,
} from "lucide-react";
import { motion } from "framer-motion";

// Map weather conditions to custom icons
const weatherIcons: Record<string, React.ElementType> = {
  "01d": Sun, // clear sky day
  "01n": Sun, // clear sky night
  "02d": Cloud, // few clouds
  "02n": Cloud,
  "03d": Cloud, // scattered clouds
  "03n": Cloud,
  "04d": Cloud, // broken clouds
  "04n": Cloud,
  "09d": CloudDrizzle, // shower rain
  "09n": CloudDrizzle,
  "10d": CloudRain, // rain
  "10n": CloudRain,
  "11d": CloudLightning, // thunderstorm
  "11n": CloudLightning,
  "13d": CloudSnow, // snow
  "13n": CloudSnow,
  "50d": CloudFog, // mist
  "50n": CloudFog,
};

// Get gradient based on temperature
function getTemperatureGradient(temp: number) {
  if (temp <= 0) return "from-blue-400 to-blue-600";
  if (temp <= 10) return "from-cyan-400 to-blue-500";
  if (temp <= 20) return "from-blue-400 to-indigo-500";
  if (temp <= 25) return "from-orange-400 to-amber-500";
  return "from-orange-500 to-red-500";
}

// Get time of day gradient overlay
function getTimeGradient() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "bg-gradient-to-br from-yellow-400/10 to-blue-500/10"; // Morning
  if (hour >= 12 && hour < 17) return "bg-gradient-to-br from-blue-400/10 to-blue-500/10"; // Afternoon
  if (hour >= 17 && hour < 20) return "bg-gradient-to-br from-orange-400/10 to-purple-500/10"; // Evening
  return "bg-gradient-to-br from-blue-900/20 to-blue-800/20"; // Night
}

export function WeatherSection() {
  const { data: weather, isLoading: isLoadingCurrent } = useCurrentWeather();
  const { data: forecast, isLoading: isLoadingForecast } = useWeatherForecast();

  if (isLoadingCurrent || isLoadingForecast) {
    return (
      <Card className="h-48 animate-pulse bg-muted">
        <div className="h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </Card>
    );
  }

  if (!weather || !forecast) return null;

  const WeatherIcon = weatherIcons[weather.icon] || Cloud;
  const tempGradient = getTemperatureGradient(weather.temperature);
  const timeGradient = getTimeGradient();

  return (
    <section className="container px-4">
      <Card className="overflow-hidden">
        <div className={`bg-gradient-to-br ${tempGradient}`}>
          <div className={`${timeGradient}`}>
            <div className="p-6 text-white">
              <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-6">
                {/* Current Weather */}
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                      <WeatherIcon className="h-12 w-12" />
                    </div>
                    <div>
                      <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-4xl font-bold"
                      >
                        {Math.round(weather.temperature)}°C
                      </motion.h2>
                      <p className="text-lg text-white/90 capitalize">
                        {weather.description}
                      </p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 bg-white/10 rounded-lg p-2"
                    >
                      <Thermometer className="h-4 w-4 text-white/80" />
                      <span className="text-sm">
                        Sensação {Math.round(weather.feels_like)}°C
                      </span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 bg-white/10 rounded-lg p-2"
                    >
                      <Droplets className="h-4 w-4 text-white/80" />
                      <span className="text-sm">
                        Humidade {weather.humidity}%
                      </span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2 bg-white/10 rounded-lg p-2"
                    >
                      <Wind className="h-4 w-4 text-white/80" />
                      <span className="text-sm">
                        {Math.round(weather.wind_speed * 3.6)} km/h
                      </span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2 bg-white/10 rounded-lg p-2"
                    >
                      <Umbrella className="h-4 w-4 text-white/80" />
                      <span className="text-sm">30% chance</span>
                    </motion.div>
                  </div>
                </div>

                {/* Forecast */}
                <div className="grid grid-cols-5 gap-2">
                  {forecast.map((day, index) => {
                    const ForecastIcon = weatherIcons[day.icon] || Cloud;
                    return (
                      <motion.div
                        key={day.date}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="text-center p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                          <p className="text-xs font-medium mb-2">
                            {new Date(day.date).toLocaleDateString('pt-BR', {
                              weekday: 'short',
                            })}
                          </p>
                          <div className="p-2 rounded-full bg-white/10 mx-auto w-fit mb-2">
                            <ForecastIcon className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {Math.round(day.temp_max)}°
                            </div>
                            <div className="text-xs text-white/70">
                              {Math.round(day.temp_min)}°
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
} 