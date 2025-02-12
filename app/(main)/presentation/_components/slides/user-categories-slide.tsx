'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const personas = [
  {
    image: "/personas/student.svg",
    question: "Quais incetinvos o o municipio oferece para os estudantes?",
    description: "Esudantes",
    gradient: "from-blue-500/20 to-indigo-500/20",
    delay: 0.2
  },
  {
    image: "/personas/tourist.svg",
    question: "O que devo visitar em aveiro?",
    description: "Turistas",
    gradient: "from-emerald-500/20 to-teal-500/20",
    delay: 0.4
  },
  {
    image: "/personas/localtraffic.svg",
    question: "Como está o trânsito? Há obras na via?",
    description: "Locais",
    gradient: "from-yellow-500/20 to-amber-500/20",
    delay: 0.6
  },
  {
    image: "/personas/elder.svg",
    question: "Como eu emito uma licenca para construcao civil? quais documentos necessarios?",
    description: "Empreendedores",
    gradient: "from-purple-500/20 to-pink-500/20",
    delay: 0.8
  },
  {
    image: "/personas/resident.svg",
    question: "Quais eventos irao acontecer em aveiro este final de semena?",
    description: "Jovens",
    gradient: "from-rose-500/20 to-pink-500/20",
    delay: 1.0
  }
]

export function UserCategoriesSlide() {
  return (
    <div className={cn(
      "w-full max-w-[85vw] aspect-video rounded-2xl overflow-hidden",
      "bg-gradient-to-br from-zinc-900 to-zinc-800 relative"
    )}>
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] opacity-[0.015]" />

      <div className="relative h-full flex flex-col px-[8%] py-[6%]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold text-white/90 mb-12 text-center"
        >
          Para Quem é o Aveiro Connect?
        </motion.h2>

        <div className="flex-1 grid grid-cols-5 gap-6 items-center px-4">
          {personas.map((persona) => (
            <motion.div
              key={persona.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: persona.delay }}
              className={cn(
                "flex flex-col items-center p-6 rounded-2xl h-full",
                "bg-gradient-to-br border border-white/5",
                persona.gradient
              )}
            >
              {/* Question Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: persona.delay + 0.3 }}
                className="mb-6"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <p className="text-sm text-white/90 text-center leading-snug">
                    {persona.question}
                  </p>
                </div>
              </motion.div>

              {/* Persona Image */}
              <div className="relative mb-6">
                <img 
                  src={persona.image}
                  alt={persona.description}
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: persona.delay + 0.4 }}
                className="text-sm text-white/70 text-center mt-auto"
              >
                {persona.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 