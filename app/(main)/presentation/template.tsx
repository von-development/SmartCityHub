'use client'

export default function PresentationTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black" data-presentation-root>
      {children}
    </div>
  )
} 