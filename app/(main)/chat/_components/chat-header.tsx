"use client";

import { Button } from "@/components/ui";
import { Bot, MoreHorizontal, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

interface ChatHeaderProps {
  onReset: () => void;
  isConnected: boolean;
}

export function ChatHeader({ onReset, isConnected }: ChatHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 border-b"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold">Assistente de Eventos</h2>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <p className="text-sm text-muted-foreground">
              {isConnected ? 'Online' : 'Conectando...'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          title="Reiniciar conversa"
        >
          <RefreshCcw className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
} 