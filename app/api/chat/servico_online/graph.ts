import { StateGraph } from "@langchain/langgraph";
import { END, START } from "@langchain/langgraph";
import { GraphState } from "./state";
import { shouldRetrieve, checkRelevance, createAgentNode, gradeDocuments, rewrite, generate } from "./nodes";
import type { MunicipalServicesRetriever } from "./retriever";

/**
 * Creates the workflow graph for the municipal services agent
 * @param retriever - The configured municipal services retriever
 * @returns A compiled workflow graph
 */
export function createWorkflow(retriever: MunicipalServicesRetriever) {
  // Create agent node with injected retriever
  const agentNode = createAgentNode(retriever);

  // Define the graph
  const workflow = new StateGraph(GraphState)
    .addNode("agent", agentNode)
    .addNode("retrieve", retriever.toolNode)
    .addNode("gradeDocuments", gradeDocuments)
    .addNode("rewrite", rewrite)
    .addNode("generate", generate);

  // Add edges
  workflow.addEdge(START, "agent");

  // Decide whether to retrieve
  workflow.addConditionalEdges(
    "agent",
    shouldRetrieve,
  );

  workflow.addEdge("retrieve", "gradeDocuments");

  // Grade documents and decide next step
  workflow.addConditionalEdges(
    "gradeDocuments",
    checkRelevance,
    {
      yes: "generate",
      no: "rewrite",
    }
  );

  workflow.addEdge("generate", END);
  workflow.addEdge("rewrite", "agent");

  return workflow.compile();
} 