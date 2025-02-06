"use client";

import { ChatWindow } from "@/components/ChatWindow";
import { GuideInfoBox } from "@/components/guide/GuideInfoBox";
import { useParams } from "next/navigation";

const agentConfigs = {
  test: {
    title: "Test Agent",
    description: "Agente para testes e desenvolvimento",
    emoji: "🤖",
    endpoint: "/api/chat/agents"
  },
  events: {
    title: "Assistente de Eventos",
    description: "Descubra eventos, festivais e atividades culturais",
    emoji: "📅",
    endpoint: "/api/chat/event_agent"
  },
  tourism: {
    title: "Aveiro Servico online",
    description: "Explore pontos turísticos e receba recomendações personalizadas",
    emoji: "🗺️",
    endpoint: "/api/chat/servicon_agent"
  },
  transport: {
    title: "TESTA ESSE AQUI",
    description: "Informações sobre transporte público e mobilidade urbana",
    emoji: "🚌",
    endpoint: "/api/chat/servico_online"
  },
  services: {
    title: "Assistente de Serviços",
    description: "Ajuda com serviços municipais e documentação",
    emoji: "🏛️",
    endpoint: "/api/chat/services_agent"
  },
  education: {
    title: "Guia Educacional",
    description: "Informações sobre escolas, universidades e cursos",
    emoji: "📚",
    endpoint: "/api/chat/education_agent"
  },
  local: {
    title: "Assistente Local",
    description: "Informações sobre comércio local e serviços próximos",
    emoji: "🔍",
    endpoint: "/api/chat/local_agent"
  },
  faq: {
    title: "FAQ Bot",
    description: "Respostas rápidas para perguntas frequentes",
    emoji: "❓",
    endpoint: "/api/chat/faq_agent"
  }
};

export default function AgentChatPage() {
  const params = useParams();
  const agentId = params.agentId as string;
  const config = agentConfigs[agentId as keyof typeof agentConfigs];

  const InfoCard = (
    <GuideInfoBox>
      <ul>
        <li className="text-l">
          {config.emoji}
          <span className="ml-2">
            Bem-vindo ao {config.title}! {config.description}
          </span>
        </li>
        <li className="text-l">
          💡
          <span className="ml-2">
            Como posso ajudar você hoje?
          </span>
        </li>
      </ul>
    </GuideInfoBox>
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="bg-muted py-12">
        <div className="container px-4">
          <h1 className="text-3xl font-bold mb-4">{config.title}</h1>
          <p className="text-muted-foreground">
            {config.description}
          </p>
        </div>
      </div>
      <div className="flex-1 relative">
        <ChatWindow
          endpoint={config.endpoint}
          emptyStateComponent={InfoCard}
          placeholder="Como posso ajudar você hoje?"
          emoji={config.emoji}
          showIntermediateStepsToggle={true}
        />
      </div>
    </div>
  );
} 