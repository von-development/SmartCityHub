"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search...</span>
        <span className="sr-only">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search across Aveiro Smart City..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Events">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/events"))}
            >
              All Events
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/events/featured"))}
            >
              Featured Events
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Places">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/map"))}
            >
              City Map
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/map/attractions"))}
            >
              Tourist Attractions
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Services">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/chat"))}
            >
              AI Assistant
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
} 