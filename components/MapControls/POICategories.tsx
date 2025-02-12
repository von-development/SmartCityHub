import * as React from "react"
import { Search } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// Define categories with proper typing
type POICategory = {
  code: string
  label: string
}

const poiCategories: POICategory[] = [
  { code: "7315", label: "Restaurantes" },
  { code: "9376", label: "Cafés & Bares" },
  { code: "7332", label: "Mercados" },
  { code: "7376", label: "Atrações" },
  { code: "7317", label: "Museus" },
  { code: "9362", label: "Parques" },
  { code: "7538", label: "Transportes" },
  { code: "7582", label: "Estacionamento" },
  { code: "7373", label: "Shopping" },
  { code: "7397", label: "Serviços" },
]

interface POICategoriesProps {
  onSelectCategory: (category: string) => void
  isLoading?: boolean
  onClose?: () => void
}

export function POICategories({ onSelectCategory, isLoading, onClose }: POICategoriesProps) {
  const handleSelect = React.useCallback((value: string) => {
    onSelectCategory(value)
    onClose?.()
  }, [onSelectCategory, onClose])

  return (
    <Command className="rounded-lg border shadow-md">
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandInput 
          placeholder="Procurar categoria..." 
          className="h-9 flex-1"
        />
      </div>
      <CommandList>
        <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
        <CommandGroup className="p-2">
          {poiCategories.map((category) => (
            <CommandItem
              key={category.code}
              value={category.code}
              onSelect={handleSelect}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer aria-selected:bg-accent"
              disabled={isLoading}
            >
              <span className="flex-1">{category.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
} 