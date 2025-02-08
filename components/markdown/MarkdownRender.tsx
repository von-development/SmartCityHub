import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { MarkdownCode } from './MarkdownCode';
import { MarkdownParagraph } from './MarkdownParagraph';
import { MarkdownHeading } from './MarkdownHeading';
import { MarkdownImage } from './MarkdownImage';
import { MarkdownLink } from './MarkdownLink';
import { MarkdownList } from './MarkdownList';
import { MarkdownListItem } from './MarkdownListItem';

interface MarkdownRenderProps {
  source: string;
}

export const MarkdownRender = ({ source }: MarkdownRenderProps) => {
  const components: Partial<Components> = {
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return (
        <MarkdownCode
          className={className}
          language={match ? match[1] : undefined}
          {...props}
        >
          {children}
        </MarkdownCode>
      );
    },
    p: ({ children }) => <MarkdownParagraph>{children}</MarkdownParagraph>,
    h1: ({ children }) => (
      <MarkdownHeading token={{ depth: 1, text: String(children) }}>{children}</MarkdownHeading>
    ),
    h2: ({ children }) => (
      <MarkdownHeading token={{ depth: 2, text: String(children) }}>{children}</MarkdownHeading>
    ),
    h3: ({ children }) => (
      <MarkdownHeading token={{ depth: 3, text: String(children) }}>{children}</MarkdownHeading>
    ),
    h4: ({ children }) => (
      <MarkdownHeading token={{ depth: 4, text: String(children) }}>{children}</MarkdownHeading>
    ),
    h5: ({ children }) => (
      <MarkdownHeading token={{ depth: 5, text: String(children) }}>{children}</MarkdownHeading>
    ),
    h6: ({ children }) => (
      <MarkdownHeading token={{ depth: 6, text: String(children) }}>{children}</MarkdownHeading>
    ),
    img: ({ src, alt }) => (
      <MarkdownImage token={{ href: src || '', text: alt || '' }} />
    ),
    a: ({ href, title, children }) => (
      <MarkdownLink token={{ href: href || '', title }}>{children}</MarkdownLink>
    ),
    ul: ({ children }) => (
      <MarkdownList token={{ ordered: false, items: [] }}>{children}</MarkdownList>
    ),
    ol: ({ children }) => (
      <MarkdownList token={{ ordered: true, items: [] }}>{children}</MarkdownList>
    ),
    li: ({ children }) => <MarkdownListItem>{children}</MarkdownListItem>,
  };

  return <ReactMarkdown components={components}>{source}</ReactMarkdown>;
}; 