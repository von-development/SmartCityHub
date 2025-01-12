'use client'

import { motion } from 'framer-motion'
import { ArrowRight, LayoutDashboard, ListTree, UserCircle, Calendar, Map, Search, MessageSquareMore, Info, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui'

const features = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    description: 'Acesso rápido a categorias, serviços personalizados, destaques e mais acessados'
  },
  {
    icon: ListTree,
    title: 'Categorias',
    description: 'Navegação por categorias com serviços organizados e expansíveis'
  },
  {
    icon: UserCircle,
    title: 'Serviços Personalizados',
    description: 'Conteúdo adaptado ao perfil e preferências do usuário'
  },
  {
    icon: Calendar,
    title: 'Agenda de Eventos',
    description: 'Visualização de eventos por categoria com acesso aos detalhes'
  },
  {
    icon: Info,
    title: 'Detalhes de Eventos',
    description: 'Informações completas com mapas, rotas e links externos'
  },
  {
    icon: Search,
    title: 'Busca',
    description: 'Pesquisa por texto, voz e suporte via chat com especialistas'
  },
  {
    icon: Map,
    title: 'Mapa Interativo',
    description: 'Visualização de serviços e eventos com filtros e localizações'
  },
  {
    icon: MessageSquareMore,
    title: 'Detalhes de Serviços',
    description: 'Informações específicas com integrações externas'
  },
  {
    icon: Sparkles,
    title: 'IA Generativa (LLMs)',
    description: 'Suporte inteligente para serviços, eventos, recomendações e investimentos'
  }
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.015]" />

      {/* Content */}
      <div className="relative max-w-[1800px] mx-auto px-8">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-col items-center gap-12"
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10"
              >
                <span className="text-sm font-medium text-primary">Aveiro Smart City Hub</span>
                <ArrowRight className="h-4 w-4 text-primary" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold tracking-tight"
              >
                O Município Mais Perto de Você
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Uma plataforma inovadora que conecta cidadãos, turistas e serviços 
                municipais em uma única interface inteligente e intuitiva.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                O SmartCity Hub já conta com uma interface intuitiva, inclusiva e eficiente, 
                integrada aos agentes de IA. O MVP foi projetado para oferecer:
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-4"
              >
                <a 
                  href="/home"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span className="font-medium">Conhecer Versão Demo</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a 
                  href="#features"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span className="font-medium text-zinc-900">Saber Mais</span>
                  <ArrowRight className="h-4 w-4 text-zinc-900 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-blue-500 to-indigo-500',
                'from-indigo-500 to-purple-500',
                'from-purple-500 to-pink-500',
                'from-pink-500 to-rose-500',
                'from-rose-500 to-orange-500',
                'from-orange-500 to-amber-500',
                'from-amber-500 to-yellow-500',
                'from-teal-500 to-emerald-500',
                'from-emerald-500 to-green-500'
              ]

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="group"
                >
                  <Card className="group relative h-full overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative p-6">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-xl bg-white/10 text-primary group-hover:text-white transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm md:text-base mb-1 group-hover:text-white transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-xs text-muted-foreground group-hover:text-white/90 transition-colors line-clamp-2">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}