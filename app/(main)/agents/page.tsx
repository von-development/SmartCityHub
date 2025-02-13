"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const agents = [
  {
    id: "test",
    name: "Assistente Beta",
    description: "Nosso assistente em fase de testes, ajudando a melhorar a experiência para todos os usuários.",
    icon: "/chat/man_wb.svg",
    gradient: "from-gray-500 to-gray-700",
    href: "/agents/test",
    endpoint: "/api/chat/agents"
  },
  {
    id: "events",
    name: "Ana - Guia de Eventos",
    description: "Descubra os melhores eventos em Aveiro! De festivais culturais a shows, mantenha-se atualizado sobre tudo que acontece na cidade.",
    icon: "/chat/women_bb.svg",
    gradient: "from-purple-500 to-pink-500",
    href: "/agents/events",
    endpoint: "/api/chat/event_agent"
  },
  {
    id: "tourism",
    name: "Pedro - Guia Turístico",
    description: "Explore o melhor de Aveiro com dicas personalizadas de passeios, pontos turísticos e experiências únicas na Veneza portuguesa.",
    icon: "/chat/man_bw.svg",
    gradient: "from-emerald-500 to-teal-500",
    href: "/agents/tourism",
    endpoint: "/api/chat/tourism_agent"
  },
  {
    id: "transport",
    name: "Maria - Assistente de Mobilidade",
    description: "Navegue pela cidade com facilidade! Informações em tempo real sobre ônibus, horários e melhores rotas para seu destino.",
    icon: "/chat/women_bbg.svg",
    gradient: "from-orange-500 to-red-500",
    href: "/agents/transport",
    endpoint: "/api/chat/transport_agent"
  },
  {
    id: "services",
    name: "João - Serviços Municipais",
    description: "Seu guia completo para serviços públicos em Aveiro. Documentação, processos e informações municipais de forma simples e clara.",
    icon: "/chat/man_ww.svg",
    gradient: "from-cyan-500 to-blue-500",
    href: "/agents/services",
    endpoint: "/api/chat/services_agent"
  },
  {
    id: "education",
    name: "Sofia - Guia Educacional",
    description: "Descubra oportunidades educacionais em Aveiro! Informações sobre escolas, universidades, cursos e programas educacionais.",
    icon: "/chat/women_cwb.svg",
    gradient: "from-yellow-500 to-orange-500",
    href: "/agents/education",
    endpoint: "/api/chat/education_agent"
  },
  {
    id: "local",
    name: "Miguel - Guia Local",
    description: "Conheça o melhor do comércio local! Restaurantes, lojas, serviços e dicas exclusivas dos melhores lugares da cidade.",
    icon: "/chat/man_bb.svg",
    gradient: "from-green-500 to-emerald-500",
    href: "/agents/local",
    endpoint: "/api/chat/local_agent"
  },
  {
    id: "faq",
    name: "Clara - Assistente Rápido",
    description: "Respostas instantâneas para suas dúvidas mais comuns sobre Aveiro. Informações rápidas e precisas quando você precisa.",
    icon: "/chat/women_bb.svg",
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
          <h1 className="text-3xl font-bold mb-4">Seus Assistentes Pessoais</h1>
          <p className="text-muted-foreground text-lg">
            Conheça nossa equipe de assistentes virtuais, cada um especializado em tornar sua experiência em Aveiro ainda melhor.
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
                <Card className="p-6 h-full group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-95 transition-all duration-300`} />
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-2xl bg-primary/10 w-fit group-hover:bg-white/10 transition-all duration-300">
                        <Image
                          src={agent.icon}
                          alt={agent.name}
                          width={48}
                          height={48}
                          className="group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-xl group-hover:text-white transition-colors">
                        {agent.name}
                      </h3>
                    </div>
                    <div className="pl-16">
                      <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors leading-relaxed">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white/90 text-sm">Clique para conversar →</span>
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