import type { Message } from "@/types/chat";

interface ApiResponse {
  response: string;
}

const EVENTS_API_BASE = 'http://localhost:8000/events';

export async function askAboutEvents(query: string): Promise<{ response: string }> {
  const response = await fetch(`${EVENTS_API_BASE}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Erro ao processar sua pergunta');
  }

  return response.json();
} 