"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { ErrorBoundary } from 'react-error-boundary'

const queryClient = new QueryClient();

function ErrorFallback({error}: {error: Error}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Something went wrong:</h2>
        <pre className="mt-2 text-sm text-red-500">{error.message}</pre>
      </div>
    </div>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Prevent pull-to-refresh
    document.body.style.overscrollBehavior = 'none';
    
    // Prevent double-tap zoom
    document.addEventListener('touchend', (e) => {
      e.preventDefault();
    }, { passive: false });
    
    return () => {
      document.body.style.overscrollBehavior = 'auto';
    };
  }, []);

  if (!mounted) return null

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
} 