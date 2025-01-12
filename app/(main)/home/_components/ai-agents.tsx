'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { MessageSquare } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const agents = [
  {
    name: 'Ana',
    role: 'Serviços Públicos e Eventos',
    description: 'Você pode me perguntar como solicitar a troca de uma lâmpada queimada, o que vai rolar no final de semana ou como renovar o cadÚnico. Também posso te ajudar a encontrar informações sobre os horários de funcionamento dos serviços municipais.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ana&backgroundColor=ffdfbf',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Carla',
    role: 'Preparação Física e Dieta',
    description: 'Me diga sua condição física e seu objetivo, que vou preparar treinos personalizados para você. Também posso indicar vídeos e receitas saudáveis. Vamos conversar?',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Carla&backgroundColor=ffd5dc',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    name: 'João',
    role: 'Guia Turístico',
    description: 'Quer saber o que fazer em Aveiro, onde comer e conhecer suas histórias fantásticas? Fala comigo que vou criar rotas incríveis para você. Fui treinado com informações do Visit Aveiro e do Tripadvisor.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Joao&backgroundColor=ffecd1',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Carlos',
    role: 'Oportunidades de Trabalho',
    description: 'Quer saber mais sobre oportunidades de emprego, cursos e dicas profissionais? Estou aqui para te ajudar a evoluir na sua carreira. Vamos começar?',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Carlos&backgroundColor=e6e6ff',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    name: 'Miguel',
    role: 'Licenciamento Urbanístico',
    description: 'Quer começar um negócio ou licenciar uma obra? Eu posso te ajudar a conseguir as licenças necessárias. Também posso tirar suas dúvidas sobre os diversos licenciamentos municipais.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Miguel&backgroundColor=d1ffe6',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    name: 'Julia',
    role: 'Capacitação',
    description: 'Querendo aprender algo? Aqui encontro para você cursos gratuitos das melhores plataformas de aprendizado do país.',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Julia&backgroundColor=e6f7ff',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Lucas',
    role: 'Startups',
    description: 'Quer ter um consultor para sua startup, a fim de progredi-la e alcançar seus sonhos?',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lucas&backgroundColor=f3e6ff',
    gradient: 'from-violet-500 to-purple-500'
  }
]

export function AIAgents() {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">Assistentes Virtuais</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nossa equipe de agentes inteligentes está pronta para ajudar você 24/7 
              com informações personalizadas e suporte dedicado
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="relative overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                <div className="relative p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                      <AvatarImage src={agent.avatar} alt={agent.name} />
                      <AvatarFallback>{agent.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-white transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors">
                        {agent.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors">
                    {agent.description}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-sm text-primary group-hover:text-white transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>Iniciar conversa</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 