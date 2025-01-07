"use client";

import { Message } from "@/types/chat";
import { motion } from "framer-motion";
import { Bot, User, ExternalLink, Info, Calendar, Newspaper, Link2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Card } from "@/components/ui";
import { ResumoSection, EventosSection, NoticiasSection, LinksSection, EventItem } from './sections';

interface ChatMessagesProps {
  messages: Message[];
}

function getSourceIcon(url: string) {
  try {
    const domain = new URL(url).hostname;
    if (domain.includes('cm-aveiro')) return 'Câmara Municipal';
    if (domain.includes('aveiro2024')) return 'Aveiro 2024';
    if (domain.includes('noticiasdeaveiro')) return 'Notícias';
    if (domain.includes('diarioaveiro')) return 'Diário';
    return 'Link';
  } catch {
    return 'Link';
  }
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex gap-3 ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.role === 'assistant' && (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
          )}
          <div className={`flex flex-col gap-3 max-w-[85%] ${
            message.role === 'user' ? 'items-end' : 'items-start'
          }`}>
            <Card className={`p-4 w-full ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground border-0' 
                : 'bg-background border'
            }`}>
              {message.role === 'assistant' ? (
                <ReactMarkdown
                  components={{
                    h3: ({ children }) => {
                      const content = String(children);
                      if (content.includes('Resumo')) {
                        return <ResumoSection>{children}</ResumoSection>;
                      }
                      if (content.includes('Eventos')) {
                        return <EventosSection>{children}</EventosSection>;
                      }
                      if (content.includes('Notícias')) {
                        return <NoticiasSection>{children}</NoticiasSection>;
                      }
                      if (content.includes('Links')) {
                        return <LinksSection>{children}</LinksSection>;
                      }
                      return <div>{children}</div>;
                    },
                    p: ({ children }) => (
                      <p className="text-sm text-foreground leading-relaxed mb-4 last:mb-0">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-medium text-primary">
                        {children}
                      </strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-2 mb-4 last:mb-0 ml-2">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <EventItem>
                        <div className="flex items-start gap-2 text-sm text-foreground">
                          <span className="flex-1">{children}</span>
                        </div>
                      </EventItem>
                    ),
                    a: ({ href, children }) => {
                      if (!href) return <span>{children}</span>;
                      
                      return (
                        <a 
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm px-2 py-1.5 -mx-2 rounded hover:bg-primary/5 text-primary transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                          <span className="flex-1">{children}</span>
                          <span className="text-xs text-muted-foreground">
                            {getSourceIcon(href)}
                          </span>
                        </a>
                      );
                    },
                  }}
                  className="space-y-6"
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </Card>
          </div>
          {message.role === 'user' && (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
} 