'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Construction, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
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
          className="flex justify-center"
        >
          <Construction className="h-24 w-24 text-primary" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            Ops! Página em Construção
          </h1>
          <p className="text-muted-foreground text-lg">
            Estamos trabalhando duro para trazer novidades! Esta página ainda está sendo 
            desenvolvida, mas você pode explorar outras áreas do site enquanto isso.
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Coffee className="h-5 w-5" />
            <span>Volte em breve para conferir as novidades!</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline" size="lg" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para a página inicial
            </Button>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="text-[12rem] font-bold text-primary opacity-5">
            404
          </div>
        </div>
      </motion.div>
    </div>
  )
} 