'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { ArrowRight, Target, AlertTriangle, TrendingUp, FileText } from 'lucide-react'

const contextPoints = [
  {
    title: 'Problema',
    description: 'A fragmentação dos serviços digitais em Aveiro dificulta o acesso dos cidadãos aos recursos municipais. A falta de uma plataforma centralizada e intuitiva resulta em processos burocráticos lentos, informações desatualizadas e uma experiência frustrante para moradores e visitantes.',
    icon: AlertTriangle,
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    title: 'Objetivo',
    description: 'Criar uma plataforma unificada que simplifique a interação com serviços municipais através de assistentes virtuais especializados, mapas interativos e um sistema inteligente de recomendações. Nosso foco é tornar Aveiro mais acessível e eficiente para todos.',
    icon: Target,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Impacto',
    description: 'Transformar a experiência digital dos cidadãos, reduzindo tempo em processos burocráticos, facilitando o acesso à informação e promovendo maior engajamento com a cidade. A plataforma também impulsiona o turismo e desenvolvimento local através de recomendações personalizadas.',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-500'
  }
]

export function Context() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm hover:bg-primary/20 transition-colors">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Contexto</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Entendendo o Cenário
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aveiro busca se tornar uma cidade mais inteligente e conectada, mas enfrenta desafios 
              na integração digital de seus serviços e na experiência oferecida aos cidadãos.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contextPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${point.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-white/10 transition-colors">
                        <Icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-semibold text-lg group-hover:text-white transition-colors">
                        {point.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors">
                      {point.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 