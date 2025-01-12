import type { AgentExecutor } from 'langchain/agents'
import type { LucideIcon } from 'lucide-react'

export interface Agent {
  id: string
  name: string
  description: string
  icon: LucideIcon
  avatar: string
  category: 
    | 'services' 
    | 'tourism' 
    | 'mobility' 
    | 'support'
    | 'health'
    | 'jobs'
    | 'urban'
    | 'education'
    | 'startup'
  capabilities: string[]
  systemPrompt: string
  executor: AgentExecutor
  gradient: string
  role: string
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