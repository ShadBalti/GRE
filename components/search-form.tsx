"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface SearchFormProps {
  initialQuery: string
  initialLanguage: string
  initialMinStars?: string
  initialMinForks?: string
  initialDateRange?: string
}

export default function SearchForm({
  initialQuery,
  initialLanguage,
  initialMinStars = "",
  initialMinForks = "",
  initialDateRange = "",
}: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [language, setLanguage] = useState(initialLanguage)
  const [minStars, setMinStars] = useState(initialMinStars)
  const [minForks, setMinForks] = useState(initialMinForks)
  const [dateRange, setDateRange] = useState(initialDateRange)
  const [isPending, startTransition] = useTransition()
  const [showFilters, setShowFilters] = useState(
    initialMinStars !== "" || initialMinForks !== "" || initialDateRange !== "",
  )
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(() => {
      const params = new URLSearchParams()
      if (query) params.set("query", query)
      if (language) params.set("language", language)
      if (minStars) params.set("minStars", minStars)
      if (minForks) params.set("minForks", minForks)
      if (dateRange) params.set("dateRange", dateRange)

      router.push(`/?${params.toString()}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="query">Repository Search</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="query"
              placeholder="Search repositories..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="flex-shrink-0"
            aria-label="Toggle filters"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button type="submit" disabled={isPending} className="flex-shrink-0">
            {isPending ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        value={showFilters ? "filters" : ""}
        onValueChange={(value) => setShowFilters(value === "filters")}
      >
        <AccordionItem value="filters" className="border-none">
          <AccordionTrigger className="py-2">Advanced Filters</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    placeholder="e.g. javascript, python"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minStars">Minimum Stars</Label>
                  <Input
                    id="minStars"
                    type="number"
                    placeholder="e.g. 100"
                    value={minStars}
                    onChange={(e) => setMinStars(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minForks">Minimum Forks</Label>
                  <Input
                    id="minForks"
                    type="number"
                    placeholder="e.g. 50"
                    value={minForks}
                    onChange={(e) => setMinForks(e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateRange">Created Within</Label>
                <Select value={dateRange} onValueChange={(value) => setDateRange(value)}>
                  <SelectTrigger id="dateRange">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="day">Last 24 hours</SelectItem>
                    <SelectItem value="week">Last week</SelectItem>
                    <SelectItem value="month">Last month</SelectItem>
                    <SelectItem value="year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  )
}
