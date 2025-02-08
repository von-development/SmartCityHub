import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { AIMessage, BaseMessage, ChatMessage, HumanMessage } from "@langchain/core/messages";
import { createMunicipalServicesRetriever } from "./retriever";
import { createWorkflow } from "./graph";

export const runtime = "edge";

/**
 * Converts a Vercel AI SDK message to a LangChain message
 */
const convertVercelMessageToLangChainMessage = (message: VercelChatMessage): BaseMessage => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

/**
 * Converts LangChain message to Vercel AI SDK message format
 */
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

/**
 * Handles the chat request using the municipal services agent
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const returnIntermediateSteps = body.show_intermediate_steps;
    
    // Filter and convert messages
    const messages = (body.messages ?? [])
      .filter((message: VercelChatMessage) => 
        message.role === "user" || message.role === "assistant"
      )
      .map(convertVercelMessageToLangChainMessage);

    // Initialize retriever and create workflow
    const retriever = createMunicipalServicesRetriever();
    const app = createWorkflow(retriever);

    if (!returnIntermediateSteps) {
      // Stream the response
      const eventStream = await app.streamEvents(
        { messages },
        { version: "v2" }
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
      // Return full response with intermediate steps
      const result = await app.invoke({ messages });
      return NextResponse.json(
        {
          messages: result.messages.map(convertLangChainMessageToVercelMessage),
        },
        { status: 200 },
      );
    }
  } catch (e: any) {
    console.error("Error in municipal services agent:", e);
    return NextResponse.json(
      { error: e.message }, 
      { status: e.status ?? 500 }
    );
  }
} 