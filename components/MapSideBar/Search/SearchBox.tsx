import { useState, useEffect, useRef } from 'react'
import { Search, Loader2, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/utils/cn'

interface SearchBoxProps {
  onSearch: (query: string) => void
  isLoading?: boolean
  onClear?: () => void
  className?: string
}

export function SearchBox({ 
  onSearch, 
  isLoading, 
  onClear,
  className 
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery)
    }
  }, [debouncedQuery, onSearch])

  const handleClear = () => {
    setQuery('')
    onClear?.()
    inputRef.current?.focus()
  }

  return (
    <div className={cn(
      "relative w-full md:w-auto max-w-full md:max-w-md mx-auto md:mx-0",
      className
    )}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          ref={inputRef}
          placeholder="Procurar lugares..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-12 h-12 md:h-11 rounded-lg bg-background shadow-md 
            md:shadow-sm focus:shadow-lg transition-shadow duration-200 text-base md:text-sm"
        />
        {(isLoading || query) && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 md:h-8 w-10 md:w-8 
              p-0 hover:bg-accent touch-manipulation"
            onClick={handleClear}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 md:h-4 md:w-4 animate-spin" />
            ) : (
              <X className="h-5 w-5 md:h-4 md:w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  )
} 