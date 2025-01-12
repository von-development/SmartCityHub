'use client'

import { agents } from '@/lib/agents'
import { useAgentStore } from '@/stores/use-agent-store'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { MessageSquare } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {children}
    </div>
  )
} 