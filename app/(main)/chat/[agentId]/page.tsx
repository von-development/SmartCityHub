'use client'

import { useEffect } from 'react'
import { useAgentStore } from '@/stores/use-agent-store'
import { ChatInput } from '../_components/chat-input'
import { ChatMessages } from '../_components/chat-messages'
import { ChatHeader } from '../_components/chat-header'

export default function AgentChatPage({
  params
}: {
  params: { agentId: string }
}) {
  const { setCurrentAgent } = useAgentStore()

  useEffect(() => {
    setCurrentAgent(params.agentId)
  }, [params.agentId, setCurrentAgent])

  return (
    <>
      <ChatHeader agentId={params.agentId} />
      <ChatMessages />
      <ChatInput />
    </>
  )
} 