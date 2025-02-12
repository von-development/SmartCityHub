'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [particles, setParticles] = useState<Array<{ x: number, y: number }>>([])

  useEffect(() => {
    // Initialize particles only after component mounts (client-side)
    const particlesArray = [...Array(20)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }))
    setParticles(particlesArray)
  }, [])

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-24 pt-safe-top overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.015]" />
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-4 -right-4 w-96 h-96 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute -bottom-4 -left-4 w-96 h-96 bg-gradient-to-tr from-blue-500/30 to-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative text-center space-y-6 md:space-y-12 mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 pt-4 md:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">ConnectAveiro</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900">
            O Município Mais Conectado com Você
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto px-4">
            Bem-vindo à plataforma digital de Aveiro, conectando cidadãos aos serviços municipais 
            e iniciativas inteligentes da cidade.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <Link 
            href="/home"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span className="font-medium">Demo Version</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link 
            href="/presentation"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <FileText className="h-4 w-4 text-zinc-900" />
            <span className="font-medium text-zinc-900">See presentation</span>
            <ArrowRight className="h-4 w-4 text-zinc-900 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Floating 3D Objects */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                x: particle.x,
                y: particle.y
              }}
              animate={{ 
                opacity: [0, 1, 0],
                x: Math.random() * (particle.x + 200),
                y: Math.random() * (particle.y + 200)
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
            />
          ))}
        </div>
      </div>
    </main>
  )
}
