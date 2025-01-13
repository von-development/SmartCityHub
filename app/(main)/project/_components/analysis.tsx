'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Globe, Bus, Building2, Smartphone, MapPin, AlertCircle, CheckCircle } from 'lucide-react'

interface Platform {
  name: string
  url: string
  icon: React.ElementType
  type: string
  description: string
  positives: string[]
  limitations: string[]
}

const platforms: Platform[] = [
  {
    name: 'Aveiro Bus',
    url: 'aveirobus.pt',
    icon: Bus,
    type: 'Website',
    description: 'Informações sobre horários e rotas do transporte público municipal',
    positives: [
      'Informações básicas sobre rotas e horários',
      'Interface simples e direta',
      'Acesso gratuito às informações',
      'Mapa das linhas disponível'
    ],
    limitations: [
      'Ausência de dados em tempo real',
      'Sem integração com outros meios de transporte',
      'Falta de notificações sobre alterações de horários',
      'Interface desatualizada e pouco responsiva',
      'Sem funcionalidade de planejamento de rotas'
    ]
  },
  {
    name: 'Câmara Municipal',
    url: 'cm-aveiro.pt',
    icon: Building2,
    type: 'Website',
    description: 'Centro de informações offline, eventos, notícias e serviços municipais presenciais',
    positives: [
      'Centralização de informações institucionais',
      'Acesso a documentos oficiais',
      'Divulgação de eventos e notícias',
      'Transparência administrativa'
    ],
    limitations: [
      'Navegação complexa e pouco intuitiva',
      'Informações dispersas em diferentes seções',
      'Ausência de sistema de busca eficiente',
      'Conteúdo nem sempre atualizado',
      'Falta de integração com serviços online'
    ]
  },
  {
    name: 'Portal Municipal',
    url: 'servicosonline.cm-aveiro.pt',
    icon: Globe,
    type: 'Website',
    description: 'Portal oficial com serviços administrativos online e processos digitais',
    positives: [
      'Disponibilidade de serviços administrativos online',
      'Acesso a processos digitais',
      'Sistema de autenticação seguro',
      'Redução da necessidade de deslocamento físico'
    ],
    limitations: [
      'Processos burocráticos ainda complexos',
      'Interface pouco amigável',
      'Falta de orientação clara sobre documentos necessários',
      'Ausência de acompanhamento em tempo real dos processos',
      'Limitada integração com outros sistemas municipais'
    ]
  },
  {
    name: 'Aveiro APP',
    url: 'app.cm-aveiro.pt',
    icon: Smartphone,
    type: 'Mobile App',
    description: 'Versão mobile do portal municipal com notícias, agenda e serviços',
    positives: [
      'Acesso móvel aos serviços municipais',
      'Notificações de alertas e eventos',
      'Disponibilidade offline de algumas informações'
    ],
    limitations: [
      'Menu extenso e pouco organizado',
      'Falta de personalização por perfil de usuário',
      'Performance inconsistente',
      'Ausência de recursos interativos'
    ]
  },
  {
    name: 'Aveiro Tourism',
    url: 'tourism.aveiro.pt',
    icon: MapPin,
    type: 'Mobile App',
    description: 'Guia turístico com pontos de interesse e eventos da cidade',
    positives: [
      'Informações turísticas centralizadas',
      'Guia de pontos de interesse',
      'Suporte a múltiplos idiomas',
      'Fotos e descrições dos locais'
    ],
    limitations: [
      'Conteúdo estático e raramente atualizado',
      'Sem integração com transporte público',
      'Ausência de recomendações personalizadas',
      'Sem integração com serviços de reserva ou compra'
    ]
  }
]

export function Analysis() {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500">
              Análise das Plataformas Existentes
            </span>
          </motion.h2>
        </div>

        <div className="space-y-8">
          {platforms.map((platform, index) => {
            const Icon = platform.icon
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="p-4 sm:p-8 flex flex-col lg:flex-row gap-4 sm:gap-8 bg-white shadow-xl rounded-3xl border-primary/5 hover:border-primary/20 transition-all hover:shadow-2xl">
                  <div className="flex-shrink-0 space-y-4 lg:w-72">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground px-3 py-1.5 rounded-full border bg-white">
                        {platform.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {platform.name}
                      </h3>
                      <a 
                        href={`https://${platform.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        {platform.url}
                      </a>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    <div className="bg-emerald-50/50 rounded-2xl p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-4 text-emerald-600">
                        <div className="p-1.5 rounded-full bg-emerald-600/10">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-medium">Pontos Positivos</h4>
                      </div>
                      <ul className="space-y-2.5">
                        {platform.positives.map((positive) => (
                          <li key={positive} className="text-sm text-muted-foreground flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50 mt-1.5 flex-shrink-0" />
                            {positive}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50/50 rounded-2xl p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-4 text-red-500">
                        <div className="p-1.5 rounded-full bg-red-500/10">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm font-medium">Limitações</h4>
                      </div>
                      <ul className="space-y-2.5">
                        {platform.limitations.map((limitation) => (
                          <li key={limitation} className="text-sm text-muted-foreground flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500/50 mt-1.5 flex-shrink-0" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
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