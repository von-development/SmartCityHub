"use client";

import { ChatWindow } from "@/components/ChatWindow";
import { GuideInfoBox } from "@/components/guide/GuideInfoBox";
import { useParams } from "next/navigation";

const agentConfigs = {
  general: {
    title: "Assistente Geral",
    description: "Informações gerais sobre a cidade e serviços municipais",
    emoji: "🤖"
  },
  events: {
    title: "Assistente de Eventos",
    description: "Descubra eventos, festivais e atividades culturais",
    emoji: "📅"
  },
  tourism: {
    title: "Guia Turístico",
    description: "Explore pontos turísticos e receba recomendações personalizadas",
    emoji: "🗺️"
  },
  transport: {
    title: "Assistente de Mobilidade",
    description: "Informações sobre transporte público e mobilidade urbana",
    emoji: "🚌"
  },
  services: {
    title: "Assistente de Serviços",
    description: "Ajuda com serviços municipais e documentação",
    emoji: "🏛️"
  },
  faq: {
    title: "FAQ Bot",
    description: "Respostas rápidas para perguntas frequentes",
    emoji: "❓"
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
          endpoint={`api/chat/agents/${agentId}`}
          emptyStateComponent={InfoCard}
          placeholder="Como posso ajudar você hoje?"
          emoji={config.emoji}
          showIntermediateStepsToggle={true}
        />
      </div>
    </div>
  );
} 