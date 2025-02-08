import { useQuery } from '@tanstack/react-query';
import { getTrafficFlow } from './traffic';
import type { LngLatBounds } from '@tomtom-international/web-sdk-maps';

export function useTrafficFlow(bounds: LngLatBounds | null) {
  return useQuery({
    queryKey: ['traffic', 'flow', bounds?.toString() ?? 'initial'],
    queryFn: () => {
      if (!bounds) return null;
      return getTrafficFlow(bounds);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    enabled: !!bounds,
  });
} 