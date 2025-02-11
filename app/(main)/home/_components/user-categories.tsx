"use client";

import { Card } from "@/components/ui/card";
import { Baby, GraduationCap, Users, Briefcase, Heart, User, Accessibility, MapPin, Building2, PawPrint, LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { cn } from "@/utils/utils";

interface UserCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  color: string;
}

const userCategories: UserCategory[] = [
  {
    title: "Estudante",
    description: "Bolsas, transporte e auxílios estudantis",
    icon: GraduationCap,
    href: "/estudante",
    gradient: "from-blue-500 to-indigo-500",
    color: "text-blue-600",
  },
  {
    title: "Jovem",
    description: "Oportunidades e programas para juventude",
    icon: Users,
    href: "/jovem",
    gradient: "from-indigo-500 to-purple-500",
    color: "text-indigo-600",
  },
  {
    title: "Criança",
    description: "Educação infantil e atividades",
    icon: Baby,
    href: "/crianca",
    gradient: "from-pink-500 to-rose-500",
    color: "text-pink-600",
  },
  {
    title: "Idoso",
    description: "Assistência e programas para terceira idade",
    icon: Heart,
    href: "/idoso",
    gradient: "from-amber-500 to-orange-500",
    color: "text-orange-600",
  },
  {
    title: "Mulher",
    description: "Apoio e serviços para mulheres",
    icon: User,
    href: "/mulher",
    gradient: "from-rose-500 to-pink-500",
    color: "text-pink-600",
  },
  {
    title: "Empreendedor",
    description: "Apoio a negócios e microempresas",
    icon: Briefcase,
    href: "/empreendedor",
    gradient: "from-emerald-500 to-teal-500",
    color: "text-teal-600",
  },
  {
    title: "PCD",
    description: "Acessibilidade e inclusão",
    icon: Accessibility,
    href: "/pcd",
    gradient: "from-violet-500 to-purple-500",
    color: "text-purple-600",
  },
  {
    title: "Turista",
    description: "Informações turísticas e roteiros",
    icon: MapPin,
    href: "/turista",
    gradient: "from-cyan-500 to-blue-500",
    color: "text-cyan-600",
  },
  {
    title: "Servidor",
    description: "Portal do servidor público",
    icon: Building2,
    href: "/servidor",
    gradient: "from-slate-500 to-gray-500",
    color: "text-gray-600",
  },
  {
    title: "Tutor de Pet",
    description: "Cuidados e serviços para animais",
    icon: PawPrint,
    href: "/tutor-pet",
    gradient: "from-orange-500 to-amber-500",
    color: "text-amber-600",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function UserCategories() {
  return (
    <section className="container px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Descubra os serviços para...</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Encontre serviços específicos para seu perfil
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
      >
        {userCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div key={category.title} variants={itemVariants}>
              <Link href={category.href} className="block h-full">
                <Card className={cn(
                  "group relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg",
                  "border-2",
                  category.color.replace('text-', 'border-'),
                )}>
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-300",
                      category.gradient
                    )}
                  />
                  <div className="relative p-3 flex flex-col items-center text-center">
                    <div className={cn(
                      "p-0.5 rounded-full mb-2",
                      category.color.replace('text-', 'bg-'),
                      "group-hover:opacity-100 transition-all duration-300"
                    )}>
                      <div className="p-3 rounded-full bg-background group-hover:bg-white/10 transition-colors duration-300">
                        <Icon className={cn(
                          "h-5 w-5",
                          category.color,
                          "group-hover:text-white transition-colors duration-300"
                        )} />
                      </div>
                    </div>
                    <h3 className="font-medium text-sm mb-1 group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground group-hover:text-white/90 transition-colors line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
