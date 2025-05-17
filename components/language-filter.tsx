"use client"

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguageFilterProps {
  languages: string[]
  currentLanguage: string
  query: string
  minStars?: string
  minForks?: string
  dateRange?: string
}

export function LanguageFilter({
  languages,
  currentLanguage,
  query,
  minStars,
  minForks,
  dateRange,
}: LanguageFilterProps) {
  const router = useRouter()

  const handleLanguageChange = (value: string) => {
    const params = new URLSearchParams()
    params.set("query", query)

    if (value !== "all") {
      params.set("language", value)
    }

    if (minStars) params.set("minStars", minStars)
    if (minForks) params.set("minForks", minForks)
    if (dateRange) params.set("dateRange", dateRange)

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Language:</span>
      <Select value={currentLanguage || "all"} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Languages</SelectItem>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
