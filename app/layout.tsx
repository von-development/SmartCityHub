import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "./providers";
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aveiro Smart City",
  description: "Your digital gateway to Aveiro's urban experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#000000" />
        <link 
          rel="stylesheet" 
          type="text/css" 
          href="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps.css"
        />
      </head>
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
