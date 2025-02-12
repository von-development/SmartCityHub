'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { 
  Bot, 
  Layout, 
  Users, 
  Code, 
  FileCode, 
  Paintbrush, 
  FileJson, 
  Brain, 
  Workflow, 
  Navigation2, 
  Cloud, 
  MessageSquare, 
  Map, 
  Zap
} from 'lucide-react'

const technologies = {
  frontend: {
    title: "Frontend",
    icon: <Layout className="h-5 w-5" />,
    items: [
      {
        name: "Next.js",
        icon: <FileCode className="h-6 w-6" />,
        color: "from-black to-zinc-800",
        description: "Framework React"
      },
      {
        name: "TypeScript",
        icon: <Code className="h-6 w-6" />,
        color: "from-blue-500 to-blue-600",
        description: "Type Safety"
      },
      {
        name: "Tailwind CSS",
        icon: <Paintbrush className="h-6 w-6" />,
        color: "from-cyan-500 to-cyan-600",
        description: "Styling"
      },
      {
        name: "HTML5",
        icon: <FileJson className="h-6 w-6" />,
        color: "from-orange-500 to-red-500",
        description: "Structure"
      }
    ]
  },
  ai: {
    title: "AI Services",
    icon: <Bot className="h-5 w-5" />,
    items: [
      {
        name: "OpenAI",
        icon: <Brain className="h-6 w-6" />,
        color: "from-green-500 to-emerald-600",
        description: "Chat & Intelligence"
      },
      {
        name: "LangChain",
        icon: <Workflow className="h-6 w-6" />,
        color: "from-yellow-500 to-yellow-600",
        description: "AI Framework"
      }
    ]
  },
  mapping: {
    title: "Location Services",
    icon: <Navigation2 className="h-5 w-5" />,
    items: [
      {
        name: "TomTom Maps",
        icon: <Map className="h-6 w-6" />,
        color: "from-blue-600 to-indigo-600",
        description: "Maps & Navigation"
      },
      {
        name: "OpenWeather",
        icon: <Cloud className="h-6 w-6" />,
        color: "from-orange-500 to-red-500",
        description: "Weather Data"
      }
    ]
  },
  user: {
    title: "User Experience",
    icon: <Users className="h-5 w-5" />,
    items: [
      {
        name: "Chat Interface",
        icon: <MessageSquare className="h-6 w-6" />,
        color: "from-purple-500 to-purple-600",
        description: "AI Interaction"
      },
      {
        name: "Interactive Maps",
        icon: <Navigation2 className="h-6 w-6" />,
        color: "from-green-500 to-green-600",
        description: "City Navigation"
      },
      {
        name: "Real-time Updates",
        icon: <Zap className="h-6 w-6" />,
        color: "from-blue-500 to-blue-600",
        description: "Live Information"
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
    <div className="w-full max-w-[85vw] aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 relative">
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.015]" />

      <div className="relative h-full flex flex-col px-[5%] py-[4%]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold text-white/90 mb-8 text-center"
        >
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-8 flex-1"
        >
          {Object.entries(technologies).map(([key, section]) => (
            <motion.div key={key} variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-medium text-white/80 flex items-center gap-2">
                {section.icon}
                {section.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {section.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "p-4 rounded-xl bg-gradient-to-br",
                      tech.color,
                      "flex flex-col items-center"
                    )}
                  >
                    <div className="aspect-square w-12 rounded-lg bg-white/10 p-2.5 flex items-center justify-center text-white">
                      {tech.icon}
                    </div>
                    <p className="text-sm font-medium text-white/90 mt-2">{tech.name}</p>
                    <p className="text-xs text-white/60 mt-1">{tech.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 