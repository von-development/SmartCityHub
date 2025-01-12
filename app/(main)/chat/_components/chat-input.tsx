'use client'

import { useState } from 'react'
import { useAgentStore } from '@/stores/use-agent-store'
import { SendHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export function ChatInput() {
  const [input, setInput] = useState('')
  const { sendMessage, isLoading } = useAgentStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    await sendMessage(input)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <Button 
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </Button>
      </div>
    </form>
  )
} 