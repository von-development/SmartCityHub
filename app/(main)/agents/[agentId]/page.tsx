"use client";

import { ChatWindow } from "@/components/chat/ChatWindow";
import { useParams } from "next/navigation";
import Image from "next/image";

interface AgentConfig {
  title: string;
  description: string;
  icon: string;
  endpoint: string;
  welcomeMessage: string;
}

const agentConfigs: Record<string, AgentConfig> = {
  test: {
    title: "Assistente Beta",
    description: "Como posso ajudar você hoje?",
    icon: "/chat/man_wb.svg",
    endpoint: "/api/chat/agents",
    welcomeMessage: "Olá! Sou o assistente beta, estou aqui para ajudar nos testes. Como posso ajudar você hoje?"
  },
  events: {
    title: "Ana",
    description: "Descubra eventos em Aveiro",
    icon: "/chat/women_bb.svg",
    endpoint: "/api/chat/event_agent",
    welcomeMessage: "Olá! Sou Ana, sua guia de eventos em Aveiro. Estou aqui para ajudar você a descobrir eventos interessantes na cidade! Como posso ajudar?"
  },
  tourism: {
    title: "Pedro - Guia Turístico",
    description: "Como posso tornar sua visita a Aveiro mais especial?",
    icon: "/chat/man_bw.svg",
    endpoint: "/api/chat/tourism_agent",
    welcomeMessage: "Olá! Sou Pedro, seu guia turístico em Aveiro. Estou aqui para ajudar você a tornar sua visita mais especial!"
  },
  transport: {
    title: "Maria - Mobilidade",
    description: "Como posso ajudar com sua locomoção pela cidade?",
    icon: "/chat/women_bbg.svg",
    endpoint: "/api/chat/servico_online",
    welcomeMessage: "Olá! Sou Maria, sua assistente de mobilidade. Estou aqui para ajudar você com sua locomoção pela cidade!"
  },
  services: {
    title: "João - Serviços",
    description: "Como posso auxiliar com serviços municipais hoje?",
    icon: "/chat/man_ww.svg",
    endpoint: "/api/chat/services_agent",
    welcomeMessage: "Olá! Sou João, seu assistente de serviços municipais. Estou aqui para ajudar você com serviços municipais hoje!"
  },
  education: {
    title: "Sofia - Educação",
    description: "Como posso ajudar com informações educacionais?",
    icon: "/chat/women_cwb.svg",
    endpoint: "/api/chat/tourism_agent",
    welcomeMessage: "Olá! Sou Sofia, sua assistente de educação. Estou aqui para ajudar você com informações educacionais!"
  },
  local: {
    title: "Miguel - Guia Local",
    description: "Como posso ajudar você a explorar nossa cidade?",
    icon: "/chat/man_bb.svg",
    endpoint: "/api/chat/local_agent",
    welcomeMessage: "Olá! Sou Miguel, seu guia local em Aveiro. Estou aqui para ajudar você a explorar nossa cidade!"
  },
  faq: {
    title: "Clara - FAQ",
    description: "Como posso esclarecer suas dúvidas hoje?",
    icon: "/chat/women_bb.svg",
    endpoint: "/api/chat/faq_agent",
    welcomeMessage: "Olá! Sou Clara, sua assistente de FAQ. Estou aqui para ajudar você a esclarecer suas dúvidas hoje!"
  }
};

export default function AgentChatPage() {
  const params = useParams();
  const agentId = params.agentId as string;
  const config = agentConfigs[agentId];

  if (!config) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="flex-1 relative h-[calc(100vh-4rem)]">
      <ChatWindow
        endpoint={config.endpoint}
        emptyStateComponent={null}
        placeholder={config.description}
        showIntermediateStepsToggle={true}
        agentIcon={(
          <Image
            src={config.icon}
            alt={config.title}
            width={32}
            height={32}
            className="rounded-full hover:scale-110 transition-all duration-300"
          />
        )}
        welcomeMessage={config.welcomeMessage}
      />
    </div>
  );
} 