"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface ActiveFiltersProps {
  language: string
  minStars?: string
  minForks?: string
  dateRange?: string
  query: string
}

export function ActiveFilters({ language, minStars, minForks, dateRange, query }: ActiveFiltersProps) {
  const router = useRouter()

  // Check if we have any active filters
  const hasFilters = language || minStars || minForks || dateRange

  if (!hasFilters) {
    return null
  }

  const removeFilter = (filterType: string) => {
    const params = new URLSearchParams()
    params.set("query", query)

    if (filterType !== "language" && language) params.set("language", language)
    if (filterType !== "minStars" && minStars) params.set("minStars", minStars)
    if (filterType !== "minForks" && minForks) params.set("minForks", minForks)
    if (filterType !== "dateRange" && dateRange) params.set("dateRange", dateRange)

    router.push(`/?${params.toString()}`)
  }

  const getDateRangeLabel = (range: string) => {
    switch (range) {
      case "day":
        return "Last 24 hours"
      case "week":
        return "Last week"
      case "month":
        return "Last month"
      case "year":
        return "Last year"
      default:
        return range
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm text-muted-foreground pt-0.5">Active filters:</span>

      {language && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Language: {language}
          <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("language")} />
        </Badge>
      )}

      {minStars && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Stars: ≥{minStars}
          <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("minStars")} />
        </Badge>
      )}

      {minForks && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Forks: ≥{minForks}
          <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("minForks")} />
        </Badge>
      )}

      {dateRange && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Created: {getDateRangeLabel(dateRange)}
          <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("dateRange")} />
        </Badge>
      )}
    </div>
  )
}
