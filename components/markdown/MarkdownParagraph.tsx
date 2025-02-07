interface MarkdownParagraphProps {
  children: React.ReactNode;
}

export const MarkdownParagraph = ({ children }: MarkdownParagraphProps) => {
  return <p className="my-4 break-words">{children}</p>;
}; 