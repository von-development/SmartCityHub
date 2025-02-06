"use client";

import { ChatWindow } from "@/components/ChatWindow";
import { GuideInfoBox } from "@/components/guide/GuideInfoBox";

export default function AgentsPage() {
  const InfoCard = (
    <GuideInfoBox>
      <ul>
        <li className="text-l">
          🤖
          <span className="ml-2">
            Bem-vindo ao Smart City Hub AI Agents! Aqui você encontra assistentes 
            especializados para ajudar com diferentes aspectos da cidade.
          </span>
        </li>
        <li>
          🛠️
          <span className="ml-2">
            Nossos agentes têm acesso a informações sobre serviços municipais, eventos, 
            turismo e muito mais.
          </span>
        </li>
        <li className="text-l">
          💡
          <span className="ml-2">
            Experimente perguntar sobre:
          </span>
          <ul className="ml-6 list-disc">
            <li>Eventos culturais na cidade</li>
            <li>Serviços municipais disponíveis</li>
            <li>Pontos turísticos para visitar</li>
            <li>Informações sobre transporte público</li>
          </ul>
        </li>
        <li className="text-l">
          👇
          <span className="ml-2">
            Comece fazendo uma pergunta abaixo!
          </span>
        </li>
      </ul>
    </GuideInfoBox>
  );

  return (
    <>
      <div className="bg-muted py-12">
        <div className="container px-4">
          <h1 className="text-3xl font-bold mb-4">Assistentes Especializados</h1>
          <p className="text-muted-foreground">
            Interaja com nossos agentes de IA especializados em diferentes aspectos da cidade.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <ChatWindow
          endpoint="api/chat/agents"
          emptyStateComponent={InfoCard}
          placeholder="Como posso ajudar você hoje?"
          emoji="🤖"
          showIntermediateStepsToggle={true}
        />
      </div>
    </>
  );
} 