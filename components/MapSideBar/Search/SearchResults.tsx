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
    <div className="bg-background rounded-b-lg border max-h-[300px] overflow-auto">
      <div className="p-2 space-y-1">
        {results.map((result) => (
          <button
            key={result.id}
            className="w-full flex items-start gap-2 p-2 hover:bg-accent rounded-md text-left transition-colors"
            onClick={() => onSelectResult(result)}
          >
            <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">
                {result.poi?.name || 'Local sem nome'}
              </p>
              {result.address?.freeformAddress && (
                <p className="text-sm text-muted-foreground truncate">
                  {result.address.freeformAddress}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 