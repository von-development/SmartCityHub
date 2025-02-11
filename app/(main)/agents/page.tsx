"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Calendar, MapPin, Bus, Building2, Info, Search, Book } from "lucide-react";

const agents = [
  {
    id: "test",
    name: "AGENTE DE TESTE",
    description: "Agente para testes e desenvolvimento",
    icon: Bot,
    gradient: "from-gray-500 to-gray-700",
    href: "/agents/test",
    endpoint: "/api/chat/agents"
  },
  {
    id: "events",
    name: "Assistente de Eventos",
    description: "Descubra eventos, festivais e atividades culturais",
    icon: Calendar,
    gradient: "from-purple-500 to-pink-500",
    href: "/agents/events",
    endpoint: "/api/chat/event_agent"
  },
  {
    id: "tourism",
    name: "Guia Turístico",
    description: "Explore pontos turísticos e receba recomendações personalizadas",
    icon: MapPin,
    gradient: "from-emerald-500 to-teal-500",
    href: "/agents/tourism",
    endpoint: "/api/chat/tourism_agent"
  },
  {
    id: "transport",
    name: "Assistente de Mobilidade",
    description: "Informações sobre transporte público e mobilidade urbana",
    icon: Bus,
    gradient: "from-orange-500 to-red-500",
    href: "/agents/transport",
    endpoint: "/api/chat/transport_agent"
  },
  {
    id: "services",
    name: "Assistente de Serviços",
    description: "Ajuda com serviços municipais e documentação",
    icon: Building2,
    gradient: "from-cyan-500 to-blue-500",
    href: "/agents/services",
    endpoint: "/api/chat/services_agent"
  },
  {
    id: "education",
    name: "Guia Educacional",
    description: "Informações sobre escolas, universidades e cursos",
    icon: Book,
    gradient: "from-yellow-500 to-orange-500",
    href: "/agents/education",
    endpoint: "/api/chat/education_agent"
  },
  {
    id: "local",
    name: "Assistente Local",
    description: "Informações sobre comércio local e serviços próximos",
    icon: Search,
    gradient: "from-green-500 to-emerald-500",
    href: "/agents/local",
    endpoint: "/api/chat/local_agent"
  },
  {
    id: "faq",
    name: "FAQ Bot",
    description: "Respostas rápidas para perguntas frequentes",
    icon: Info,
    gradient: "from-violet-500 to-purple-500",
    href: "/agents/faq",
    endpoint: "/api/chat/faq_agent"
  }
];

export default function AgentsPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="bg-muted py-12">
        <div className="container px-4">
          <h1 className="text-3xl font-bold mb-4">Assistentes Especializados</h1>
          <p className="text-muted-foreground">
            Escolha um dos nossos assistentes virtuais especializados para ajudar você.
          </p>
        </div>
      </div>

      <div className="flex-1 container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={agent.href}>
                <Card className="p-6 h-full group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                  <div className="relative space-y-4">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-white/10">
                      <agent.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 