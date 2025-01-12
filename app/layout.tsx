import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aveiro Smart City",
  description: "Your digital gateway to Aveiro's urban experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
