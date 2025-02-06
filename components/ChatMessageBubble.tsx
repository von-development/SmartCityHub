import { cn } from "@/utils/cn";
import type { Message } from "ai/react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import type { Components } from 'react-markdown';
import { ExternalLink } from 'lucide-react';

export function ChatMessageBubble(props: {
  message: Message;
  aiEmoji?: string;
  sources: any[];
}) {
  const MarkdownComponents: Components = {
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !match;
      
      return (
        <code 
          className={cn(
            "bg-muted px-1.5 py-0.5 rounded-md text-sm",
            !isInline && "block bg-muted/50 p-4",
            className
          )} 
          {...props}
        >
          {children}
        </code>
      );
    },
    a({ node, children, href, ...props }) {
      return (
        <a 
          className="text-primary underline underline-offset-4 inline-flex items-baseline relative pr-[1.1em] hover:text-primary/80" 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
          <ExternalLink className="w-3 h-3 absolute top-1 right-0" />
        </a>
      );
    },
    h1({ node, children, ...props }) {
      return (
        <h1 
          className={cn(
            "mb-4 mt-6 scroll-m-20 text-2xl font-bold tracking-tight first:mt-0 last:mb-0",
            "border-b pb-2"
          )}
          {...props}
        >
          {children}
        </h1>
      );
    },
    h2({ node, children, ...props }) {
      return (
        <h2 
          className={cn(
            "mb-3 mt-5 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 last:mb-0"
          )}
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3({ node, children, ...props }) {
      return (
        <h3 
          className={cn(
            "mb-2 mt-4 scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 last:mb-0"
          )}
          {...props}
        >
          {children}
        </h3>
      );
    },
    p({ node, children, ...props }) {
      return (
        <p 
          className={cn(
            "mb-3 leading-7 first:mt-0 last:mb-0",
            "[&:not(:first-child)]:mt-3"
          )}
          {...props}
        >
          {children}
        </p>
      );
    },
    ul({ node, children, ...props }) {
      return (
        <ul 
          className={cn(
            "my-3 ml-6 list-disc [&>li]:mt-1.5 first:mt-0 last:mb-0"
          )}
          {...props}
        >
          {children}
        </ul>
      );
    },
    ol({ node, children, ...props }) {
      return (
        <ol 
          className={cn(
            "my-3 ml-6 list-decimal [&>li]:mt-1.5 first:mt-0 last:mb-0"
          )}
          {...props}
        >
          {children}
        </ol>
      );
    }
  };

  return (
    <div
      className={cn(
        `rounded-lg max-w-[80%] mb-2 flex`,
        props.message.role === "user"
          ? "bg-secondary text-secondary-foreground px-3 py-2"
          : "bg-background border px-3 py-2",
        props.message.role === "user" ? "ml-auto" : "mr-auto",
      )}
    >
      {props.message.role !== "user" && (
        <div className="mr-3 border bg-secondary -mt-1 rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center">
          {props.aiEmoji}
        </div>
      )}

      <div className="whitespace-pre-wrap flex flex-col">
        <div className="prose prose-sm dark:prose-invert max-w-none [&>*]:my-0 [&>*:not(:first-child)]:mt-2">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={MarkdownComponents}
          >
            {props.message.content}
          </ReactMarkdown>
        </div>

        {props.sources && props.sources.length ? (
          <>
            <code className="mt-3 mr-auto bg-primary px-2 py-1 rounded">
              <h2>🔍 Sources:</h2>
            </code>
            <code className="mt-1 mr-2 bg-primary px-2 py-1 rounded text-xs">
              {props.sources?.map((source, i) => (
                <div className="mt-1" key={"source:" + i}>
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