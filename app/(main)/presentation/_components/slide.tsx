'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface BaseSlideProps {
  gradient: string
}

interface ContentSlideProps extends BaseSlideProps {
  type: 'content'
  title: string
  subtitle: string
  content: string
}

interface ComponentSlideProps extends BaseSlideProps {
  type: 'component'
  component: React.ComponentType
}

export type SlideProps = ContentSlideProps | ComponentSlideProps

export function Slide(props: SlideProps) {
  if (props.type === 'component') {
    const Component = props.component
    return <Component />
  }

  return (
    <div className={cn(
      "w-full max-w-[85vw] aspect-video rounded-2xl overflow-hidden",
      "bg-gradient-to-br",
      props.gradient
    )}>
      <div className="h-full flex flex-col justify-center items-start px-[10%] py-[8%]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {props.title}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8"
        >
          {props.subtitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg lg:text-xl text-white/80 max-w-3xl"
        >
          {props.content}
        </motion.p>
      </div>
    </div>
  )
} 