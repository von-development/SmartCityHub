"use client";

import { Card } from "@/components/ui/card"; 
import { MapPin, Car, Building2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const popularServices = [
  {
    title: "Zonas e tarifas de estacionamento",
    description: "Consulte zonas e valores de estacionamento na cidade",
    icon: Car,
    href: "/estacionamento",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "GeoPortal Municipal",
    description: "Acesse mapas e informações geográficas do município",
    icon: MapPin,
    href: "/geoportal",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Tarifário de Resíduos Urbanos",
    description: "Informações sobre taxas e serviços de resíduos",
    icon: Building2,
    href: "/residuos",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Ecocentro Municipal",
    description: "Horários e informações sobre o ecocentro",
    icon: Building2,
    href: "/ecocentro",
    gradient: "from-purple-500 to-pink-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function PopularServices() {
  return (
    <section className="container px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Serviços mais acessados</h2>
          <p className="text-muted-foreground">
            Acesse rapidamente os serviços mais utilizados
          </p>
        </div>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {popularServices.map((service) => (
          <motion.div key={service.title} variants={item}>
            <Link href={service.href}>
              <Card className="group relative h-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative p-6">
                  <div className="flex flex-col gap-4">
                    <div className="p-3 rounded-xl bg-white/10 text-primary group-hover:text-white transition-colors">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 