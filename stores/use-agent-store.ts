import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import type { Message } from '@/types/agent'
import { generateResponse } from '@/lib/agents/chat'
import { agents } from '@/lib/agents'

interface AgentStore {
  currentAgent: string | null
  messages: Message[]
  isLoading: boolean
  setCurrentAgent: (id: string) => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  currentAgent: null,
  messages: [],
  isLoading: false,

  setCurrentAgent: (id) => {
    const agent = agents.find(a => a.id === id)
    if (!agent) return

    // Add welcome message when setting a new agent
    const welcomeMessage: Message = {
      id: uuid(),
      role: 'assistant',
      content: getWelcomeMessage(id),
      timestamp: Date.now()
    }

    set({ 
      currentAgent: id, 
      messages: [welcomeMessage] 
    })
  },

  sendMessage: async (content) => {
    const { currentAgent, messages } = get()
    if (!currentAgent) return

    // Add user message
    const userMessage: Message = {
      id: uuid(),
      role: 'user',
      content,
      timestamp: Date.now()
    }

    set({ 
      messages: [...messages, userMessage],
      isLoading: true 
    })

    try {
      // Generate response
      const response = await generateResponse(
        [...messages, userMessage],
        currentAgent
      )

      // Add assistant message
      const assistantMessage: Message = {
        id: uuid(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }

      set({ 
        messages: [...get().messages, assistantMessage],
        isLoading: false
      })
    } catch (error) {
      console.error('Error sending message:', error)
      set({ isLoading: false })
    }
  },

  clearMessages: () => {
    set({ messages: [] })
  }
}))

function getWelcomeMessage(agentId: string): string {
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
      return 'Olá! Como posso ajudar você hoje?'
  }
} 