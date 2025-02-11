'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { 
  Sparkles, Clock, Bot, Layout, 
  Map, Newspaper, Cloud, Bell,
  Building, Calendar, Users, Rocket,
  LayoutDashboard, Folders, UserCircle, 
  MapPin
} from 'lucide-react'

const features = [
  {
    title: "Realtime Data",
    icon: Clock,
    items: ["Traffic", "News", "Weather", "Alerts"],
    color: "from-blue-500/20 to-indigo-500/20",
    delay: 0.4
  },
  {
    title: "AI Integration",
    icon: Bot,
    items: ["Specialized Agents", "Service Guide", "Smart Recommendations"],
    color: "from-purple-500/20 to-pink-500/20",
    delay: 0.5
  },
  {
    title: "City Services",
    icon: Building,
    items: ["Events", "Tourism", "Innovation Hub", "Startups"],
    color: "from-emerald-500/20 to-teal-500/20",
    delay: 0.6
  },
  {
    title: "User Experience",
    icon: Layout,
    items: ["Dashboard", "Service Categories", "Persona Services", "Maps"],
    color: "from-amber-500/20 to-orange-500/20",
    delay: 0.7
  }
]

export function AveiroConnectSlide() {
  return (
    <div className={cn(
      "w-full max-w-[85vw] aspect-video rounded-2xl overflow-hidden",
      "bg-white relative"
    )}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.03]" />
      
      {/* Edge Gradients */}
      <div className="absolute inset-0">
        {/* Top gradient */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-zinc-900/10 to-transparent" />
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-900/10 to-transparent" />
        
        {/* Left gradient */}
        <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-zinc-900/10 to-transparent" />
        
        {/* Right gradient */}
        <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-zinc-900/10 to-transparent" />
      </div>

      {/* 3D Floating Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-gradient-to-br from-blue-500/10 to-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-gradient-to-tr from-purple-500/10 to-blue-500/5 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative h-full flex flex-col px-[10%] py-[4%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 0 20px rgba(0,0,0,0.2)",
                "0 0 0px rgba(0,0,0,0)"
              ]
            }}
            transition={{ 
              delay: 0.2,
              textShadow: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }
            }}
            className={cn(
              "text-5xl font-bold tracking-tight",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900",
              "relative",
              "after:absolute after:inset-0",
              "after:bg-gradient-to-r after:from-zinc-900/0 after:via-zinc-700/20 after:to-zinc-900/0",
              "after:animate-pulse after:blur-xl"
            )}
          >
            ConnectAveiro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-zinc-600 mx-auto"
          >
            A cidade mais conectada com você
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent mt-8"
          />
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-4 gap-6 mt-8 relative z-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: feature.delay,
                duration: 0.5
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className={cn(
                "p-6 rounded-xl bg-gradient-to-br border border-black/5",
                "transition-all duration-300",
                "shadow-lg shadow-black/5 backdrop-blur-sm",
                "relative overflow-hidden",
                feature.color
              )}
            >
              <div className="relative flex flex-col gap-4 z-20">
                <div className={cn(
                  "p-3 rounded-lg w-fit",
                  "bg-gradient-to-br from-white/30 to-white/10",
                  "ring-1 ring-black/5 shadow-inner"
                )}>
                  <feature.icon className="h-6 w-6 text-black/60" />
                </div>
                <h3 className="text-lg font-semibold text-black/80 tracking-tight">
                  {feature.title}
                </h3>
                <ul className="space-y-2.5">
                  {feature.items.map((item) => (
                    <li key={item} className="text-sm text-black/60 flex items-center gap-2.5">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        "bg-gradient-to-r from-black/40 to-black/30",
                        "ring-1 ring-black/5"
                      )} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ x: '-100%', skewX: '-20deg' }}
                animate={{ 
                  x: ['100%', '-100%'],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-[200%] z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{
                  top: 0,
                  bottom: 0,
                  left: '-50%',
                  transform: 'translateX(-100%) skewX(-20deg)'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Badge moved to bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }} // Increased delay to show after cards
          className="flex justify-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 shadow-sm">
            <Sparkles className="h-4 w-4 text-black/60" />
            <span className="text-sm font-medium text-black/60">A Smart City Platform</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles - Updated z-index */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{ 
              opacity: [0, 0.5, 0],
              x: Math.random() * (window.innerWidth + 100),
              y: Math.random() * (window.innerHeight + 100)
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1.5 h-1.5 bg-black/10 rounded-full"
          />
        ))}
      </div>
    </div>
  )
} 