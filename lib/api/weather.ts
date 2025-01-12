import type { CurrentWeather, ForecastDay } from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const CITY_ID = '2742611'; // Aveiro, Portugal
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface OpenWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      icon: string;
    }>;
  }>;
}

export async function getCurrentWeather(): Promise<CurrentWeather> {
  const response = await fetch(
    `${BASE_URL}/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric&lang=pt`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch current weather');
  }
  
  const data = await response.json() as OpenWeatherResponse;
  
  return {
    temperature: data.main.temp,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    wind_speed: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

export async function getWeatherForecast(): Promise<ForecastDay[]> {
  const response = await fetch(
    `${BASE_URL}/forecast?id=${CITY_ID}&appid=${API_KEY}&units=metric&lang=pt`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast');
  }
  
  const data = await response.json() as OpenWeatherForecastResponse;
  
  // Group forecast by day and get min/max temps
  const dailyForecasts = data.list.reduce<Record<string, ForecastDay>>((acc, forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    
    if (!acc[date]) {
      acc[date] = {
        date: forecast.dt * 1000,
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        icon: forecast.weather[0].icon
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    
    return acc;
  }, {});

  return Object.values(dailyForecasts).slice(0, 5);
} 