'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Building2, ArrowRight, Globe } from 'lucide-react'
import Image from 'next/image'

const cities = [
  {
    name: 'Amsterdã',
    country: 'Holanda',
    description: 'Pioneira em soluções smart city, Amsterdã implementou uma plataforma digital que integra serviços municipais, mobilidade inteligente e participação cidadã. A cidade utiliza IoT e IA para melhorar a qualidade de vida dos cidadãos.',
    image: 'https://images.unsplash.com/photo-1584003564911-a5a0d74c8c8b',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Barcelona',
    country: 'Espanha',
    description: 'Com seu projeto Barcelona Digital City, implementou uma plataforma que centraliza serviços públicos, dados abertos e participação cidadã. A cidade é referência em inovação urbana e governança digital.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    name: 'Singapura',
    country: 'Singapura',
    description: 'Através do projeto Smart Nation, Singapura desenvolveu uma plataforma que integra serviços governamentais, transporte público e segurança. A cidade é exemplo em uso de tecnologia para gestão urbana.',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170',
    gradient: 'from-emerald-500 to-teal-500'
  }
]

export function CityExamples() {
  return (
    <section className="w-full py-24 bg-zinc-50">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm hover:bg-primary/20 transition-colors">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Casos de Sucesso</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Por que Smart City Hub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Diversas cidades ao redor do mundo já implementaram soluções similares 
              e colhem os benefícios da transformação digital
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="relative overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${city.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                <div className="relative p-6 space-y-4">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-6">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                      <h3 className="font-semibold text-lg group-hover:text-white transition-colors">
                        {city.name}, {city.country}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors">
                      {city.description}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-2 text-sm text-primary group-hover:text-white transition-colors">
                    <span>Saiba mais</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 