'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Globe, Bus, Newspaper, Mic, Phone, MapPin, Building2 } from 'lucide-react'

const services = [
  {
    name: "CM Aveiro",
    icon: Building2,
    type: "website",
    url: "cm-aveiro.pt",
    color: "from-blue-500/20 to-indigo-500/20",
    position: "left-[2%] top-[1%]",
    delay: 0.2,
    zIndex: 1,
    rotation: "-15deg"
  },
  {
    name: "Serviços Online",
    icon: Globe,
    type: "website",
    url: "servico-online.cm-aveiro.pt",
    color: "from-emerald-500/20 to-teal-500/20",
    position: "left-[2%] top-[60%]",
    delay: 0.3,
    zIndex: 2,
    rotation: "12deg"
  },
  {
    name: "Aveiro Bus",
    icon: Bus,
    type: "website",
    url: "aveirobus.pt",
    color: "from-yellow-500/20 to-amber-500/20",
    position: "left-[35%] top-[1%]",
    delay: 0.4,
    zIndex: 3,
    rotation: "-10deg"
  },
  {
    name: "Notícias Aveiro",
    icon: Newspaper,
    type: "website",
    url: "noticiasdeaveiro.pt",
    color: "from-red-500/20 to-orange-500/20",
    position: "left-[35%] top-[50%]",
    delay: 0.5,
    zIndex: 4,
    rotation: "5deg"
  },
  {
    name: "Aveiro 360",
    icon: Mic,
    type: "podcast",
    color: "from-purple-500/20 to-pink-500/20",
    position: "right-[1%] top-[0.1%]",
    delay: 0.6,
    zIndex: 5,
    rotation: "-20deg"
  },
  {
    name: "App Aveiro",
    icon: Phone,
    type: "app",
    color: "from-sky-500/20 to-blue-500/20",
    position: "right-[15%] top-[38%]",
    delay: 0.7,
    zIndex: 6,
    rotation: "10deg"
  },
  {
    name: "Aveiro Tourism",
    icon: MapPin,
    type: "app",
    color: "from-rose-500/20 to-pink-500/20",
    position: "right-[5%] top-[80%]",
    delay: 0.8,
    zIndex: 7,
    rotation: "-5deg"
  }
]

export function FragmentedServicesSlide() {
  return (
    <div className={cn(
      "w-full max-w-[85vw] aspect-video rounded-2xl overflow-hidden",
      "bg-gradient-to-br from-zinc-900 to-zinc-800 relative"
    )}>
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.015]" />

      <div className="relative h-full flex flex-col px-[8%] py-[6%]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/70 text-center mb-24"
        >
          Serviços fragmentados e desconectados
        </motion.p>

        {/* Scattered Cards Container */}
        <div className="relative flex-1 -mt-12">
          {services.map((service) => (
            <motion.div
              key={service.name}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                rotate: parseInt(service.rotation) 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -5, 0],
                rotate: [
                  parseInt(service.rotation) - 2,
                  parseInt(service.rotation) + 2,
                  parseInt(service.rotation) - 2
                ]
              }}
              transition={{ 
                delay: service.delay,
                y: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
                rotate: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }
              }}
              className={cn(
                "absolute p-4 rounded-xl w-48",
                "bg-gradient-to-br border border-white/5 backdrop-blur-sm",
                "hover:scale-105 transition-transform",
                "shadow-lg shadow-black/5",
                service.color,
                service.position,
                `z-[${service.zIndex}]`
              )}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-white/10">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white">
                    {service.name}
                  </p>
                  {service.url && (
                    <p className="text-xs text-white/60 mt-1">
                      {service.url}
                    </p>
                  )}
                  <p className="text-xs text-white/40 mt-1">
                    {service.type}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Enhanced Disconnected Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
              d="M 100,100 L 300,150 M 350,160 L 500,200"
              className="stroke-white/20"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.2 }}
              d="M 200,300 L 400,250 M 450,240 L 600,300"
              className="stroke-white/20"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.4 }}
              d="M 150,200 L 250,400 M 300,380 L 450,350"
              className="stroke-white/20"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  )
} 