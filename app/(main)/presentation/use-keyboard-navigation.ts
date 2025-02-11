import { useEffect } from 'react'

interface KeyboardNavigationProps {
  onNext: () => void
  onPrevious: () => void
}

export function useKeyboardNavigation({ onNext, onPrevious }: KeyboardNavigationProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowRight':
        case 'Space':
          onNext()
          break
        case 'ArrowLeft':
          onPrevious()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNext, onPrevious])
} 