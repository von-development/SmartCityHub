"use client";

import { ChatWindow } from "@/components/chat/ChatWindow";
import { GuideInfoBox } from "@/components/guide/GuideInfoBox";


export default function ChatPage() {
  const InfoCard = (
    <GuideInfoBox>
      <ul>
        <li className="text-l">
          👋
          <span className="ml-2">
            Bem-vindo ao Chat do Smart City Hub! Aqui você pode conversar e tirar
            dúvidas sobre a cidade.
          </span>
        </li>
        <li>
          🎯
          <span className="ml-2">
            Este chat utiliza IA para fornecer informações precisas e atualizadas
            sobre Aveiro.
          </span>
        </li>
        <li className="text-l">
          💬
          <span className="ml-2">
            Você pode perguntar sobre:
          </span>
          <ul className="ml-6 list-disc">
            <li>Informações gerais sobre a cidade</li>
            <li>Dicas de lugares para visitar</li>
            <li>Horários de funcionamento</li>
            <li>Documentos necessários para serviços</li>
          </ul>
        </li>
      </ul>
    </GuideInfoBox>
  );

  return (
    <>
      <div className="bg-muted py-12">
        <div className="container px-4">
          <h1 className="text-3xl font-bold mb-4">Chat com IA</h1>
          <p className="text-muted-foreground">
            Converse com nossa IA e tire suas dúvidas sobre Aveiro.
          </p>
        </div>
      </div>
      <div className="flex-1 relative">
        <ChatWindow
          endpoint="api/chat/event_agent"
          emptyStateComponent={InfoCard}
          placeholder="Como posso ajudar você hoje?"

          showIntermediateStepsToggle={false}
        />
      </div>
    </>
  );
} 