import { Suspense } from "react"
import SearchForm from "@/components/search-form"
import RepositoryList from "@/components/repository-list"
import type { SearchParamsType } from "@/lib/types"

export default function Home({
  searchParams,
}: {
  searchParams: SearchParamsType
}) {
  const query = searchParams.query || ""
  const language = searchParams.language || ""
  const page = Number(searchParams.page) || 1
  const minStars = searchParams.minStars || ""
  const minForks = searchParams.minForks || ""
  const dateRange = searchParams.dateRange || ""

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">GitHub Repo Explorer</h1>
          <p className="text-muted-foreground">Search for GitHub repositories and filter by various criteria</p>
        </div>

        <SearchForm
          initialQuery={query}
          initialLanguage={language}
          initialMinStars={minStars}
          initialMinForks={minForks}
          initialDateRange={dateRange}
        />

        <Suspense fallback={<div className="text-center py-10">Loading repositories...</div>}>
          {query && (
            <RepositoryList
              query={query}
              language={language}
              page={page}
              minStars={minStars}
              minForks={minForks}
              dateRange={dateRange}
            />
          )}
        </Suspense>
      </div>
    </main>
  )
}
