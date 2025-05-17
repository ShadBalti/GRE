export interface SearchParamsType {
  query?: string
  language?: string
  page?: string
  minStars?: string
  minForks?: string
  dateRange?: string
}

export interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
}
