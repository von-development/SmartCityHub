import type { Message } from '@/types/agent'
import { agents } from '.'

export async function generateResponse(
  messages: Message[],
  agentId: string
): Promise<string> {
  console.log('Generating response for agent:', agentId)
  console.log('Messages:', messages)

  const agent = agents.find(a => a.id === agentId)
  if (!agent) {
    console.error('Agent not found:', agentId)
    throw new Error('Agent not found')
  }

  const lastMessage = messages[messages.length - 1]
  
  try {
    console.log('Invoking agent executor...')
    const response = await agent.executor.invoke({
      input: lastMessage.content,
      chat_history: messages.slice(0, -1).map(m => ({
        role: m.role,
        content: m.content
      }))
    })
    console.log('Response:', response)

    return response.output
  } catch (error) {
    console.error('Error generating response:', error)
    return 'Desculpe, ocorreu um erro ao processar sua solicitação.'
  }
} 