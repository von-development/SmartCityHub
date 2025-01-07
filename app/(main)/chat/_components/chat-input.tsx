"use client";

import { Button } from "@/components/ui";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { ChatSuggestions } from "./chat-suggestions";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(suggestion: string) {
    onSendMessage(suggestion);
    setShowSuggestions(false);
  }

  return (
    <div className="space-y-4">
      {showSuggestions && (
        <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Pergunte sobre eventos em Aveiro..."
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
} 