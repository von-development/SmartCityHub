export interface ChargingConnector {
  type: string
  powerKW: number
  available: boolean
  total: number
}

export interface ChargingStation {
  id: string
  name: string
  location: {
    lat: number
    lng: number
  }
  connectors: ChargingConnector[]
  address: string
  operatorName?: string
  availability?: {
    available: number
    total: number
  }
}

export interface TrafficIncident {
  id: string
  type: string
  severity: number
  from: string
  to: string
  length: number
  delay: number
  description: string
  geometry?: {
    coordinates: number[][]
  }
} 