"use client";

import { Card } from "@/components/ui";
import {
  Baby,
  GraduationCap,
  Users,
  Briefcase,
  Heart,
  User,
  Accessibility,
  MapPin,
  Building2,
  PawPrint,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const userCategories = [
  {
    title: "Estudante",
    description: "Bolsas, transporte e auxílios estudantis",
    icon: GraduationCap,
    href: "/estudante",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Jovem",
    description: "Oportunidades e programas para juventude",
    icon: Users,
    href: "/jovem",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Criança",
    description: "Educação infantil e atividades",
    icon: Baby,
    href: "/crianca",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Idoso",
    description: "Assistência e programas para terceira idade",
    icon: Heart,
    href: "/idoso",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Mulher",
    description: "Apoio e serviços para mulheres",
    icon: User,
    href: "/mulher",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    title: "Empreendedor",
    description: "Apoio a negócios e microempresas",
    icon: Briefcase,
    href: "/empreendedor",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "PCD",
    description: "Acessibilidade e inclusão",
    icon: Accessibility,
    href: "/pcd",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Turista",
    description: "Informações turísticas e roteiros",
    icon: MapPin,
    href: "/turista",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Servidor",
    description: "Portal do servidor público",
    icon: Building2,
    href: "/servidor",
    gradient: "from-slate-500 to-gray-500",
  },
  {
    title: "Tutor de Pet",
    description: "Cuidados e serviços para animais",
    icon: PawPrint,
    href: "/tutor-pet",
    gradient: "from-orange-500 to-amber-500",
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

export function UserCategories() {
  // Split categories into two rows
  const firstRow = userCategories.slice(0, Math.ceil(userCategories.length / 2));
  const secondRow = userCategories.slice(Math.ceil(userCategories.length / 2));

  return (
    <section className="container px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Descubra os serviços para...</h2>
          <p className="text-muted-foreground">
            Encontre serviços específicos para seu perfil
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <ScrollArea className="w-full pb-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex gap-4 pb-4"
          >
            {firstRow.map((category) => (
              <motion.div 
                key={category.title} 
                variants={item}
                className="w-[250px] flex-shrink-0"
              >
                <Link href={category.href}>
                  <Card className="group relative h-full overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative p-6">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-xl bg-white/10 text-primary group-hover:text-white transition-colors">
                          <category.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm md:text-base mb-1 group-hover:text-white transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-xs text-muted-foreground group-hover:text-white/90 transition-colors line-clamp-2">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <ScrollBar orientation="horizontal" className="mt-2" />
        </ScrollArea>

        <ScrollArea className="w-full pb-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex gap-4 pb-4"
          >
            {secondRow.map((category) => (
              <motion.div 
                key={category.title} 
                variants={item}
                className="w-[250px] flex-shrink-0"
              >
                <Link href={category.href}>
                  <Card className="group relative h-full overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative p-6">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 rounded-xl bg-white/10 text-primary group-hover:text-white transition-colors">
                          <category.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm md:text-base mb-1 group-hover:text-white transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-xs text-muted-foreground group-hover:text-white/90 transition-colors line-clamp-2">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <ScrollBar orientation="horizontal" className="mt-2" />
        </ScrollArea>
      </div>
    </section>
  );
} 