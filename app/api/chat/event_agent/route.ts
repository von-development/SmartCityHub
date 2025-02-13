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

    // Get the current date and time in a formatted string
    const currentDateTime = new Date().toLocaleString("pt-PT", {
      timeZone: "Europe/Lisbon",
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Define the system prompt for the agent
    const systemPrompt = `Você é um assistente especializado em eventos na cidade de Aveiro, Portugal. Sua função é fornecer informações concisas e relevantes sobre eventos locais e notícias, evitando respostas longas e excessivas.

**Data e Hora Atual em Aveiro:** ${currentDateTime}

**Fontes principais para buscar eventos:**
- Câmara Municipal de Aveiro (https://www.cm-aveiro.pt)
- Notícias de Aveiro (https://www.noticiasdeaveiro.pt)
- Diário de Aveiro (https://www.diarioaveiro.pt)

Available Tool:
web_search: Use to find current events or news in Portuguese. Example: "eventos aveiro fevereito 2025", "hackthons em aveiro 2025", "exposicoes de arte em aveiro 2025"

**Instruções:**
1. Responda com a frase: "Encontrei algumas notícias/eventos que possam interessar."
2. Forneça um parágrafo com uma breve descrição do evento ou notícia, incluindo informações sobre onde e quando, se disponíveis. Se essas informações não estiverem disponíveis, você pode ignorá-las.
3. Sempre compartilhe links úteis relacionados ao evento ou notícia, se houver.
4. Não separe os eventos ou notícias por linhas em branco; mantenha cada noticia e/ou evento separado em paragraphos.
5. Se o usuario nao especifcou um evento ou noticia especifico compartile 3 ou mais eventos e/ou noticias.
6. Se o usuario nao especificou o tipo de noticia ou evento especifico que ele queira no final do prompt fale que voce pode forncer mais detalhes ou procurar eventos confrome seus gostos
7. Use emojis para parecer mais animado e amigavel, mas nao abuse!

**Exemplo de Resposta:**
Encontrei algumas notícias/eventos que possam interessar. O **Festival de Música de Aveiro** acontecerá no **Teatro Aveirense** no dia **15 de dezembro, às 21h00**. É uma noite especial com músicos locais. Para mais informações, acesse [Programa completo](https://teatro-aveirense.pt/evento). A **Exposição de Arte Contemporânea** está em exibição até **20 de dezembro** no **Museu de Aveiro**, apresentando artistas portugueses contemporâneos. Para detalhes, visite [Detalhes da exposição](https://museu-aveiro.pt/expo).

Se o usuario nao especificou o tipo de noticia ou evento especifico que ele queira no final do prompt fale que voce pode forncer mais detalhes ou procurar eventos confrome seus gostos!`;


    // Initialize Tavily Search tool

    const tools = [
      new TavilySearchResults({
        apiKey: process.env.NEXT_PUBLIC_TAVILY_API_KEY,
        maxResults: 5,
        includeDomains: ["cm-aveiro.pt", "noticiasdeaveiro.pt", "diarioaveiro.pt", "cm-aveiro.pt/visitantes/agenda-aveiro.pt"],
        searchDepth: "deep",
        includeImages: true,
      }),
    ];

    const chat = new ChatOpenAI({
      modelName: "gpt-4o-mini",
      temperature: 0.5,
      streaming: true,
    });

    const agent = createReactAgent({
      llm: chat,
      tools,
      messageModifier: new SystemMessage(systemPrompt),
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
          systemPrompt,
        },
        { status: 200 },
      );
    }
  } catch (e: any) {
    console.error('Event Agent error:', e);
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}