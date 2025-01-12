export interface Agent {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: 'services' | 'tourism' | 'mobility' | 'support'
  capabilities: string[]
  systemPrompt: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface AgentConversation {
  id: string
  agentId: string
  messages: Message[]
  createdAt: number
  updatedAt: number
} 