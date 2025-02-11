'use client'

import { createRoot } from 'react-dom/client'
import tt from '@tomtom-international/web-sdk-maps'
import { FlowSegmentInfo } from './FlowSegmentInfo'

interface FlowSegmentPopupProps {
  map: tt.Map
  data: any
  coordinates: [number, number]
  onClose: () => void
}

export function createFlowSegmentPopup({ map, data, coordinates, onClose }: FlowSegmentPopupProps) {
  const popupNode = document.createElement('div')
  const root = createRoot(popupNode)

  const popup = new tt.Popup({
    closeButton: false,
    closeOnClick: false,
    anchor: 'bottom',
    offset: [0, -15]
  })
    .setLngLat(new tt.LngLat(coordinates[0], coordinates[1]))
    .setDOMContent(popupNode)
    .addTo(map)

  root.render(
    <FlowSegmentInfo
      data={data}
      isLoading={false}
      error={null}
      onClose={() => {
        popup.remove()
        onClose()
      }}
    />
  )

  return popup
} 