import { Annotation } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";

/**
 * Defines the state management for the agent workflow
 * The state contains:
 * - messages: Array of messages in the conversation
 */
export const GraphState = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y),
        default: () => [],
    })
})

// Type helper for the graph state
export type GraphStateType = typeof GraphState.State;