import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "./providers";
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
}

export const metadata: Metadata = {
  title: "Aveiro Smart City",
  description: "Your digital gateway to Aveiro's urban experience",
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
  },
  formatDetection: {
    telephone: false
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link 
          rel="stylesheet" 
          type="text/css" 
          href="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps.css"
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden overscroll-none`}>
        <Providers>
          <Navbar />
          <div className="flex flex-col min-h-[calc(100vh-4rem)] h-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
