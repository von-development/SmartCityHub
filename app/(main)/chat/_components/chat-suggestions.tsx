"use client";

import { Button } from "@/components/ui";
import { motion } from "framer-motion";

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  "Que eventos há este fim de semana?",
  "Existem festivais de música próximos?",
  "Há eventos culturais este mês?",
];

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mb-4"
    >
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </motion.div>
  );
} 