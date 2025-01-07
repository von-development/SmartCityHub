export interface CurrentWeather {
  temperature: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
}

export interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
}

export interface WeatherResponse {
  current?: CurrentWeather;
  forecast?: ForecastDay[];
} 