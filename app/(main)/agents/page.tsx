"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const agents = [
  {
    id: "test",
    name: "Assistente Beta",
    description: "Nosso assistente em fase de testes, ajudando a melhorar a experiência para todos os usuários.",
    icon: "/chat/man_wb.svg",
    gradient: "from-gray-500 to-gray-700",
    href: "/agents/test",
    endpoint: "/api/chat/agents",
    category: "Beta",
    categoryColor: "text-gray-500",
    status: "beta"
  },
  {
    id: "events",
    name: "Ana - Guia de Eventos e Notícias",
    description: "Descubra os melhores eventos e notícias em Aveiro! De festivais culturais a shows, mantenha-se atualizado sobre tudo que acontece na cidade.",
    icon: "/chat/women_bb.svg",
    gradient: "from-purple-500 to-pink-500",
    href: "/agents/events",
    endpoint: "/api/chat/event_agent",
    category: "Eventos & Notícias",
    categoryColor: "text-purple-500",
    status: "active"
  },
  {
    id: "tourism",
    name: "Pedro - Guia Turístico",
    description: "Explore o melhor de Aveiro com dicas personalizadas de passeios, pontos turísticos e experiências únicas na Veneza portuguesa.",
    icon: "/chat/man_bw.svg",
    gradient: "from-emerald-500 to-teal-500",
    href: "/agents/tourism",
    endpoint: "/api/chat/tourism_agent",
    category: "Turismo",
    categoryColor: "text-emerald-500",
    status: "active"
  },
  {
    id: "transport",
    name: "Maria - Assistente de Mobilidade",
    description: "Navegue pela cidade com facilidade! Informações em tempo real sobre ônibus, horários e melhores rotas para seu destino.",
    icon: "/chat/women_bbg.svg",
    gradient: "from-orange-500 to-red-500",
    href: "/agents/transport",
    endpoint: "/api/chat/transport_agent",
    category: "Mobilidade",
    categoryColor: "text-orange-500",
    status: "development"
  },
  {
    id: "services",
    name: "João - Serviços Municipais",
    description: "Seu guia completo para serviços públicos em Aveiro. Documentação, processos e informações municipais de forma simples e clara.",
    icon: "/chat/man_ww.svg",
    gradient: "from-cyan-500 to-blue-500",
    href: "/agents/services",
    endpoint: "/api/chat/services_agent",
    category: "Serviços Públicos",
    categoryColor: "text-cyan-500",
    status: "active"
  },
  {
    id: "education",
    name: "Sofia - Guia Educacional",
    description: "Descubra oportunidades educacionais em Aveiro! Informações sobre escolas, universidades, cursos e programas educacionais.",
    icon: "/chat/women_cwb.svg",
    gradient: "from-yellow-500 to-orange-500",
    href: "/agents/education",
    endpoint: "/api/chat/education_agent",
    category: "Educação",
    categoryColor: "text-yellow-500",
    status: "development"
  },
  {
    id: "local",
    name: "Miguel - Guia Local",
    description: "Conheça o melhor do comércio local! Restaurantes, lojas, serviços e dicas exclusivas dos melhores lugares da cidade.",
    icon: "/chat/man_bb.svg",
    gradient: "from-green-500 to-emerald-500",
    href: "/agents/local",
    endpoint: "/api/chat/local_agent",
    category: "Comércio Local",
    categoryColor: "text-green-500",
    status: "development"
  },
  {
    id: "faq",
    name: "Clara - Assistente Rápido",
    description: "Respostas instantâneas para suas dúvidas mais comuns sobre Aveiro. Informações rápidas e precisas quando você precisa.",
    icon: "/chat/women_bb.svg",
    gradient: "from-violet-500 to-purple-500",
    href: "/agents/faq",
    endpoint: "/api/chat/faq_agent",
    category: "FAQ",
    categoryColor: "text-violet-500",
    status: "development"
  }
];

export default function AgentsPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      

      <div className="flex-1 container px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={agent.href}>
                <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
                  <div className="flex items-start p-5 gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-xl bg-primary/5 w-fit group-hover:bg-white/10 transition-all duration-300">
                        <Image 
                          src={agent.icon}
                          alt={agent.name}
                          width={52}
                          height={52}
                          className="group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {agent.name}
                          </h3>
                          <span className={`text-sm ${agent.categoryColor} font-medium`}>
                            {agent.category}
                          </span>
                        </div>
                        
                        {agent.status === "development" && (
                          <div className="rounded-full px-3 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                            Em Desenvolvimento
                          </div>
                        )}
                        {agent.status === "beta" && (
                          <div className="rounded-full px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-600 border border-purple-500/20">
                            Beta
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {agent.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 self-center">
                      <div className="rounded-full p-1.5 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300">
                        <svg 
                          className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className={`absolute inset-0 bg-gradient-to-r ${agent.gradient} opacity-0 group-hover:opacity-5 transition-all duration-300`} />
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 