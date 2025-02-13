"use client";

import { useEffect, useState } from 'react'
import { ChatWindow } from "@/components/chat/ChatWindow";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Skeleton } from '@/components/ui/skeleton'

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
    welcomeMessage: "👋 Olá! Sou o assistente beta. Estou aqui para testar novas funcionalidades e ajudar você a explorar o sistema. Como posso ajudar?"
  },
  events: {
    title: "Ana",
    description: "Descubra eventos e Noticiasem Aveiro",
    icon: "/chat/women_bb.svg",
    endpoint: "/api/chat/event_agent",
    welcomeMessage: "🎉 Olá! Sou Ana, sua guia de eventos e noticias em Aveiro! Posso ajudar você a encontrar eventos acontecendo hoje, descobrir festivais e shows, localizar eventos culturais e saber sobre feiras e exposições. O que você gostaria de descobrir?"
  },
  tourism: {
    title: "Pedro - Guia Turístico",
    description: "Como posso tornar sua visita a Aveiro mais especial?",
    icon: "/chat/man_bw.svg",
    endpoint: "/api/chat/tourism_agent",
    welcomeMessage: "🏖️ Bem-vindo(a) a Aveiro! Sou Pedro, seu guia turístico pessoal. Posso ajudar com pontos turísticos, melhores restaurantes, passeios de moliceiro e rotas turísticas. Como posso tornar sua visita inesquecível?"
  },
  transport: {
    title: "Maria - Mobilidade",
    description: "Como posso ajudar com sua locomoção pela cidade?",
    icon: "/chat/women_bbg.svg",
    endpoint: "/api/chat/agents",
    welcomeMessage: " ##Agente em configuracao! **Porfavor entre em contato com vivonvon@ua.pt para testar esse agente. Os agentes disponiveis atualmente sao  Joao (Servicos Online) Ana (Turismo) e Pedro (Guia Turistico)** "
  },
  services: {
    title: "João - Serviços",
    description: "Como posso auxiliar com serviços municipais hoje?",
    icon: "/chat/man_ww.svg",
    endpoint: "/api/chat/servico_online",
    welcomeMessage: "🏛️ Olá! Sou João, seu assistente para serviços municipais. Posso ajudar com documentação, agendamentos, informações sobre taxas e serviços online. Qual serviço você precisa hoje?"
  },
  education: {
    title: "Sofia - Educação",
    description: "Como posso ajudar com informações educacionais?",
    icon: "/chat/women_cwb.svg",
    endpoint: "/api/chat/tourism_agent",
    welcomeMessage: "##Agente em configuracao! **Porfavor entre em contato com vivonvon@ua.pt para testar esse agente. Os agentes disponiveis atualmente sao  Joao (Servicos Online) Ana (Turismo) e Pedro (Guia Turistico)**"
  },
  local: {
    title: "Miguel - Guia Local",
    description: "Como posso ajudar você a explorar nossa cidade?",
    icon: "/chat/man_bb.svg",
    endpoint: "/api/chat/local_agent",
    welcomeMessage: "##Agente em configuracao! **Porfavor entre em contato com vivonvon@ua.pt para testar esse agente. Os agentes disponiveis atualmente sao  Joao (Servicos Online) Ana (Turismo) e Pedro (Guia Turistico)**?"
  },
  faq: {
    title: "Clara - FAQ",
    description: "Como posso esclarecer suas dúvidas hoje?",
    icon: "/chat/women_bb.svg",
    endpoint: "/api/chat/faq_agent",
    welcomeMessage: "##Agente em configuracao! **Porfavor entre em contato com vivonvon@ua.pt para testar esse agente. Os agentes disponiveis atualmente sao  Joao (Servicos Online) Ana (Turismo) e Pedro (Guia Turistico)**"
  }
};

export default function AgentChatPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  const agentId = typeof params?.agentId === 'string' ? params.agentId : Array.isArray(params?.agentId) ? params.agentId[0] : '';
  const agentConfig = agentConfigs[agentId];

  useEffect(() => {
    if (agentConfig) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [agentConfig])

  if (!agentConfig) {
    return <div>Agent not found</div>
  }

  return (
    <div className="flex-1 relative h-[calc(100vh-4rem)]">
      {isLoading ? (
        <div className="p-4 space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <ChatWindow
          endpoint={agentConfig.endpoint}
          emptyStateComponent={
            <div className="text-center text-muted-foreground">
              <p>{agentConfig.welcomeMessage}</p>
            </div>
          }
          placeholder={`Mensagem para ${agentConfig.title}...`}
          welcomeMessage={agentConfig.welcomeMessage}
          agentIcon={
            <img src={agentConfig.icon} alt={agentConfig.title} className="w-6 h-6" />
          }
          showIngestForm={false}
          showIntermediateStepsToggle={false}
        />
      )}
    </div>
  );
} 