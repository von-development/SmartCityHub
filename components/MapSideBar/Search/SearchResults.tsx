import { MapPin } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SearchResult } from '@/types/search'

interface SearchResultsProps {
  results: SearchResult[]
  onSelectResult: (result: SearchResult) => void
}

export function SearchResults({ results, onSelectResult }: SearchResultsProps) {
  if (results.length === 0) return null

  return (
    <div className="fixed md:absolute left-0 right-0 md:left-auto md:right-auto 
      w-full md:w-auto min-w-full md:min-w-[350px] 
      bg-background rounded-b-lg border shadow-lg
      max-h-[50vh] md:max-h-[300px] overflow-hidden
      z-50 md:z-30">
      <ScrollArea className="h-full">
        <div className="p-2 space-y-1">
          {results.map((result) => (
            <button
              key={result.id}
              className="w-full flex items-start gap-3 p-4 md:p-3 
                hover:bg-accent/50 active:bg-accent 
                rounded-md text-left transition-colors
                touch-manipulation"
              onClick={() => onSelectResult(result)}
            >
              <MapPin className="h-5 w-5 md:h-4 md:w-4 mt-1 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate text-base md:text-sm">
                  {result.poi?.name || 'Local sem nome'}
                </p>
                {result.address?.freeformAddress && (
                  <p className="text-sm md:text-xs text-muted-foreground truncate mt-0.5">
                    {result.address.freeformAddress}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 