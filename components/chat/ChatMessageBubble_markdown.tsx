import { cn } from "@/utils/cn";
import type { Message } from "ai/react";
import { MarkdownRender } from "../markdown/MarkdownRender";

interface ChatMessageBubbleProps {
  message: Message;
  aiEmoji?: string;
  sources: any[];
}

export function ChatMessageBubble_markdown({ message, aiEmoji, sources }: ChatMessageBubbleProps) {
  return (
    <div
      className={cn(
        `rounded-[24px] mb-8 flex`,
        message.role === "user"
          ? "bg-secondary text-secondary-foreground px-4 py-2 max-w-[65%]"
          : "max-w-[75%]",
        message.role === "user" ? "ml-auto" : "mr-auto",
      )}
    >
      {message.role !== "user" && (
        <div className="mr-4 border bg-secondary -mt-2 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
          {aiEmoji}
        </div>
      )}

      <div className="flex flex-col">
        <div className={cn(
          "prose dark:prose-invert max-w-none",
          message.role !== "user" && "px-4 py-2 bg-secondary rounded-[20px]"
        )}>
          <MarkdownRender source={message.content} />
        </div>

        {sources && sources.length ? (
          <>
            <code className="mt-4 mr-auto bg-muted px-2 py-1 rounded text-sm">
              <h2>🔍 Sources:</h2>
            </code>
            <code className="mt-1 mr-2 bg-muted px-2 py-1 rounded text-xs">
              {sources?.map((source, i) => (
                <div className="mt-2" key={"source:" + i}>
                  {i + 1}. &quot;{source.pageContent}&quot;
                  {source.metadata?.loc?.lines !== undefined ? (
                    <div>
                      <br />
                      Lines {source.metadata?.loc?.lines?.from} to{" "}
                      {source.metadata?.loc?.lines?.to}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </code>
          </>
        ) : null}
      </div>
    </div>
  );
} 