interface MarkdownImageProps {
  token: {
    href: string;
    text: string;
  };
}

export const MarkdownImage = ({ token }: MarkdownImageProps) => {
  return (
    <a href={token.href} target="_blank" rel="noopener noreferrer">
      <img
        src={token.href}
        title={token.text}
        alt={token.text}
        className="max-w-full max-h-[300px]"
      />
    </a>
  );
}; 