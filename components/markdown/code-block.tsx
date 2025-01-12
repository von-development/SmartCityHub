'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps {
  node?: any
  inline?: boolean
  className?: string
  children: any
}

export function CodeBlock({
  node,
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')
  const code = String(children).replace(/\n$/, '')

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return !inline && match ? (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 p-2 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-white" />
        )}
      </button>
      <SyntaxHighlighter
        {...props}
        style={oneDark}
        language={match[1]}
        PreTag="div"
        className="rounded-lg !mt-0"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  )
} 