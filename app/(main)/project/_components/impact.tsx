'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { TrendingUp, Building2, Users, Rocket, ChartBar, ArrowRight } from 'lucide-react'

const impactPoints = [
  {
    title: 'Estímulo à Economia',
    description: 'Pequenos empreendedores e o comércio local ganham mais visibilidade através de recomendações inteligentes e integração com serviços',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Turismo Fortalecido',
    description: 'Turistas têm acesso a informações personalizadas, rotas otimizadas e maior engajamento com atrações locais e eventos culturais',
    icon: Building2,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Inclusão Social',
    description: 'Plataforma acessível e adaptada às necessidades de pessoas com deficiência, idosos e cidadãos de diversos perfis',
    icon: Users,
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    title: 'Eficiência Governamental',
    description: 'Automatização de processos, redução de custos operacionais e gestão pública mais transparente e eficaz',
    icon: ChartBar,
    gradient: 'from-orange-500 to-red-500'
  }
]

export function Impact() {
  return (
    <section className="w-full py-24 bg-zinc-50">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm hover:bg-primary/20 transition-colors">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Impacto</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Benefícios para a Cidade
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O impacto do ConnectAveiro transcende a tecnologia, refletindo-se 
              diretamente no cotidiano da cidade
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {impactPoints.map((point, index) => {
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