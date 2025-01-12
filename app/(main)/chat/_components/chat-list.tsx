'use client'

import { agents } from '@/lib/agents'
import { Card } from '@/components/ui'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function ChatList() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            Assistentes Virtuais
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Escolha um assistente para começar uma conversa
          </p>
        </div>

        <div className="grid gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex gap-6">
                  <Avatar className="h-20 w-20 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback>{agent.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold">{agent.name}</h2>
                      <p className="text-sm text-muted-foreground font-medium">
                        {agent.role}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getAgentIntroduction(agent.id)}
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((capability, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary"
                            className={`${getTagColor(agent.category)} text-xs font-medium`}
                          >
                            {capability}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/chat/${agent.id}`}>
                        <Button 
                          className="w-full sm:w-auto gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Iniciar conversa
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getTagColor(category: string): string {
  switch (category) {
    case 'services':
      return 'bg-blue-100 text-blue-800'
    case 'health':
      return 'bg-rose-100 text-rose-800'
    case 'tourism':
      return 'bg-amber-100 text-amber-800'
    case 'jobs':
      return 'bg-purple-100 text-purple-800'
    case 'urban':
      return 'bg-emerald-100 text-emerald-800'
    case 'education':
      return 'bg-cyan-100 text-cyan-800'
    case 'startup':
      return 'bg-violet-100 text-violet-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getAgentIntroduction(agentId: string): string {
  switch (agentId) {
    case 'ana':
      return 'Oi! Eu sou a Ana, posso te ajudar com informações sobre serviços municipais, documentos, processos e eventos da cidade. Se precisar saber sobre prazos, documentação ou o que está acontecendo em Aveiro, é só me perguntar!'

    case 'carla':
      return 'Olá! Sou a Carla, sua personal trainer virtual. Posso te ajudar com treinos personalizados, dicas de nutrição e sugestões para manter um estilo de vida saudável aqui em Aveiro!'

    case 'joao':
      return 'Oi! Eu sou o João, seu guia turístico virtual. Conheço todos os pontos turísticos, restaurantes e histórias de Aveiro. Quer descobrir lugares incríveis ou saber onde comer os melhores pratos da região?'

    case 'carlos':
      return 'Olá! Sou o Carlos, especialista em oportunidades profissionais. Posso te ajudar a encontrar vagas de emprego, cursos de capacitação e dar dicas para desenvolver sua carreira em Aveiro!'

    case 'miguel':
      return 'Oi! Eu sou o Miguel, especialista em licenciamento. Se você precisa de ajuda com licenças para obras, abertura de negócios ou qualquer processo urbanístico em Aveiro, pode contar comigo!'

    case 'julia':
      return 'Olá! Sou a Julia, e adoro ajudar pessoas a aprender! Posso te indicar cursos gratuitos, plataformas de ensino e oportunidades de desenvolvimento pessoal e profissional em Aveiro!'

    case 'lucas':
      return 'Oi! Eu sou o Lucas, consultor de startups e inovação. Se você tem uma ideia de negócio, precisa de mentoria ou quer conhecer o ecossistema de inovação de Aveiro, vamos conversar!'

    default:
      return ''
  }
} 