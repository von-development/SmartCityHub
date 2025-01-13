'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Search } from 'lucide-react'
import { Button } from '@/components/ui'

export default function EventsNotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-8 bg-gradient-to-b from-background to-muted">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 max-w-2xl mx-auto"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          <Calendar className="h-16 w-16 text-primary" />
          <Search className="h-16 w-16 text-primary" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            Evento Não Encontrado
          </h1>
          <p className="text-muted-foreground text-lg">
            Não conseguimos encontrar o evento que você está procurando. Ele pode ter sido 
            removido ou o link pode estar incorreto.
          </p>
          <p className="text-sm text-muted-foreground">
            Que tal explorar outros eventos interessantes em nossa agenda?
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/events">
            <Button variant="outline" size="lg" className="gap-2">
              <Calendar className="h-4 w-4" />
              Ver todos os eventos
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="lg" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Página inicial
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
} 