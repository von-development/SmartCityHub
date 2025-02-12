"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
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

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
} 