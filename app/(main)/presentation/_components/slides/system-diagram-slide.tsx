'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { 
  Globe, Database, Cloud, Bot, Map, Sun, 
  Laptop, Server, GitBranch, MessageSquare
} from 'lucide-react'

export function SystemDiagramSlide() {
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
          Sistema Architecture
        </motion.h2>

        <div className="relative flex-1 flex items-center">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Client to Frontend - Straight line */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1, delay: 0.5 }}
              d="M 150,300 L 300,300"
              className="stroke-white"
              strokeWidth="2"
              fill="none"
            />
            
            {/* Frontend to Backend - Straight line */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1, delay: 0.7 }}
              d="M 400,300 L 550,300"
              className="stroke-white"
              strokeWidth="2"
              fill="none"
            />

            {/* Backend to Services - Curved lines using cubic Bezier */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1, delay: 0.9 }}
              d="M 650,300 Q 700,300 750,200"
              className="stroke-white"
              strokeWidth="2"
              fill="none"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1, delay: 1.1 }}
              d="M 650,300 Q 700,300 750,300"
              className="stroke-white"
              strokeWidth="2"
              fill="none"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1, delay: 1.3 }}
              d="M 650,300 Q 700,300 750,400"
              className="stroke-white"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Components - Update positioning */}
          <div className="relative w-full h-full flex items-center">
            {/* Client */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-[10%]"
            >
              <ComponentBox
                icon={Laptop}
                label="Client"
                color="from-zinc-500 to-zinc-600"
              />
            </motion.div>

            {/* Frontend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute left-[30%]"
            >
              <ComponentBox
                icon={Globe}
                label="Frontend"
                color="from-blue-500 to-indigo-500"
                description="Next.js"
              />
            </motion.div>

            {/* Backend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute left-[50%]"
            >
              <ComponentBox
                icon={Server}
                label="Backend Services"
                color="from-emerald-500 to-teal-500"
                description="API Routes"
              />
            </motion.div>

            {/* Services Column - Adjust spacing */}
            <div className="absolute right-[5%] h-full flex flex-col justify-center gap-16">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ComponentBox
                  icon={Database}
                  label="Database"
                  color="from-green-500 to-emerald-500"
                  description="Supabase"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <ComponentBox
                  icon={Bot}
                  label="AI Services"
                  color="from-purple-500 to-pink-500"
                  description="OpenAI & Eleven Labs"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <ComponentBox
                  icon={Globe}
                  label="External APIs"
                  color="from-blue-600 to-indigo-600"
                  description="Maps & Weather"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentBox({ 
  icon: Icon, 
  label, 
  color, 
  description,
  vertical = false 
}: { 
  icon: any
  label: string
  color: string
  description?: string
  vertical?: boolean
}) {
  return (
    <div className={cn(
      "rounded-xl bg-gradient-to-br p-4",
      color
    )}>
      <div className={cn(
        "flex items-center gap-3",
        vertical && "flex-col text-center"
      )}>
        <div className="p-3 rounded-lg bg-white/10">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className={cn(
          "flex flex-col",
          vertical && "items-center"
        )}>
          <span className="text-sm font-medium text-white">
            {label}
          </span>
          {description && (
            <span className="text-xs text-white/60">
              {description}
            </span>
          )}
        </div>
      </div>
    </div>
  )
} 