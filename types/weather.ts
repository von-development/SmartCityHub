export interface CurrentWeather {
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
}

export interface ForecastDay {
  date: number;
  temp_min: number;
  temp_max: number;
  icon: string;
}

export interface WeatherResponse {
  current?: CurrentWeather;
  forecast?: ForecastDay[];
} 