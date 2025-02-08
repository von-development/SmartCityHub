import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import materialOceanic from "react-syntax-highlighter/dist/esm/styles/prism/material-oceanic";
interface MarkdownCodeProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
  language?: string;
}

export const MarkdownCode = ({ inline, className, children, language }: MarkdownCodeProps) => {
  return !inline ? (
    <SyntaxHighlighter
      //style={vscDarkPlus}
      style={materialOceanic}
      language={language}
      PreTag="div"
      className="rounded-md"
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold">
      {children}
    </code>
  );
}; 