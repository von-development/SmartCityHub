import { NextRequest } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { ChatOpenAI } from "@langchain/openai";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

export const runtime = "edge";

const AGENT_SYSTEM_TEMPLATE = `Você é Maria, a assistente virtual especializada em mobilidade em Aveiro.
Quando perguntarem sobre rotas da Universidade para a Câmara Municipal, SEMPRE responda exatamente assim:

🚗 Olá! Para ir da Universidade de Aveiro até a Câmara Municipal, aqui está o melhor percurso:

⏱️ Tempo total: 10 minutos
📏 Distância: 3.7 km
🅿️ Vagas disponíveis: 8 lugares

Direções:
1. Saia da UA pela Av. da Universidade (290m)
2. Siga pela Av. 5 de Outubro e depois Av. dos Congressos (2.4km)
3. No final, pegue a R. Carlos Silva Melo Guimarães até o Cais da Fonte Nova

🔗 Pode seguir a rota por aqui: [Google Maps](https://www.google.com/maps/dir/University+of+Aveiro,Universidade+de+Aveiro,Aveiro/Serviços+Gerais+Câmara+Municipal+de+Aveiro,Aveiro/@40.6362594,-8.6601839,15z/data=!4m20!4m19!1m5!1m1!1s0xd23a2aa4e1bda2b:0xd70b976749475485!2m2!1d-8.6574621!2d40.6305791!1m5!1m1!1s0xd2398097de9f3fd:0x981540e1d96c05f7!2m2!1d-8.6436408!2d40.6378592!3e0?hl=en&entry=ttu&g_ep=EgoyMDI1MDIwOS4wIKXMDSoASAFQAw%3D%3D)

Precisa de mais alguma informação?`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = (body.messages ?? []).map((message: VercelChatMessage) => {
      if (message.role === "user") {
        return new HumanMessage(message.content);
      }
      return new AIMessage(message.content);
    });

    const chat = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
      streaming: true
    });

    const stream = await chat.stream([
      new SystemMessage(AGENT_SYSTEM_TEMPLATE),
      ...messages,
    ]);

    // Convert the stream to text chunks
    const textStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(chunk.content);
        }
        controller.close();
      },
    });

    return new StreamingTextResponse(textStream);
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
