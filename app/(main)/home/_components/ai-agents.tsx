'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { agents } from '@/lib/agents'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export function AIAgents() {
  return (
    <section className="py-24">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">Assistentes Virtuais</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nossa equipe de agentes inteligentes está pronta para ajudar você 24/7 
              com informações personalizadas e suporte dedicado
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link 
                href={`/chat/${agent.id}`}
                className="block group"
              >
                <Card className="relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                        <AvatarImage src={agent.avatar} alt={agent.name} />
                        <AvatarFallback>{agent.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-white transition-colors">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors">
                          {agent.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors">
                      {agent.description}
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-sm text-primary group-hover:text-white transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>Iniciar conversa</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 