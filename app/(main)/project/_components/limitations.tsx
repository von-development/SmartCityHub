'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'

const limitations = [
  {
    title: 'Interface Pouco Acessível e Não Intuitiva (UI/UX)',
    items: [
      'Os aplicativos não oferecem uma experiência de navegação fluida, tornando o uso frustrante',
      'Falta de design responsivo e interativo, especialmente em comparação com padrões modernos de aplicativos',
      'Elementos gráficos confusos, menus desorganizados e funcionalidades ocultas'
    ]
  },
  {
    title: 'Sistema de Transporte Limitado',
    items: [
      'Informações sobre transporte público são limitadas a linhas fixas, sem atualização em tempo real sobre localização de veículos ou atrasos',
      'Ausência de integração com outras opções de mobilidade (bicicletas, estacionamento, trânsito)'
    ]
  },
  {
    title: 'Funcionalidades Incompletas ou Ineficientes',
    items: [
      'Muitos recursos disponíveis nos aplicativos são superficiais ou não funcionam corretamente',
      'Falta de integração com calendários de eventos, mapas interativos ou informações atualizadas',
      'Problemas técnicos recorrentes, como lentidão, falhas de carregamento e bugs'
    ]
  },
  {
    title: 'Falta de Personalização',
    items: [
      'Os aplicativos não adaptam suas recomendações ou funcionalidades com base no perfil do usuário (cidadão, turista, idoso, estudante)',
      'A ausência de conteúdo personalizado impede que os usuários desenvolvam o sentimento de que estão usando um serviço feito para suas necessidades'
    ]
  },
  {
    title: 'Dificuldade em Encontrar Serviços e Processos',
    items: [
      'Falta de uma organização clara de serviços públicos e dos passos necessários para acessar processos administrativos',
      'Não há um guia integrado que oriente sobre documentos necessários, prazos ou locais de atendimento',
      'O acesso à informação é fragmentado e desmotivador'
    ]
  }
]

export function Limitations() {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1800px] mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold tracking-tight flex items-center gap-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm hover:bg-primary/20 transition-colors">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Limitações</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500">
            Principais Limitações
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-8">
          {limitations.map((limitation, index) => (
            <motion.div
              key={limitation.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-amber-500 transition-colors mb-6">
                  {limitation.title}
                </h3>
                <ul className="space-y-4">
                  {limitation.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="h-2 w-2 rounded-full bg-amber-500/50 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 