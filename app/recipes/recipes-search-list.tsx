"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import Image from "@/lib/next-image"
import { publicPath } from "@/lib/utils"

import type { Recipe } from "@/lib/types/recipe"

type RecipesSearchListProps = {
  list: Recipe[]
}

export function RecipesSearchList({ list }: RecipesSearchListProps) {
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()

  const filteredRecipes = useMemo(() => {
    if (!normalizedQuery) {
      return list
    }

    return list.filter((recipe) => {
      const title = recipe.title.toLowerCase()
      const description = recipe.description.toLowerCase()

      return title.includes(normalizedQuery) || description.includes(normalizedQuery)
    })
  }, [list, normalizedQuery])

  return (
    <>
      <div className="relative mt-6">
        <Search
          aria-hidden="true"
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search recipes..."
          aria-label="Search recipes"
          className="pl-9"
        />
      </div>
      <ul className="mt-8 flex flex-col gap-3">
        {filteredRecipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link
              href={`/recipes/${recipe.slug}`}
              className="flex gap-4 overflow-hidden rounded-lg border border-border bg-card transition-colors hover:bg-accent/50"
            >
              {recipe.image && (
                <div className="relative h-24 w-28 shrink-0 overflow-hidden bg-muted/30 sm:h-28 sm:w-36">
                  <Image
                    src={publicPath(recipe.image)}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 7rem, 9rem"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1 p-4">
                <span className="font-medium">{recipe.title}</span>
                <p className="mt-1 text-sm text-muted-foreground">{recipe.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {filteredRecipes.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">No recipes match your search.</p>
      )}
    </>
  )
}
