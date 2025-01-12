'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { ArrowRight, Target, AlertTriangle, TrendingUp, FileText } from 'lucide-react'

const contextPoints = [
  {
    title: 'Problema',
    description: 'Os aplicativos atuais de Aveiro não oferecem uma experiência eficiente, intuitiva ou personalizada. A ausência de integração de dados, personalização de conteúdo e recursos de inteligência artificial impacta a experiência do usuário.',
    icon: AlertTriangle,
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    title: 'Objetivo',
    description: 'Desenvolver uma plataforma inovadora que centralize serviços municipais, integre dados em tempo real e ofereça uma experiência personalizada através de inteligência artificial.',
    icon: Target,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Impacto',
    description: 'Melhorar a qualidade de vida dos cidadãos, impulsionar o turismo e o desenvolvimento econômico através de uma cidade mais conectada e inteligente.',
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
              A falta de integração de serviços e dados, aliada à ausência de inovação, 
              limita o potencial econômico e freia o crescimento do turismo e dos negócios locais.
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