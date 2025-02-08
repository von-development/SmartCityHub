interface MarkdownListItemProps {
  children: React.ReactNode;
}

export const MarkdownListItem = ({ children }: MarkdownListItemProps) => {
  return <li className="pl-1 list-disc">{children}</li>;
}; 