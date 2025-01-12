'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

const issues = [
  {
    title: 'Experiência Desconexa',
    description: 'Usuários precisam navegar entre diferentes plataformas para realizar tarefas relacionadas'
  },
  {
    title: 'Duplicação de Esforços',
    description: 'Mesmas informações mantidas em diferentes sistemas'
  },
  {
    title: 'Inconsistência de Dados',
    description: 'Informações podem variar entre as plataformas'
  },
  {
    title: 'Barreira de Acesso',
    description: 'Múltiplas interfaces e formas de autenticação'
  }
]

export function Conclusion() {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1800px] mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold tracking-tight flex items-center gap-4 mb-16"
        >
          <div className="p-2 rounded-xl bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500">
            Conclusão da Análise
          </span>
        </motion.h2>

        <div className="space-y-12">
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            Esta análise detalhada das plataformas existentes revela um ecossistema digital fragmentado, 
            onde cada serviço opera de forma isolada, resultando em:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {issues.map((issue, index) => (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-red-500 transition-colors mb-3">
                    {issue.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {issue.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl"
          >
            <p className="text-lg text-red-500 font-medium">
              Estas limitações reforçam a necessidade de uma solução integrada como o SmartCity Hub, 
              que possa unificar estes serviços em uma única plataforma intuitiva e eficiente.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 