import { useQuery } from '@tanstack/react-query';
import { getWeatherForecast } from '@/lib/api/weather';

export function useWeatherForecast() {
  return useQuery({
    queryKey: ['weather', 'forecast'],
    queryFn: getWeatherForecast,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
} 