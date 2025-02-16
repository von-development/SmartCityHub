"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Calendar, FileText, Bot, ArrowRight, Briefcase, Book, Bus, Home } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Bolsas de Estudo",
    description: "Encontre bolsas de estudo disponíveis e saiba como se candidatar",
    icon: GraduationCap,
    href: "/estudante/bolsas",
    gradient: "from-blue-500 to-indigo-500",
    color: "text-blue-500"
  },
  {
    title: "Estágios",
    description: "Oportunidades de estágio em empresas e instituições",
    icon: Briefcase,
    href: "/estudante/estagios",
    gradient: "from-purple-500 to-pink-500",
    color: "text-purple-500"
  },
  {
    title: "Biblioteca Municipal",
    description: "Acesse o catálogo e serviços da biblioteca",
    icon: Book,
    href: "/estudante/biblioteca",
    gradient: "from-emerald-500 to-teal-500",
    color: "text-emerald-500"
  },
  {
    title: "Transporte Estudantil",
    description: "Informações sobre passes e descontos no transporte",
    icon: Bus,
    href: "/estudante/transporte",
    gradient: "from-orange-500 to-red-500",
    color: "text-orange-500"
  },
  {
    title: "Moradia Estudantil",
    description: "Encontre opções de moradia e residências estudantis",
    icon: Home,
    href: "/estudante/moradia",
    gradient: "from-cyan-500 to-blue-500",
    color: "text-cyan-500"
  }
];

const events = [
  {
    title: "O Inspetor Rasto",
    date: "15 Mar 2024",
    description: "Teatro infantil com o Inspetor Rasto em uma aventura emocionante",
    image: "/img/events/inspetor_rasto_divulgacao_1_600_1067.png",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    title: "Festas São Gonçalinho",
    date: "22 Mar 2024",
    description: "Celebração tradicional com música, dança e gastronomia local",
    image: "/img/events/cartaz_festas_sgoncalinho_1_600_1067.jpg",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "BMI Hospital",
    date: "1-5 Abr 2024",
    description: "Evento especial no Hospital com atividades e palestras",
    image: "/img/events/bmi_hospital_1_600_1067.jpg",
    gradient: "from-green-500 to-emerald-500"
  }
];

export default function EstudantePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-500/10 to-transparent py-12">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4" variant="secondary">
              Área do Estudante
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Tudo que você precisa para sua vida acadêmica
            </h1>
            <p className="text-muted-foreground text-lg">
              Acesse serviços, eventos e informações exclusivas para estudantes em Aveiro
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container px-4">
          <h2 className="text-2xl font-bold mb-6">Serviços para Estudantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card className="group p-6 h-full hover:shadow-lg transition-all duration-300">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-xl ${service.color} bg-primary/5 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - Updated */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-2xl font-bold mb-6">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-[300px] w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm"
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      {event.date}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Card - Updated */}
      <section className="py-12">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-5 transition-all duration-300" />
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/chat/man_ww.svg"
                      alt="AI Assistant"
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Assistente Virtual para Estudantes</h3>
                    <p className="text-muted-foreground max-w-2xl">
                      Tire suas dúvidas sobre serviços estudantis, bolsas, eventos e mais. 
                      Nosso assistente está disponível 24/7 para ajudar você.
                    </p>
                    <Link 
                      href="/agents/education"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      <span>Conversar com o assistente</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 