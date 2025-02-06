import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createRetrieverTool } from "langchain/tools/retriever";
import { ToolNode } from "@langchain/langgraph/prebuilt";

/**
 * Initializes connection to existing Supabase vector store and creates retriever tools
 * @returns A configured retriever tool and tool node
 */
export function createMunicipalServicesRetriever() {
  // Initialize Supabase client
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PRIVATE_KEY!,
  );

  // Connect to existing vector store
  const vectorstore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
    client,
    tableName: "documents", // your existing table
    queryName: "match_documents", // your existing function
  });

  // Create retriever from existing store
  const retriever = vectorstore.asRetriever({
    searchType: "similarity",
    k: 4, // Number of documents to retrieve
  });

  // Create retriever tool
  const tool = createRetrieverTool(retriever, {
    name: "search_municipal_services",
    description: "Pesquisa informações sobre serviços municipais de Aveiro. Use esta ferramenta para encontrar detalhes sobre procedimentos, documentos necessários e prazos.",
  });

  // Create tool node for the graph
  const toolNode = new ToolNode([tool]);

  return {
    tool,
    toolNode,
    tools: [tool] // Array of tools for the agent
  };
}

// Export types for better type safety
export type MunicipalServicesRetriever = ReturnType<typeof createMunicipalServicesRetriever>; 