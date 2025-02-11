'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Bot, Database, Cloud, Map, Globe, Cpu, Code, Braces } from 'lucide-react'

const technologies = {
  core: {
    title: "Core",
    items: [
      {
        name: "Next.js",
        icon: "/icons/nextjs.svg",
        color: "from-black to-zinc-800"
      },
      {
        name: "TypeScript",
        icon: "/icons/typescript.svg",
        color: "from-blue-500 to-blue-600"
      },
      {
        name: "Tailwind",
        icon: "/icons/tailwind.svg",
        color: "from-cyan-500 to-cyan-600"
      }
    ]
  },
  ai: {
    title: "AI & ML",
    items: [
      {
        name: "OpenAI",
        icon: "/icons/openai.svg",
        color: "from-green-500 to-emerald-600"
      },
      {
        name: "Eleven Labs",
        icon: "/icons/elevenlabs.svg",
        color: "from-purple-500 to-purple-600"
      }
    ]
  },
  infrastructure: {
    title: "Infrastructure",
    items: [
      {
        name: "Vercel",
        icon: "/icons/vercel.svg",
        color: "from-zinc-800 to-zinc-900"
      },
      {
        name: "Supabase",
        icon: "/icons/supabase.svg",
        color: "from-emerald-500 to-emerald-600"
      },
      {
        name: "Git",
        icon: "/icons/git.svg",
        color: "from-orange-500 to-orange-600"
      }
    ]
  },
  apis: {
    title: "Third-Party APIs",
    items: [
      {
        name: "OpenWeatherMap",
        icon: "/icons/openweather.svg",
        color: "from-orange-500 to-red-500"
      },
      {
        name: "TomTom",
        icon: "/icons/tomtom.svg",
        color: "from-blue-600 to-indigo-600"
      }
    ]
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function ArchitectureSlide() {
  return (
    <div className={cn(
      "w-full max-w-[85vw] aspect-video rounded-2xl overflow-hidden",
      "bg-gradient-to-br from-zinc-900 to-zinc-800 relative"
    )}>
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.015]" />

      <div className="relative h-full flex flex-col px-[8%] py-[6%]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold text-white/90 mb-12 text-center"
        >
          Arquitetura do Sistema
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 grid grid-cols-[1fr_auto_1fr] gap-12"
        >
          {/* Left Column - Frontend & AI */}
          <div className="space-y-8">
            {/* Core Technologies */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-2">
                <Code className="h-5 w-5" />
                {technologies.core.title}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {technologies.core.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "p-4 rounded-xl bg-gradient-to-br",
                      tech.color
                    )}
                  >
                    <div className="aspect-square rounded-lg bg-white/10 p-3 flex items-center justify-center">
                      <img src={tech.icon} alt={tech.name} className="h-8 w-8" />
                    </div>
                    <p className="text-sm text-white/90 mt-2 text-center">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5" />
                {technologies.ai.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {technologies.ai.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "p-4 rounded-xl bg-gradient-to-br",
                      tech.color
                    )}
                  >
                    <div className="aspect-square rounded-lg bg-white/10 p-3 flex items-center justify-center">
                      <img src={tech.icon} alt={tech.name} className="h-8 w-8" />
                    </div>
                    <p className="text-sm text-white/90 mt-2 text-center">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center - Connection Lines */}
          <motion.div
            variants={itemVariants}
            className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <Globe className="h-6 w-6 text-white/40" />
            </div>
          </motion.div>

          {/* Right Column - Infrastructure & APIs */}
          <div className="space-y-8">
            {/* Infrastructure */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                {technologies.infrastructure.title}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {technologies.infrastructure.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "p-4 rounded-xl bg-gradient-to-br",
                      tech.color
                    )}
                  >
                    <div className="aspect-square rounded-lg bg-white/10 p-3 flex items-center justify-center">
                      <img src={tech.icon} alt={tech.name} className="h-8 w-8" />
                    </div>
                    <p className="text-sm text-white/90 mt-2 text-center">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* APIs */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {technologies.apis.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {technologies.apis.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "p-4 rounded-xl bg-gradient-to-br",
                      tech.color
                    )}
                  >
                    <div className="aspect-square rounded-lg bg-white/10 p-3 flex items-center justify-center">
                      <img src={tech.icon} alt={tech.name} className="h-8 w-8" />
                    </div>
                    <p className="text-sm text-white/90 mt-2 text-center">{tech.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 