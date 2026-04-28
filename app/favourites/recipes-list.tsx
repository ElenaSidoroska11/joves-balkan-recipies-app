"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getFavouriteSlugs, toggleFavourite } from "@/lib/favourites"
import Image from "@/lib/next-image"
import { cn, publicPath } from "@/lib/utils"

import type { Recipe } from "@/lib/types/recipe"

type FavouritesRecipesListProps = {
  recipes: Recipe[]
}

export function FavouritesRecipesList({ recipes }: FavouritesRecipesListProps) {
  const [favouriteSlugs, setFavouriteSlugs] = useState<string[]>([])

  useEffect(() => {
    setFavouriteSlugs(getFavouriteSlugs())
  }, [])

  const favourites = useMemo(() => {
    const slugSet = new Set(favouriteSlugs)
    return recipes.filter((recipe) => slugSet.has(recipe.slug))
  }, [recipes, favouriteSlugs])

  if (favourites.length === 0) {
    return (
      <p className="mt-8 text-sm text-muted-foreground">
        You do not have favourites yet. Open the recipes page and tap the heart icon to save one.
      </p>
    )
  }

  return (
    <ul className="mt-8 flex flex-col gap-3">
      {favourites.map((recipe) => (
        <li key={recipe.slug}>
          <div className="group relative">
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
              <div className="min-w-0 flex-1 p-4 pr-12">
                <span className="font-medium">{recipe.title}</span>
                <p className="mt-1 text-sm text-muted-foreground">{recipe.description}</p>
              </div>
            </Link>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              aria-label={`Remove ${recipe.title} from favourites`}
              className="absolute top-2 right-2"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setFavouriteSlugs(toggleFavourite(recipe.slug))
              }}
            >
              <Heart className={cn("size-4 fill-rose-500 text-rose-500")} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
