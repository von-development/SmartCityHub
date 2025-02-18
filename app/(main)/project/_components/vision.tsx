'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Lightbulb, Target, Sparkles, Users, ArrowRight } from 'lucide-react'

const visionPoints = [
  {
    title: 'Integração Completa',
    description: 'Centraliza serviços públicos, informações de mobilidade urbana, eventos culturais e turismo em uma única plataforma',
    icon: Target,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Acessibilidade',
    description: 'A plataforma é adaptada para diferentes perfis de usuários, incluindo jovens, idosos, turistas, PCDs e empreendedores',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Gestão Eficiente',
    description: 'Automatiza processos burocráticos, melhora a coleta de dados e apoia a tomada de decisões estratégicas com base em dados em tempo real',
    icon: Sparkles,
    gradient: 'from-orange-500 to-amber-500'
  }
]

export function Vision() {
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
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nossa Visão</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Como o ConnectAveiro Transforma Aveiro?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Uma revolução na forma como cidadãos, turistas, empreendedores e gestores 
              públicos interagem com a cidade
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visionPoints.map((point, index) => {
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