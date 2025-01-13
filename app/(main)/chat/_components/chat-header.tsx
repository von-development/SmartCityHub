'use client'


import { agents } from '@/lib/agents'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface ChatHeaderProps {
  agentId: string
}

export function ChatHeader({ agentId }: ChatHeaderProps) {
  const agent = agents.find(a => a.id === agentId)
  if (!agent) return null

  return (
    <div className="border-b p-4">
      <div className="flex items-center gap-4">
        <Link 
          href="/chat"
          className="p-2 rounded-lg hover:bg-zinc-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Avatar className="h-12 w-12 ring-2 ring-primary/10">
          <AvatarImage src={agent.avatar} alt={agent.name} />
          <AvatarFallback>{agent.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{agent.name}</h2>
          <p className="text-sm text-muted-foreground">{agent.description}</p>
        </div>
      </div>
    </div>
  )
} 