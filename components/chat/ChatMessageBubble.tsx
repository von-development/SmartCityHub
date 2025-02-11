import { cn } from "@/utils/cn"
import type { Message } from "ai/react"
import type { ReactNode } from "react"
import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Add interface for source structure
interface Source {
  pageContent: string
  metadata?: {
    loc?: {
      lines: {
        from: number
        to: number
      }
    }
  }
}

function formatText(text: string) {
  return text
    .replace(/###\s+(.*?)(?:\n|$)/g, '<h3 class="text-xl font-semibold mt-6 mb-3 text-primary font-outfit">$1</h3>')
    .replace(
      /^\d+\.\s+(.*?)(?:\n|$)/gm,
      '<div class="ml-6 mb-2 flex items-center font-outfit"><span class="mr-2 text-primary">•</span>$1</div>',
    )
    .replace(
      /^-\s+(.*?)(?:\n|$)/gm,
      '<div class="ml-6 mb-2 flex items-center font-outfit"><span class="mr-2 text-primary">•</span>$1</div>',
    )
    .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-primary font-outfit">$1</span>')
    .replace(/\*(.*?)\*/g, '<span class="italic text-primary/80 font-outfit">$1</span>')
    .replace(
      /\[(.*?)\]$$(.*?)$$/g,
      '<a href="$2" class="text-blue-500 hover:underline hover:text-blue-600 transition-colors inline-flex items-center" target="_blank" rel="noopener noreferrer">$1<ExternalLink class="w-3 h-3 ml-1" /></a>',
    )
    .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
    // Links: [text](url)
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-blue-500 hover:underline" target="_blank">$1</a>'
    )
    .split("\n")
    .filter(Boolean)
    .join('</p><p class="mb-3 font-outfit">')
}

export function ChatMessageBubble(props: {
  message: Message
  agentIcon?: ReactNode
  sources: Source[]
}) {
  const isUser = props.message.role === "user"

  return (
    <div className={cn("w-full flex gap-4 mb-8", isUser ? "justify-end" : "justify-start")}>
      {/* AGENT AVATAR */}
      {!isUser && (
        <Avatar className="w-10 h-10 border-2 border-secondary">
          <AvatarImage src="/agent-avatar.png" alt="Agent" />
          <AvatarFallback>{props.agentIcon}</AvatarFallback>
        </Avatar>
      )}

      {/* MESSAGE BUBBLE */}
      <Card className={cn(
        "max-w-[85%] shadow-lg font-outfit",
        isUser ? "bg-primary text-primary-foreground" : "bg-card"
      )}>
        <CardContent className="p-4">
          {/* Message Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <span
              className={cn(
                "font-outfit text-base leading-relaxed",
                isUser ? "text-primary-foreground" : "text-card-foreground"
              )}
              dangerouslySetInnerHTML={{
                __html: formatText(props.message.content),
              }}
            />
          </div>

          {/* Sources section with fixed quotes */}
          {!isUser && props.sources && props.sources.length > 0 && (
            <div className="mt-4 space-y-2 font-outfit">
              <Badge variant="outline" className="text-xs font-semibold font-outfit">
                🔍 Sources
              </Badge>
              <div className="space-y-2">
                {props.sources.map((source, i) => (
                  <div key={`source:${i}`} className="text-sm bg-muted p-2 rounded-md font-outfit">
                    <span className="font-medium text-primary">{i + 1}.</span> &ldquo;{source.pageContent}&rdquo;
                    {source.metadata?.loc?.lines !== undefined && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        Lines {source.metadata.loc.lines.from} to {source.metadata.loc.lines.to}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* USER AVATAR */}
      {isUser && (
        <Avatar className="w-10 h-10 border-2 border-primary">
          <AvatarImage src="/user-avatar.png" alt="User" />
          <AvatarFallback>
            <User className="w-6 h-6 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

