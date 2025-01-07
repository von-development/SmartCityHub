import type { CurrentWeather, ForecastDay } from "@/types/weather";

const WEATHER_API_BASE = 'http://localhost:8000/weather';

export async function getCurrentWeather(): Promise<CurrentWeather> {
  const response = await fetch(`${WEATHER_API_BASE}/current`);
  if (!response.ok) {
    throw new Error('Failed to fetch current weather');
  }
  const data = await response.json();
  return data.current;
}

export async function getWeatherForecast(): Promise<ForecastDay[]> {
  const response = await fetch(`${WEATHER_API_BASE}/forecast`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast');
  }
  const data = await response.json();
  return data.forecast;
} 