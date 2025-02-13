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
    description: "Descubra eventos em Aveiro",
    icon: "/chat/women_bb.svg",
    endpoint: "/api/chat/event_agent",
    welcomeMessage: "🎉 Olá! Sou Ana, sua guia de eventos em Aveiro! Posso ajudar você a encontrar eventos acontecendo hoje, descobrir festivais e shows, localizar eventos culturais e saber sobre feiras e exposições. O que você gostaria de descobrir?"
  },
  tourism: {
    title: "Pedro - Guia Turístico",
    description: "Como posso tornar sua visita a Aveiro mais especial?",
    icon: "/chat/man_bw.svg",
    endpoint: "/api/chat/tourism_agent",
    welcomeMessage: "🏖️ Bem-vindo(a) a Aveiro! Sou Pedro, seu guia turístico pessoal. Posso ajudar com pontos turísticos, melhores restaurantes, passeios de moliceiro e rotas turísticas. Como posso tornar sua visita inesquecível?"
  },
  // transport: {
  //   title: "Maria - Mobilidade",
  //   description: "Como posso ajudar com sua locomoção pela cidade?",
  //   icon: "/chat/women_bbg.svg",
  //   endpoint: "/api/chat/servico_online",
  //   welcomeMessage: "🚌 Olá! Sou Maria, especialista em mobilidade urbana. Posso ajudar você com horários de ônibus, rotas mais rápidas, estacionamentos e aluguel de bicicletas. Como posso auxiliar sua locomoção hoje?"
  // },
  services: {
    title: "João - Serviços",
    description: "Como posso auxiliar com serviços municipais hoje?",
    icon: "/chat/man_ww.svg",
    endpoint: "/api/chat/servico_online",
    welcomeMessage: "🏛️ Olá! Sou João, seu assistente para serviços municipais. Posso ajudar com documentação, agendamentos, informações sobre taxas e serviços online. Qual serviço você precisa hoje?"
  },
  // education: {
  //   title: "Sofia - Educação",
  //   description: "Como posso ajudar com informações educacionais?",
  //   icon: "/chat/women_cwb.svg",
  //   endpoint: "/api/chat/tourism_agent",
  //   welcomeMessage: "📚 Olá! Sou Sofia, sua consultora educacional. Posso ajudar com informações sobre escolas e universidades, cursos disponíveis, programas educacionais e bibliotecas públicas. Qual informação você procura?"
  // },
  // local: {
  //   title: "Miguel - Guia Local",
  //   description: "Como posso ajudar você a explorar nossa cidade?",
  //   icon: "/chat/man_bb.svg",
  //   endpoint: "/api/chat/local_agent",
  //   welcomeMessage: "🌆 Olá! Sou Miguel, seu guia local em Aveiro. Conheço os melhores restaurantes locais, cafés escondidos, lojas tradicionais e lugares secretos da cidade. Quer descobrir o verdadeiro coração de Aveiro?"
  // },
  // faq: {
  //   title: "Clara - FAQ",
  //   description: "Como posso esclarecer suas dúvidas hoje?",
  //   icon: "/chat/women_bb.svg",
  //   endpoint: "/api/chat/faq_agent",
  //   welcomeMessage: "💡 Olá! Sou Clara, especialista em respostas rápidas. Posso ajudar com dúvidas frequentes, informações práticas, horários de funcionamento e contatos importantes. Qual sua dúvida?"
  // }
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
    <div className="flex-1 relative h-[calc(100vh-4rem)] w-full max-w-full overflow-hidden">
      {isLoading ? (
        <div className="p-4 space-y-4 w-full">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <div className="h-full w-full">
          <ChatWindow
            endpoint={agentConfig.endpoint}
            emptyStateComponent={
              <div className="text-center text-muted-foreground p-4">
                <p className="text-sm sm:text-base">{agentConfig.welcomeMessage}</p>
              </div>
            }
            placeholder={`Mensagem para ${agentConfig.title}...`}
            welcomeMessage={agentConfig.welcomeMessage}
            agentIcon={
              <Image
                src={agentConfig.icon}
                alt={agentConfig.title}
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
                priority={true}
              />
            }
            showIngestForm={false}
            showIntermediateStepsToggle={false}
          />
        </div>
      )}
    </div>
  );
} 