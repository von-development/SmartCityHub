"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight, MapPin, Calendar, FileText, LucideIcon } from "lucide-react"
import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { cn } from "@/utils/utils"

interface HighlightItem {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
  bgColor: string
}

const highlights: HighlightItem[] = [
  {
    title: "Eventos",
    description: "Descubra eventos e atividades acontecendo em Aveiro",
    icon: Calendar,
    href: "/events",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    title: "Serviços",
    description: "Acesse serviços municipais e documentação",
    icon: FileText,
    href: "/services",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
  },
  {
    title: "Locais",
    description: "Explore pontos turísticos e locais importantes",
    icon: MapPin,
    href: "/map",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function FeaturedHighlights() {
  return (
    <section className="container px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Destaques</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Acesse os principais recursos da plataforma
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {highlights.map((highlight) => {
          const Icon = highlight.icon
          return (
            <motion.div key={highlight.title} variants={itemVariants}>
              <Link href={highlight.href}>
                <Card className="group relative border-none shadow-none hover:shadow-xl transition-all duration-300">
                  <div className={cn(
                    "p-6 flex items-start gap-4",
                    highlight.bgColor,
                    "rounded-2xl"
                  )}>
                    <div className={cn(
                      "p-3 rounded-xl bg-white dark:bg-black/10",
                      highlight.color,
                      "transition-transform group-hover:scale-110 duration-300"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className={cn(
                        "font-semibold text-lg",
                        highlight.color
                      )}>
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {highlight.description}
                      </p>
                      <div className={cn(
                        "flex items-center text-sm font-medium gap-1",
                        highlight.color,
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      )}>
                        <span>Saber mais</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

