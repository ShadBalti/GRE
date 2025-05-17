import { Star, GitFork, ExternalLink, Calendar } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Repository } from "@/lib/types"

interface RepositoryCardProps {
  repository: Repository
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              {repository.full_name}
            </a>
          </CardTitle>
          {repository.language && <Badge variant="outline">{repository.language}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{repository.description || "No description provided."}</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{repository.stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{repository.forks_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Created {formatDate(repository.created_at)}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            View <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
