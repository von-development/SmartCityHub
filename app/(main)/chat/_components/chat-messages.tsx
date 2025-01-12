'use client'

import { useAgentStore } from '@/stores/use-agent-store'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { Markdown } from '@/components/markdown'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { agents } from '@/lib/agents'
import { Loader2 } from 'lucide-react'

export function ChatMessages() {
  const { messages, currentAgent, isLoading } = useAgentStore()
  const agent = agents.find(a => a.id === currentAgent)

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-start gap-3 ${
            message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          {message.role === 'assistant' ? (
            <Avatar className="h-10 w-10 ring-2 ring-primary/10">
              <AvatarImage 
                src={agent?.avatar} 
                alt={agent?.name || 'AI Assistant'} 
              />
              <AvatarFallback>{agent?.name?.[0] || 'AI'}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="p-2 rounded-lg bg-black">
              <User className="h-5 w-5 text-white" />
            </div>
          )}
          <div className={`flex-1 p-4 rounded-2xl ${
            message.role === 'assistant' 
              ? 'bg-zinc-50 prose prose-zinc max-w-none' 
              : 'bg-black text-white'
          }`}>
            {message.role === 'assistant' ? (
              <Markdown>{message.content}</Markdown>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            )}
          </div>
        </motion.div>
      ))}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-start gap-3"
        >
          <Avatar className="h-10 w-10 ring-2 ring-primary/10">
            <AvatarImage 
              src={agent?.avatar} 
              alt={agent?.name || 'AI Assistant'} 
            />
            <AvatarFallback>{agent?.name?.[0] || 'AI'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 p-4 rounded-2xl bg-zinc-50">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">
                Gerando resposta...
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
} 