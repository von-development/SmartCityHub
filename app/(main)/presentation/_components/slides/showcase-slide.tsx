'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { PhoneIcon, MapPin, Bell, Calendar, Search, MessageSquare } from 'lucide-react'

const showcaseFeatures = [
  {
    title: "Mapa Interativo",
    description: "Navegue pela cidade com informações em tempo real",
    icon: MapPin,
    color: "from-blue-500 to-indigo-500",
    delay: 0.2
  },
  {
    title: "Notificações Inteligentes",
    description: "Receba alertas personalizados sobre eventos e serviços",
    icon: Bell,
    color: "from-emerald-500 to-teal-500",
    delay: 0.3
  },
  {
    title: "Agenda da Cidade",
    description: "Acompanhe eventos e atividades culturais",
    icon: Calendar,
    color: "from-purple-500 to-pink-500",
    delay: 0.4
  }
]

export function ShowcaseSlide() {
  return (
    <div className={cn(
      "w-full max-w-[85vw] aspect-video rounded-2xl overflow-hidden",
      "bg-gradient-to-br from-zinc-900 to-zinc-800 relative"
    )}>
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.015]" />

      {/* Content Container */}
      <div className="relative h-full flex items-center px-[8%] py-[6%]">
        {/* Left Side - Phone Mockup */}
        <div className="flex-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* Phone Frame */}
            <div className="relative w-[250px] h-[500px] rounded-[2.5rem] border-[12px] border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
              {/* GIF Content */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative h-full w-full"
              >
                <img 
                  src="/gifs/ui_home.gif"
                  alt="App Interface Demo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>

            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-800 rounded-b-3xl" />
          </motion.div>
        </div>

        {/* Right Side - Features List */}
        <div className="flex-1 pl-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-white/90 mb-8"
          >
            Experiência Mobile
          </motion.h2>

          <div className="space-y-6">
            {showcaseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: feature.delay }}
                className="flex items-start gap-4"
              >
                <div className={cn(
                  "p-3 rounded-xl bg-gradient-to-br",
                  feature.color
                )}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 