import { END } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, SystemMessage } from "@langchain/core/messages";
import { z } from "zod";
import { GraphStateType } from "./state";
import { PROMPTS } from "./prompts";
import type { MunicipalServicesRetriever } from "./retriever";

/**
 * Decision functions for the graph
 */

export function shouldRetrieve(state: GraphStateType): string {
  const { messages } = state;
  console.log("---DECIDE TO RETRIEVE---");
  const lastMessage = messages[messages.length - 1];

  if ("tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls) && lastMessage.tool_calls.length) {
    console.log("---DECISION: RETRIEVE---");
    return "retrieve";
  }
  return END;
}

export function checkRelevance(state: GraphStateType): string {
  console.log("---CHECK RELEVANCE---");
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];
  
  if (!("tool_calls" in lastMessage)) {
    throw new Error("The 'checkRelevance' node requires the most recent message to contain tool calls.")
  }
  const toolCalls = (lastMessage as AIMessage).tool_calls;
  if (!toolCalls || !toolCalls.length) {
    throw new Error("Last message was not a function message");
  }

  if (toolCalls[0].args.binaryScore === "yes") {
    console.log("---DECISION: DOCS RELEVANT---");
    return "yes";
  }
  console.log("---DECISION: DOCS NOT RELEVANT---");
  return "no";
}

/**
 * Processing nodes for the graph
 */

export function createAgentNode(retriever: MunicipalServicesRetriever) {
  return async function agent(state: GraphStateType): Promise<Partial<GraphStateType>> {
    console.log("---CALL AGENT---");
    const { messages } = state;
    
    // Filter out relevance scoring messages
    const filteredMessages = messages.filter((message) => {
      if ("tool_calls" in message && Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
        return message.tool_calls[0].name !== "give_relevance_score";
      }
      return true;
    });

    // Add system message
    const messagesWithSystem = [
      new SystemMessage(PROMPTS.AGENT_SYSTEM_TEMPLATE),
      ...filteredMessages
    ];

    const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.2,
      streaming: true,
    }).bindTools(retriever.tools);

    const response = await model.invoke(messagesWithSystem);
    return {
      messages: [response],
    };
  };
}

export async function gradeDocuments(state: GraphStateType): Promise<Partial<GraphStateType>> {
  console.log("---GET RELEVANCE---");
  const { messages } = state;
  
  const tool = {
    name: "give_relevance_score",
    description: "Give a relevance score to the retrieved documents.",
    schema: z.object({
      binaryScore: z.enum(["yes", "no"]).describe("Relevance score 'yes' or 'no'"),
    })
  };

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  }).bindTools([tool], {
    tool_choice: tool.name,
  });

  const chain = PROMPTS.RELEVANCE_PROMPT.pipe(model);
  const lastMessage = messages[messages.length - 1];

  if (!lastMessage || !lastMessage.content) {
    throw new Error("No content found in the last message");
  }

  const score = await chain.invoke({
    question: messages[0].content as string,
    context: lastMessage.content as string,
  });

  return {
    messages: [score]
  };
}

export async function rewrite(state: GraphStateType): Promise<Partial<GraphStateType>> {
  console.log("---TRANSFORM QUERY---");
  const { messages } = state;
  const question = messages[0].content as string;

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    streaming: true,
  });

  const response = await PROMPTS.REWRITE_PROMPT.pipe(model).invoke({ question });
  return {
    messages: [response],
  };
}

export async function generate(state: GraphStateType): Promise<Partial<GraphStateType>> {
  console.log("---GENERATE---");
  const { messages } = state;
  const question = messages[0].content as string;
  
  const lastToolMessage = messages.slice().reverse().find((msg) => msg._getType() === "tool");
  if (!lastToolMessage) {
    throw new Error("No tool message found in the conversation history");
  }

  const docs = lastToolMessage.content as string;
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.3,
    streaming: true,
  });

  const response = await PROMPTS.GENERATE_PROMPT.pipe(llm).invoke({
    context: docs,
    question,
  });

  return {
    messages: [response],
  };
} 