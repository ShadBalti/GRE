import type { Repository } from "./types"

export async function getRepositories(
  query: string,
  language: string,
  page = 1,
  minStars?: string,
  minForks?: string,
  dateRange?: string,
) {
  const perPage = 10

  // Build the GitHub search query
  let searchQuery = query

  if (language) {
    searchQuery += `+language:${language}`
  }

  if (minStars) {
    searchQuery += `+stars:>=${minStars}`
  }

  if (minForks) {
    searchQuery += `+forks:>=${minForks}`
  }

  if (dateRange) {
    // Date range can be: day, week, month, year
    const date = getDateFromRange(dateRange)
    if (date) {
      searchQuery += `+created:>=${date}`
    }
  }

  // Fetch repositories from GitHub API
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    },
  )

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  const data = await response.json()

  // Extract unique languages from the results
  const languages = Array.from(new Set(data.items.map((repo: Repository) => repo.language).filter(Boolean))) as string[]

  return {
    repositories: data.items as Repository[],
    totalCount: data.total_count as number,
    languages,
  }
}

// Helper function to convert date range to ISO date string
function getDateFromRange(range: string): string | null {
  const now = new Date()

  switch (range) {
    case "day":
      now.setDate(now.getDate() - 1)
      break
    case "week":
      now.setDate(now.getDate() - 7)
      break
    case "month":
      now.setMonth(now.getMonth() - 1)
      break
    case "year":
      now.setFullYear(now.getFullYear() - 1)
      break
    default:
      return null
  }

  return now.toISOString().split("T")[0]
}
