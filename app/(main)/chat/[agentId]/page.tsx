import { notFound } from "next/navigation";
import { ChatWindow } from "@/app/(main)/chat/_components/chat-window";

interface ChatAgentPageProps {
  params: {
    agentId: string;
  };
}

const agents = {
  events: {
    name: "Assistente de Eventos",
    description: "Ajuda a encontrar eventos em Aveiro",
  },
  // Add other agents here when needed
};

export default function ChatAgentPage({ params }: ChatAgentPageProps) {
  const agent = agents[params.agentId as keyof typeof agents];

  if (!agent) {
    notFound();
  }

  return (
    <div className="container py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{agent.name}</h1>
          <p className="text-muted-foreground">{agent.description}</p>
        </div>
        <ChatWindow />
      </div>
    </div>
  );
}

// Generate static params for known agents
export function generateStaticParams() {
  return Object.keys(agents).map((agentId) => ({
    agentId,
  }));
} 