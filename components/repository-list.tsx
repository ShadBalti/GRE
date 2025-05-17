import { getRepositories } from "@/lib/github"
import RepositoryCard from "./repository-card"
import Pagination from "./pagination"
import { LanguageFilter } from "./language-filter"
import { ActiveFilters } from "./active-filters"

interface RepositoryListProps {
  query: string
  language: string
  page: number
  minStars?: string
  minForks?: string
  dateRange?: string
}

export default async function RepositoryList({
  query,
  language,
  page,
  minStars,
  minForks,
  dateRange,
}: RepositoryListProps) {
  const { repositories, totalCount, languages } = await getRepositories(
    query,
    language,
    page,
    minStars,
    minForks,
    dateRange,
  )

  const totalPages = Math.min(Math.ceil(totalCount / 10), 100) // GitHub API limits to 1000 results (100 pages)

  if (repositories.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No repositories found matching your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-muted-foreground">Found {totalCount.toLocaleString()} repositories</p>
        <div className="flex flex-wrap gap-2 items-center">
          {languages.length > 0 && (
            <LanguageFilter
              languages={languages}
              currentLanguage={language}
              query={query}
              minStars={minStars}
              minForks={minForks}
              dateRange={dateRange}
            />
          )}
        </div>
      </div>

      <ActiveFilters language={language} minStars={minStars} minForks={minForks} dateRange={dateRange} query={query} />

      <div className="grid gap-4">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          query={query}
          language={language}
          minStars={minStars}
          minForks={minForks}
          dateRange={dateRange}
        />
      )}
    </div>
  )
}
