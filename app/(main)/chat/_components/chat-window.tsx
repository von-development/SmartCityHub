"use client";

import { Card } from "@/components/ui";
import { Message } from "@/types/chat";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { ChatHeader } from "./chat-header";
import { useState, useRef, useEffect } from "react";
import { askAboutEvents } from "@/lib/api/events";
import { nanoid } from "nanoid";
import { motion, AnimatePresence } from "framer-motion";

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Eu sou o assistente de eventos de Aveiro. Como posso ajudar você hoje?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate connection status
    setIsConnected(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleReset() {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Olá! Eu sou o assistente de eventos e noticias de Aveiro. Como posso ajudar você hoje?',
        timestamp: new Date(),
      },
    ]);
  }

  async function handleSendMessage(content: string) {
    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await askAboutEvents(content);
      console.log('API Response:', response);

      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      };
      console.log('Assistant Message:', assistantMessage);
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: 'Desculpe, tive um problema ao processar sua pergunta. Pode tentar novamente?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="flex flex-col h-[600px] border-2">
      <ChatHeader onReset={handleReset} isConnected={isConnected} />
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent hover:scrollbar-thumb-primary/20">
        <AnimatePresence>
          <ChatMessages messages={messages} />
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <motion.div 
        className="border-t p-4 bg-muted/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </motion.div>
    </Card>
  );
} 