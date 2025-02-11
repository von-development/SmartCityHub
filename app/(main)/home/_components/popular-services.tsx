"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Car, Building2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

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
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function PopularServices() {
  return (
    <section className="container px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Serviços mais acessados</h2>
        <p className="text-muted-foreground text-sm sm:text-base">Acesse rapidamente os serviços mais utilizados</p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {popularServices.map((service) => (
          <motion.div key={service.title} variants={item} className="h-full">
            <Link href={service.href} className="block h-full">
              <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <CardHeader className="relative p-4">
                  <div className="p-2.5 rounded-xl bg-white/10 text-primary group-hover:text-white transition-colors w-fit">
                    <service.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent className="relative pt-0 px-4 pb-4">
                  <CardTitle className="font-semibold text-base mb-1.5 group-hover:text-white transition-colors">
                    {service.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground group-hover:text-white/90 transition-colors">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

