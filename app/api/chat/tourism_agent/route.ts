import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { GooglePlacesAPI } from "@langchain/community/tools/google_places";
import {
  AIMessage,
  BaseMessage,
  ChatMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

export const runtime = "edge";

// Message conversion utilities (same as event agent)
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

// Tourism Agent System Prompt
const TOURISM_SYSTEM_PROMPT = `Você é um guia turístico especializado em Aveiro, Portugal.
Seu objetivo é fornecer informações precisas e atualizadas sobre lugares, atrações e experiências na cidade.

Localização base: Aveiro, Portugal (40.6405° N, 8.6538° W)

Suas responsabilidades incluem:
1. Recomendar lugares para visitar com base nos interesses do usuário
2. Fornecer informações sobre horários de funcionamento e melhores momentos para visita
3. Sugerir restaurantes e acomodações
4. Compartilhar contexto cultural e histórico
5. Dar dicas práticas sobre transporte e logística

Use as ferramentas disponíveis para:
- Buscar informações atualizadas sobre lugares (Google Places)
- Encontrar eventos e notícias relevantes (Tavily Search)

FORMATO DE RESPOSTA:
## Recomendação
Breve introdução personalizada baseada na solicitação do usuário.

### Detalhes do Local
🏛️ **[Nome do Local]**
- **Endereço:** [Endereço completo]
- **Horário:** [Horário de funcionamento]
- **Status:** [Aberto/Fechado agora]
- **Avaliação:** ⭐ [Nota] ([Número de avaliações] avaliações)
- **Tipo:** [Categoria do local]

### Dicas e Informações
- [Dica relevante sobre o local]
- [Informação sobre melhor horário para visita]
- [Dica de transporte/acesso]

### Próximos Pontos de Interesse
1. 🏺 [Local relacionado próximo]
2. 🍽️ [Restaurante recomendado na região]
3. 🚶 [Outra atração nas proximidades]

### Contexto Cultural
[Breve explicação sobre a importância histórica/cultural quando relevante]

Lembre-se:
- Priorize recomendações baseadas na temporada atual
- Inclua sempre informações práticas como horários e preços
- Sugira alternativas quando relevante
- Mantenha um tom amigável e entusiasmado`;

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

    // Initialize tools
    const tools = [
      new GooglePlacesAPI({
        apiKey: process.env.GOOGLE_PLACES_API_KEY!,
      }),
      new TavilySearchResults({
        apiKey: process.env.NEXT_PUBLIC_TAVILY_API_KEY!,
        maxResults: 3,
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
      messageModifier: new SystemMessage(TOURISM_SYSTEM_PROMPT),
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
          systemPrompt: TOURISM_SYSTEM_PROMPT,
        },
        { status: 200 },
      );
    }
  } catch (e: any) {
    console.error('Tourism Agent error:', e);
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
} 