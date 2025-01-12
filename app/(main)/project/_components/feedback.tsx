'use client'

import { motion } from 'framer-motion'
import { MessageSquareWarning, MessageSquare, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

const feedbacks = [
  {
    title: 'Feedbacks sobre a Interface',
    description: 'Design pouco intuitivo e problemas para encontrar seções específicas.'
  },
  {
    title: 'Funcionalidades Limitadas',
    description: 'Comentários sobre recursos prometidos que não funcionam ou estão incompletos.'
  },
  {
    title: 'Problemas Técnicos',
    description: 'Travamentos frequentes, lentidão, erros e compatibilidade defasada com dispositivos mais recentes.'
  }
]

const versions = [
  {
    version: '2.0',
    time: '1 ano',
    description: 'Correções e melhoramentos de interface'
  },
  {
    version: '1.1',
    time: '3 anos',
    description: 'Melhoramentos de interface.'
  },
  {
    version: '1.0.1',
    time: '5 anos',
    description: 'Apresentação das notificações recebidas.'
  },
  {
    version: '1.0.0',
    time: '6 anos',
    description: ''
  }
]

export function Feedback() {
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
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Feedback</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500">
            Feedbacks Negativos e Avaliações
          </span>
        </motion.h2>

        <div className="space-y-16">
          {/* Introduction text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground leading-relaxed max-w-4xl"
          >
            Os comentários dos usuários nas lojas de aplicativos (Google Play Store e Apple App Store) 
            evidenciam exatamente as limitações descritas. Há reclamações quanto à dificuldade de navegação, 
            falta de atualizações, travamentos constantes e recursos que não funcionam corretamente.
          </motion.p>

          {/* Image and Version History side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl"
                >
                  <Image
                    src="/img/classificacao.png"
                    alt="Avaliações do aplicativo"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </div>
            </div>

            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200" />

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-zinc-900 shadow-lg">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Histórico de Versões
                  </h3>
                  <div className="space-y-6">
                    {versions.map((version, index) => (
                      <motion.div
                        key={version.version}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-6 group"
                      >
                        <div className="flex-shrink-0 w-32">
                          <span className="text-lg font-semibold text-white">
                            {version.version}
                          </span>
                          <p className="text-sm text-zinc-400">
                            {version.time}
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-zinc-300">
                            {version.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-muted-foreground leading-relaxed">
                  A baixa frequência de novas versões (apenas 4 em 6 anos) demonstra o pouco compromisso 
                  com melhorias contínuas. Isso agrava problemas de compatibilidade e deixa funcionalidades 
                  obsoletas ou sem correção de bugs, dificultando ainda mais a experiência do usuário.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Feedback Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={feedback.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all h-full">
                  <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-orange-500 transition-colors mb-4">
                    {feedback.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feedback.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Final Conclusion */}
          <div className="max-w-4xl space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight flex items-center gap-4"
            >
              <div className="p-2 rounded-xl bg-orange-500/10">
                <MessageSquareWarning className="h-6 w-6 text-orange-500" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500">
                Conclusão
              </span>
            </motion.h3>

            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                A falta de integração de serviços e dados, aliada à ausência de inovação, 
                limita o potencial econômico, reduz a competitividade e freia o crescimento 
                do turismo e dos negócios locais.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Os aplicativos atuais de Aveiro não oferecem uma experiência eficiente, 
                intuitiva ou personalizada. A ausência de integração de dados, personalização 
                de conteúdo e recursos de inteligência artificial impacta a experiência do 
                usuário e o desenvolvimento da cidade.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                Esse cenário reforça a necessidade de uma solução inovadora que centralize 
                serviços, integre informações em tempo real e proporcione uma experiência 
                acessível e personalizada.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg font-medium text-orange-500"
              >
                O SmartCity Hub surge como a solução ideal para impulsionar Aveiro rumo a 
                uma cidade mais inteligente e conectada.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 