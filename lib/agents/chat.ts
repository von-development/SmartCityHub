import { OpenAI } from 'langchain/llms/openai'
import { BufferMemory } from 'langchain/memory'
import { ConversationChain } from 'langchain/chains'
import type { Message } from '@/types/agent'

const model = new OpenAI({
  modelName: 'gpt-4-turbo-preview',
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY
})

const memory = new BufferMemory()

const chain = new ConversationChain({
  llm: model,
  memory: memory
})

export async function generateResponse(
  messages: Message[],
  systemPrompt: string
): Promise<string> {
  const formattedHistory = messages
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n')

  const response = await chain.call({
    input: `
      System: ${systemPrompt}
      
      Previous conversation:
      ${formattedHistory}
      
      Assistant: `
  })

  return response.response
} 