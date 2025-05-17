"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  query: string
  language: string
  minStars?: string
  minForks?: string
  dateRange?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  query,
  language,
  minStars,
  minForks,
  dateRange,
}: PaginationProps) {
  const router = useRouter()

  const navigate = (page: number) => {
    const params = new URLSearchParams()
    params.set("query", query)
    if (language) params.set("language", language)
    if (minStars) params.set("minStars", minStars)
    if (minForks) params.set("minForks", minForks)
    if (dateRange) params.set("dateRange", dateRange)
    params.set("page", page.toString())

    router.push(`/?${params.toString()}`)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => navigate(i)}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i}
        </Button>,
      )
    }

    return pages
  }

  return (
    <div className="flex justify-center items-center gap-1 py-4">
      <Button variant="outline" size="icon" onClick={() => navigate(currentPage - 1)} disabled={currentPage <= 1}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {renderPageNumbers()}

      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
