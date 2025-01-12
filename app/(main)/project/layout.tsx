export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1800px] mx-auto">
        {children}
      </div>
    </div>
  )
} 
