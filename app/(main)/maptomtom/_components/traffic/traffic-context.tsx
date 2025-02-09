'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TrafficContextType {
  showTraffic: boolean
  showIncidents: boolean
  trafficStyle: 'relative' | 'absolute'
  setShowTraffic: (show: boolean) => void
  setShowIncidents: (show: boolean) => void
  setTrafficStyle: (style: 'relative' | 'absolute') => void
}

const TrafficContext = createContext<TrafficContextType | undefined>(undefined)

export function TrafficProvider({ children }: { children: ReactNode }) {
  const [showTraffic, setShowTraffic] = useState(false)
  const [showIncidents, setShowIncidents] = useState(false)
  const [trafficStyle, setTrafficStyle] = useState<'relative' | 'absolute'>('relative')

  return (
    <TrafficContext.Provider value={{
      showTraffic,
      showIncidents,
      trafficStyle,
      setShowTraffic,
      setShowIncidents,
      setTrafficStyle,
    }}>
      {children}
    </TrafficContext.Provider>
  )
}

export function useTraffic() {
  const context = useContext(TrafficContext)
  if (context === undefined) {
    throw new Error('useTraffic must be used within a TrafficProvider')
  }
  return context
} 