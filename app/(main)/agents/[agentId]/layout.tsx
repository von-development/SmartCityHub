export default function AgentChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {children}
    </div>
  );
} 