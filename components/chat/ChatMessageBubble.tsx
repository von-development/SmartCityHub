import { cn } from "@/utils/cn";
import type { Message } from "ai/react";

function formatText(text: string) {
  return text
  // Headers: ### text
  .replace(/###\s+(.*?)(?:\n|$)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
  // Numbered lists: 1. text
  .replace(/^\d+\.\s+(.*?)(?:\n|$)/gm, '<div class="ml-4">• $1</div>')
  // Bullet lists: - text
  .replace(/^-\s+(.*?)(?:\n|$)/gm, '<div class="ml-4">• $1</div>')
  // Bold: **text**
  .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
  // Italic: *text*
  .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
  // Links: [text](url)
  .replace(
    /\[(.*?)\]\((.*?)\)/g, 
    '<a href="$2" class="text-blue-500 hover:underline" target="_blank">$1</a>'
  );
  // Preserve line breaks
}
// Replace patterns in order: bold, italic, links
// return text
//   // Bold: **text**
//   .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
//   // Italic: *text*
//   .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
//   // Links: [text](url)
//   .replace(
//     /\[(.*?)\]\((.*?)\)/g,
//     '<a href="$2" class="text-blue-500 hover:underline" target="_blank">$1</a>'
//   );

export function ChatMessageBubble(props: {
  message: Message;
  aiEmoji?: string;
  sources: any[];
}) {
  return (
    <div
      className={cn(
        `rounded-[24px] max-w-[80%] mb-8 flex`,
        props.message.role === "user"
          ? "bg-secondary text-secondary-foreground px-4 py-2"
          : null,
        props.message.role === "user" ? "ml-auto" : "mr-auto",
      )}
    >
      {props.message.role !== "user" && (
        <div className="mr-4 border bg-secondary -mt-2 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
          {props.aiEmoji}
        </div>
      )}

      <div className="whitespace-pre-wrap flex flex-col">
        <span 
          dangerouslySetInnerHTML={{ 
            __html: formatText(props.message.content) 
          }} 
        />

        {props.sources && props.sources.length ? (
          <>
            <code className="mt-4 mr-auto bg-primary px-2 py-1 rounded">
              <h2>🔍 Sources:</h2>
            </code>
            <code className="mt-1 mr-2 bg-primary px-2 py-1 rounded text-xs">
              {props.sources?.map((source, i) => (
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