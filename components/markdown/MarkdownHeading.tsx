interface MarkdownHeadingProps {
  token: {
    depth: number;
    text: string;
  };
  children: React.ReactNode;
}

const depthToFontClasses: Record<number, string> = {
  1: 'text-2xl font-bold',
  2: 'text-xl font-bold',
  3: 'text-lg font-bold',
  4: 'text-base font-bold',
  5: 'text-sm font-bold',
  6: 'text-xs font-bold'
};

const depthToSpacingClasses: Record<number, string> = {
  1: 'my-6',
  2: 'my-5',
  3: 'my-4',
  4: 'my-3',
  5: 'my-2',
  6: 'my-1'
};

export const MarkdownHeading = ({ token, children }: MarkdownHeadingProps) => {
  const id = token.text.toLowerCase().replace(/\s+/g, '-');
  const HeadingTag = `h${token.depth}` as keyof JSX.IntrinsicElements;

  return (
    <div className={`flex items-center group ${depthToSpacingClasses[token.depth]}`}>
      <HeadingTag id={id} className={depthToFontClasses[token.depth]}>
        {children}
      </HeadingTag>
    </div>
  );
}; 