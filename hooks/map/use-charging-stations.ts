import { useQuery } from '@tanstack/react-query';
import type { LngLatBounds } from '@tomtom-international/web-sdk-maps';

interface ChargingConnector {
  type: string;
  powerKW: number;
  available: boolean;
  total: number;
}

export interface ChargingStation {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  connectors: ChargingConnector[];
  address: string;
  operatorName: string;
}

interface ChargingAvailabilityResponse {
  stations: ChargingStation[];
}

const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;
const BASE_URL = 'https://api.tomtom.com/search/2/chargingAvailability.json';

export async function getChargingStations(bounds: LngLatBounds): Promise<ChargingAvailabilityResponse> {
  const [sw, ne] = bounds.toArray();
  const response = await fetch(
    `${BASE_URL}?` +
    `key=${API_KEY}&` +
    `bbox=${sw[0]},${sw[1]},${ne[0]},${ne[1]}&` +
    `minPowerKW=0`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch charging stations');
  }

  return response.json();
}

export function useChargingStations(bounds: LngLatBounds | null) {
  return useQuery({
    queryKey: ['charging', 'stations', bounds?.toString() ?? 'initial'],
    queryFn: () => {
      if (!bounds) return null;
      return getChargingStations(bounds);
    },
    staleTime: 3 * 60 * 1000, // 3 minutes as per API docs
    refetchInterval: 3 * 60 * 1000, // Refresh every 3 minutes
    enabled: !!bounds,
  });
} 