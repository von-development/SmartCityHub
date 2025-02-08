import type { LngLatBounds } from '@tomtom-international/web-sdk-maps';

interface TrafficFlowResponse {
  flowSegmentData: {
    currentSpeed: number;
    freeFlowSpeed: number;
    currentTravelTime: number;
    freeFlowTravelTime: number;
    confidence: number;
    roadClosure: boolean;
  };
}

interface TrafficIncident {
  id: string;
  type: string;
  severity: number;
  from: string;
  to: string;
  length: number;
  delay: number;
  description: string;
  geometry: {
    type: string;
    coordinates: [number, number][];
  };
}

interface TrafficIncidentsResponse {
  incidents: TrafficIncident[];
}

const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;
const BASE_URL = 'https://api.tomtom.com/traffic/services/4';

export async function getTrafficFlow(bounds: LngLatBounds): Promise<TrafficFlowResponse> {
  const [sw, ne] = bounds.toArray();
  const response = await fetch(
    `${BASE_URL}/flowSegmentData/absolute/10/json?` +
    `key=${API_KEY}&` +
    `point=${sw[1]},${sw[0]}&` +
    `point=${ne[1]},${ne[0]}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch traffic flow data');
  }

  return response.json();
}

export async function getTrafficIncidents(bounds: LngLatBounds): Promise<TrafficIncidentsResponse> {
  const [sw, ne] = bounds.toArray();
  const response = await fetch(
    `${BASE_URL}/incidentDetails/s3/${sw[1]},${sw[0]}/${ne[1]},${ne[0]}/10/-1/json?` +
    `key=${API_KEY}&` +
    `language=pt-BR`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch traffic incidents');
  }

  return response.json();
} 