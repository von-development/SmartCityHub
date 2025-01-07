"use client";

import { Card } from "@/components/ui";
import {
  Building2,
  FileText,
  Users,
  Briefcase,
  Trees,
  GraduationCap,
  Home,
  Bus,
  Heart,
  Landmark,
  Bike,
  Ticket,
  PawPrint,
  Building,
  Scale,
  Megaphone,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui";

const categories = [
  {
    title: "Administração Pública",
    description: "Serviços e informações administrativas",
    icon: Building2,
    href: "/admin",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Cultura e Lazer",
    description: "Eventos culturais e atividades recreativas",
    icon: Landmark,
    href: "/cultura",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "Esporte e Bem-Estar",
    description: "Atividades esportivas e saúde",
    icon: Bike,
    href: "/esporte",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Meio Ambiente",
    description: "Sustentabilidade e preservação",
    icon: Trees,
    href: "/ambiente",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Pessoa Jurídica",
    description: "Serviços para empresas e autônomos",
    icon: Briefcase,
    href: "/juridica",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Qualificação",
    description: "Cursos e oportunidades",
    icon: GraduationCap,
    href: "/qualificacao",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Animais",
    description: "Cuidados e proteção animal",
    icon: PawPrint,
    href: "/animais",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Desenvolvimento",
    description: "Desenvolvimento econômico",
    icon: Building,
    href: "/desenvolvimento",
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "Imóveis",
    description: "Serviços imobiliários",
    icon: Home,
    href: "/imoveis",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Mobilidade",
    description: "Transporte e circulação",
    icon: Bus,
    href: "/mobilidade",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Saúde",
    description: "Serviços de saúde",
    icon: Heart,
    href: "/saude",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    title: "Transparência",
    description: "Acesso à informação",
    icon: FileText,
    href: "/transparencia",
    gradient: "from-slate-500 to-gray-500",
  },
  {
    title: "Cidadania",
    description: "Direitos e serviços ao cidadão",
    icon: Users,
    href: "/cidadania",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Licenças",
    description: "Alvarás e autorizações",
    icon: Scale,
    href: "/licencas",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Ouvidoria",
    description: "Denúncias e reclamações",
    icon: Megaphone,
    href: "/ouvidoria",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Serviços Urbanos",
    description: "Manutenção e zeladoria",
    icon: Wrench,
    href: "/urbanos",
    gradient: "from-emerald-500 to-green-500",
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

export function ServiceCategories() {
  // Split categories into two rows
  const firstRow = categories.slice(0, Math.ceil(categories.length / 2));
  const secondRow = categories.slice(Math.ceil(categories.length / 2));

  return (
    <section className="container px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Categorias de serviços</h2>
          <p className="text-muted-foreground">
            Explore todos os serviços disponíveis por categoria
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