"use client";

import { cn } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchCommand } from "./search-command";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Events", href: "/events" },
  { name: "Map", href: "/map" },
  { name: "Agents", href: "/agents" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname === "/descubra") return;
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname === "/descubra") return null;

  return (
    <header
      className={cn(
        "sticky top-0 w-full transition-all duration-300 z-50",
        scrolled 
          ? "bg-transparent backdrop-blur-sm border-transparent" 
          : "bg-background/50 backdrop-blur-xl border-b"
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link 
          href="/" 
          className={cn(
            "font-bold text-xl shrink-0 transition-opacity duration-300",
            scrolled ? "opacity-0" : "opacity-100"
          )}
        >
          ConnectAveiro
        </Link>

        <div className={cn(
          "transition-opacity duration-300",
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <SearchCommand />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors hover:text-primary relative py-2",
                pathname === item.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground",
                scrolled && "hover:text-white"
              )}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className={cn(
            "md:hidden transition-opacity duration-300",
            scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors hover:text-primary p-2",
                    pathname === item.href
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
} 