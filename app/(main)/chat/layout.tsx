'use client'

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