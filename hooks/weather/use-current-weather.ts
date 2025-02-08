import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather } from '@/hooks/weather/weather';

export function useCurrentWeather() {
  return useQuery({
    queryKey: ['weather', 'current'],
    queryFn: getCurrentWeather,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
} 