import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function ingestMunicipalServices() {
  try {
    // Read the municipal services markdown file
    const filePath = path.join(process.cwd(), 'data', 'municipal_services.md');
    const text = fs.readFileSync(filePath, 'utf-8');

    // Initialize Supabase client
    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PRIVATE_KEY!
    );

    // Create text splitter with optimized settings for markdown
    const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize: 1500,  // Smaller chunks for more precise retrieval
      chunkOverlap: 0, // 10% overlap to maintain context
      separators: [
        "\n## ", // Major sections
        "\n### ", // Subsections
        "\n#### ", // Sub-subsections
      ]
    });

    console.log('Splitting documents...');
    const chunks = await splitter.splitText(text);
    
    // Create documents with metadata
    const documents = chunks.map((chunk) => {
      // Extract section headers for metadata
      const sectionMatch = chunk.match(/^#+\s+(.+)$/m);
      const categoryMatch = chunk.match(/^#\s+(.+)$/m);
      
      return new Document({
        pageContent: chunk,
        metadata: {
          section: sectionMatch ? sectionMatch[1] : 'General',
          category: categoryMatch ? categoryMatch[1] : 'Municipal Services',
          source: 'municipal_services.md'
        }
      });
    });

    console.log(`Created ${documents.length} document chunks`);

    console.log('Creating embeddings and storing in Supabase...');
    const vectorstore = await SupabaseVectorStore.fromDocuments(
      documents,
      new OpenAIEmbeddings(),
      {
        client,
        tableName: "documents",
        queryName: "match_documents",
      }
    );

    console.log('Ingestion completed successfully!');
  } catch (error) {
    console.error('Failed to ingest documents:', error);
    process.exit(1);
  }
}

// Run the ingestion
ingestMunicipalServices(); 