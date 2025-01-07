"use client";

import { Info, Calendar, Newspaper, Link2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function ResumoSection({ children }: SectionProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="bg-gradient-to-br from-background to-primary/5 rounded-lg p-4 border border-primary/10 shadow-sm"
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-primary mb-3">
        <div className="bg-primary/10 p-1.5 rounded-md">
          <Info className="w-4 h-4" />
        </div>
        Resumo
      </h3>
      <div className="text-sm text-foreground leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}

export function EventosSection({ children }: SectionProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="bg-background rounded-lg p-4 border shadow-sm overflow-hidden"
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-primary mb-4">
        <div className="bg-primary/10 p-1.5 rounded-md">
          <Calendar className="w-4 h-4" />
        </div>
        Eventos em Destaque
      </h3>
      <div className="space-y-4 relative">
        <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="relative">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function NoticiasSection({ children }: SectionProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="bg-muted/30 rounded-lg p-4 border border-muted shadow-sm"
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-primary mb-3">
        <div className="bg-primary/10 p-1.5 rounded-md">
          <Newspaper className="w-4 h-4" />
        </div>
        Notícias Relacionadas
      </h3>
      <div className="space-y-2 relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-full" />
        {children}
      </div>
    </motion.div>
  );
}

export function LinksSection({ children }: SectionProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="bg-muted/20 rounded-lg p-4 border border-muted shadow-sm"
    >
      <h3 className="flex items-center gap-2 text-base font-semibold text-primary mb-3">
        <div className="bg-primary/10 p-1.5 rounded-md">
          <Link2 className="w-4 h-4" />
        </div>
        Links Úteis
      </h3>
      <div className="space-y-2 divide-y divide-border">
        {children}
      </div>
    </motion.div>
  );
}

// Add a component for event items
export function EventItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-6 relative">
      <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-primary/10 border-2 border-primary" />
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
} 