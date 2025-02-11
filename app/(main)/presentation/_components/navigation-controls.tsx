'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

interface NavigationControlsProps {
  currentSlide: number
  totalSlides: number
  isFullscreen: boolean
  onNext: () => void
  onPrevious: () => void
  onToggleFullscreen: () => void
}

export function NavigationControls({
  currentSlide,
  totalSlides,
  isFullscreen,
  onNext,
  onPrevious,
  onToggleFullscreen
}: NavigationControlsProps) {
  return (
    <>
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFullscreen}
          className="text-white hover:bg-white/10"
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 z-50 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className="text-white hover:bg-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span className="text-white/80 text-sm">
          {currentSlide + 1} / {totalSlides}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="text-white hover:bg-white/10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
} 