// MELHORAR O PROMPT PARA QUE TENHA MELHOR FORMATACAO E SEJA MAIS PRECISO
// INCLUIR MARKDOWN
// INCLUIR OUTROS WEBSITE
// TODO


import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import {
  AIMessage,
  BaseMessage,
  ChatMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

export const runtime = "edge";

// Message conversion functions (keep the same as other agents)
const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

const convertLangChainMessageToVercelMessage = (message: BaseMessage) => {
  if (message._getType() === "human") {
    return { content: message.content, role: "user" };
  } else if (message._getType() === "ai") {
    return {
      content: message.content,
      role: "assistant",
      tool_calls: (message as AIMessage).tool_calls,
    };
  } else {
    return { content: message.content, role: message._getType() };
  }
};

// Specialized prompt for events agent
const EVENT_AGENT_TEMPLATE = `Você é um assistente especializado em eventos em Aveiro, Portugal.
Suas principais responsabilidades:
1. Encontrar eventos atuais e futuros em Aveiro
2. Fornecer detalhes sobre datas, locais e programação
3. Recomendar eventos baseados nos interesses do usuário
4. Informar sobre ingressos e reservas

Use a ferramenta de busca para encontrar informações atualizadas.
Responda sempre em português de forma clara e objetiva.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const returnIntermediateSteps = body.show_intermediate_steps;
    const messages = (body.messages ?? [])
      .filter(
        (message: VercelChatMessage) =>
          message.role === "user" || message.role === "assistant",
      )
      .map(convertVercelMessageToLangChainMessage);

    // Initialize Tavily Search tool
    
    const tools = [
      new TavilySearchResults({
        apiKey: process.env.NEXT_PUBLIC_TAVILY_API_KEY,
        maxResults: 3,
        includeDomains: ["cm-aveiro.pt", "visitaveiro.pt"]
,
      }),
    ];

    const chat = new ChatOpenAI({
      modelName: "gpt-4o-mini",
      temperature: 0.7,
      streaming: true,
    });

    const agent = createReactAgent({
      llm: chat,
      tools,
      messageModifier: new SystemMessage(EVENT_AGENT_TEMPLATE),
    });

    if (!returnIntermediateSteps) {
      const eventStream = await agent.streamEvents(
        { messages },
        { version: "v2" },
      );

      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          for await (const chunk of eventStream) {
            if (chunk.event === "on_chat_model_stream") {
              if (chunk.data.chunk.content) {
                // Encode the text content as bytes
                const bytes = encoder.encode(chunk.data.chunk.content);
                controller.enqueue(bytes);
              }
            }
          }
          controller.close();
        },
      });

      return new StreamingTextResponse(stream);
    } else {
      const result = await agent.invoke({ messages });
      return NextResponse.json(
        {
          messages: result.messages.map(convertLangChainMessageToVercelMessage),
        },
        { status: 200 },
      );
    }
  } catch (e: any) {
    console.error('Event Agent error:', e);
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}