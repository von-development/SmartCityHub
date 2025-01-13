"use client";

import { Card } from "@/components/ui";
import { ArrowRight, MapPin, Calendar, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const highlights = [
  {
    title: "Eventos",
    description: "Descubra eventos e atividades acontecendo em Aveiro",
    icon: Calendar,
    href: "/events",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Serviços",
    description: "Acesse serviços municipais e documentação",
    icon: FileText,
    href: "/services",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Locais",
    description: "Explore pontos turísticos e locais importantes",
    icon: MapPin,
    href: "/map",
    gradient: "from-purple-500 to-pink-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeaturedHighlights() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {highlights.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div key={item.title} variants={itemVariants}>
            <Link href={item.href}>
              <Card className="p-6 group hover:shadow-lg transition-all">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.gradient} text-white mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Saber mais</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
} 