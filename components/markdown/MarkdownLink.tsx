interface MarkdownLinkProps {
  token: {
    href: string;
    title?: string;
  };
  children: React.ReactNode;
}

export const MarkdownLink = ({ token, children }: MarkdownLinkProps) => {
  return (
    <a
      className="underline hover:opacity-80"
      target="_blank"
      rel="noopener noreferrer"
      href={token.href}
      title={token.title}
    >
      {children}
    </a>
  );
}; 