import { create } from 'zustand'
import type { Agent, Message, AgentConversation } from '@/types/agent'
import { agents } from '@/lib/agents'
import { generateResponse } from '@/lib/agents/chat'

interface AgentStore {
  agents: Agent[]
  currentAgent: Agent | null
  conversations: AgentConversation[]
  messages: Message[]
  isLoading: boolean
  setCurrentAgent: (agentId: string) => void
  sendMessage: (content: string) => Promise<void>
  clearConversation: () => void
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents,
  currentAgent: null,
  conversations: [],
  messages: [],
  isLoading: false,

  setCurrentAgent: (agentId) => {
    const agent = agents.find(a => a.id === agentId)
    set({ currentAgent: agent, messages: [] })
  },

  sendMessage: async (content) => {
    const { currentAgent, messages } = get()
    if (!currentAgent) return

    set({ isLoading: true })

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    }

    set({ messages: [...messages, userMessage] })

    try {
      const response = await generateResponse(
        [...messages, userMessage],
        currentAgent.systemPrompt
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }

      set({ messages: [...get().messages, assistantMessage] })
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  clearConversation: () => {
    set({ messages: [] })
  }
})) 