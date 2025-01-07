"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Agent, Message } from "@/types";

export function ChatInterface({ agent }: { agent: Agent }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: agent.greeting },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    
    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "This is a placeholder response. The actual AI integration will be implemented later." 
        },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="container px-4 max-w-4xl mx-auto">
      <Card className="h-[calc(100vh-12rem)]">
        {/* Header */}
        <div className="p-4 border-b flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/chat">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={agent.avatar}
                alt={agent.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-semibold">{agent.name}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 