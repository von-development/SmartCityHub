'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useFullscreen } from './use-fullscreen'
import { useKeyboardNavigation } from './use-keyboard-navigation'
import { NavigationControls } from './_components/navigation-controls'
import { Slide } from './_components/slide'
import { UserCategoriesSlide } from './_components/slides/user-categories-slide'
import { AveiroConnectSlide } from './_components/slides/aveiro-connect-slide'
import { ShowcaseSlide } from './_components/slides/showcase-slide'
import { ArchitectureSlide } from './_components/slides/architecture-slide'
import { SystemDiagramSlide } from './_components/slides/system-diagram-slide'
import { FragmentedServicesSlide } from './_components/slides/fragmented-services-slide'

const slides = [
  {
    id: 1,
    type: 'content' as const,
    title: "Desafios Atuais",
    subtitle: "Por que precisamos mudar?",
    content: "Análise dos problemas e limitações existentes",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: 2,
    type: 'component' as const,
    component: UserCategoriesSlide,
    gradient: "from-zinc-900 to-zinc-800"
  },
  {
    id: 3,
    type: 'component' as const,
    component: FragmentedServicesSlide,
    gradient: "from-zinc-900 to-zinc-800"
  },
  {
    id: 4,
    type: 'component' as const,
    component: AveiroConnectSlide,
    gradient: "from-white to-zinc-100"
  },
  {
    id: 5,
    type: 'component' as const,
    component: ShowcaseSlide,
    gradient: "from-zinc-900 to-zinc-800"
  },
  {
    id: 6,
    type: 'component' as const,
    component: ArchitectureSlide,
    gradient: "from-zinc-900 to-zinc-800"
  },
  {
    id: 7,
    type: 'component' as const,
    component: SystemDiagramSlide,
    gradient: "from-zinc-900 to-zinc-800"
  },
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  useKeyboardNavigation({
    onNext: () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1)),
    onPrevious: () => setCurrentSlide(prev => Math.max(prev - 1, 0))
  })

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div className="w-full h-[100dvh] overflow-hidden bg-black">
      <div className={cn(
        "relative w-full h-full flex items-center justify-center",
        isFullscreen ? "p-0" : "p-4 md:p-6 lg:p-8"
      )}>
        <NavigationControls
          currentSlide={currentSlide}
          totalSlides={slides.length}
          isFullscreen={isFullscreen}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onToggleFullscreen={toggleFullscreen}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            <Slide {...slides[currentSlide]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
} 