import * as React from "react"
import { Check, ChevronDown, MapPin, Loader2 } from "lucide-react"
import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Define main categories with their subcategories using TomTom category IDs
const poiCategories = [
  {
    label: "Comida & Bebida",
    value: "food_drink",
    categories: [
      { code: "7315", label: "Restaurantes" },
      { code: "9376", label: "Cafés & Bares" },
      { code: "7332", label: "Mercados & Supermercados" },
      { code: "7339", label: "Adegas" },
    ]
  },
  {
    label: "Turismo & Lazer",
    value: "tourism_leisure",
    categories: [
      { code: "7376", label: "Atrações Turísticas" },
      { code: "7317", label: "Museus" },
      { code: "7318", label: "Teatros & Salas de Concerto" },
      { code: "9362", label: "Parques & Recreação" },
      { code: "7320", label: "Praias" },
    ]
  },
  {
    label: "Transporte",
    value: "transport",
    categories: [
      { code: "7538", label: "Paragens de Autocarro" },
      { code: "7541", label: "Estações de Comboio" },
      { code: "7542", label: "Metro" },
      { code: "7582", label: "Parques de Estacionamento" },
    ]
  },
  {
    label: "Compras",
    value: "shopping",
    categories: [
      { code: "7373", label: "Centros Comerciais" },
      { code: "7309", label: "Lojas" },
      { code: "7321", label: "Lojas de Departamento" },
    ]
  },
  {
    label: "Serviços",
    value: "services",
    categories: [
      { code: "7397", label: "Bancos & ATMs" },
      { code: "9361", label: "Correios" },
      { code: "7326", label: "Saúde" },
      { code: "7327", label: "Farmácias" },
    ]
  }
] as const

interface POICategoriesProps {
  onSelectCategory: (category: string) => void;
  isLoading?: boolean;
}

export function POICategories({ onSelectCategory, isLoading = false }: POICategoriesProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<string>("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
          disabled={isLoading}
        >
          <MapPin className="mr-2 h-4 w-4" />
          <span className="truncate">
            {selectedCategory
              ? poiCategories.find(category => 
                  category.categories.some(subcat => subcat.code === selectedCategory)
                )?.categories.find(cat => cat.code === selectedCategory)?.label
              : "Pontos de Interesse"}
          </span>
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Procurar categoria..." />
          <CommandList>
            <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
            {poiCategories.map((mainCategory) => (
              <CommandGroup key={mainCategory.value} heading={mainCategory.label}>
                {mainCategory.categories.map((category) => (
                  <CommandItem
                    key={category.code}
                    value={category.code}
                    onSelect={(currentValue) => {
                      setSelectedCategory(currentValue)
                      onSelectCategory(currentValue)
                      setOpen(false)
                    }}
                    disabled={isLoading}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCategory === category.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {category.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 