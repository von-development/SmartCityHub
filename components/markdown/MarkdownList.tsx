interface MarkdownListProps {
  token: {
    ordered: boolean;
    start?: number;
    items: any[];
  };
  children: React.ReactNode;
}

export const MarkdownList = ({ token, children }: MarkdownListProps) => {
  const ListTag = token.ordered ? 'ol' : 'ul';
  
  return (
    <ListTag className="pl-3.5" start={token.start || 1}>
      {children}
    </ListTag>
  );
}; 