"use client";

import { Card } from "@/components/ui";
import { FileText, MapPin, Car, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const highlights = [
  {
    title: "Concursos para ocupação de espaços",
    description: "Feira de Março 2025",
    icon: FileText,
    href: "/concursos",
    gradient: "from-orange-400 to-pink-400",
  },
  {
    title: "Boas Festas em Aveiro 2024",
    description: "1 dez 2024 a 13 jan 2025",
    icon: Calendar,
    href: "/eventos",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    title: "Publicações Municipais",
    description: "Boletim Municipal | AveiroOn | TA",
    icon: FileText,
    href: "/publicacoes",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    title: "Animais de Companhia",
    description: "Adoção",
    icon: Car,
    href: "/animais",
    gradient: "from-blue-400 to-indigo-400",
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

export function FeaturedHighlights() {
  return (
    <section className="container px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Em destaque</h2>
          <p className="text-muted-foreground">
            Confira os principais destaques e novidades
          </p>
        </div>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {highlights.map((item) => (
          <motion.div key={item.title} variants={item}>
            <Link href={item.href}>
              <Card className="group relative h-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative p-6">
                  <div className="flex flex-col gap-4">
                    <div className="p-3 rounded-xl bg-white/10 text-primary group-hover:text-white transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-lg group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors">
                        {item.description}
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