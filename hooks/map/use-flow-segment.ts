import { useQuery } from '@tanstack/react-query';
import type { LngLat } from '@tomtom-international/web-sdk-maps';

interface FlowSegmentData {
  flowSegmentData: {
    freeFlowSpeed: number;
    currentSpeed: number;
    currentTravelTime: number;
    freeFlowTravelTime: number;
    confidence: number;
    roadClosure: boolean;
    coordinates: {
      coordinate: number[][];
    };
    street?: string;
    name?: string; // Street name from API
    properties?: {
      speedLimit?: number;
      roadType?: string;
    };
  };
}

export async function getFlowSegmentData(point: LngLat): Promise<FlowSegmentData['flowSegmentData']> {
  try {
    // First get the flow segment data
    const flowResponse = await fetch(
      `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?` +
      `point=${point.lat},${point.lng}&` +
      `key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}&` +
      `unit=KMPH&` +
      `thickness=10` // Increase detection area
    );

    if (!flowResponse.ok) {
      throw new Error('Failed to fetch flow segment data');
    }

    const data = await flowResponse.json() as FlowSegmentData;
    console.log('Raw traffic flow response:', data);

    if (!data.flowSegmentData) {
      throw new Error('No flow segment data available for this location');
    }

    // Get street name using reverse geocoding
    const geoResponse = await fetch(
      `https://api.tomtom.com/search/2/reverseGeocode/${point.lat},${point.lng}.json?` +
      `key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}&` +
      `language=pt-BR`
    );

    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      const streetName = geoData.addresses?.[0]?.address?.streetName;
      if (streetName) {
        data.flowSegmentData.street = streetName;
      }
    }

    // Process the speed data
    const flowData = data.flowSegmentData;
    const currentSpeed = flowData.currentSpeed;
    const freeFlowSpeed = flowData.freeFlowSpeed;

    // Log speeds for debugging
    console.log('Speed data:', {
      raw: { current: currentSpeed, freeFlow: freeFlowSpeed },
      processed: {
        current: currentSpeed > 100 ? currentSpeed / 3.6 : currentSpeed,
        freeFlow: freeFlowSpeed > 100 ? freeFlowSpeed / 3.6 : freeFlowSpeed
      }
    });

    return {
      ...flowData,
      // Convert speeds if they're not already in km/h (if in m/s)
      currentSpeed: currentSpeed > 100 ? currentSpeed / 3.6 : currentSpeed,
      freeFlowSpeed: freeFlowSpeed > 100 ? freeFlowSpeed / 3.6 : freeFlowSpeed,
    };
  } catch (error) {
    console.error('Error fetching traffic data:', error);
    throw error;
  }
}

export function useFlowSegment(point: LngLat | null) {
  return useQuery({
    queryKey: ['traffic', 'flow-segment', point?.toString()],
    queryFn: () => point ? getFlowSegmentData(point) : null,
    enabled: !!point,
    retry: false, // Don't retry if there's no data for a location
    staleTime: 30 * 1000, // Consider data stale after 30 seconds
  });
} 