"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getFavouriteSlugs, toggleFavourite } from "@/lib/favourites"
import Image from "@/lib/next-image"
import { cn, publicPath } from "@/lib/utils"

import type { Recipe } from "@/lib/types/recipe"

type HomeRecipesPreviewProps = {
  recipes: Recipe[]
}

export function HomeRecipesPreview({ recipes }: HomeRecipesPreviewProps) {
  const [favouriteSlugs, setFavouriteSlugs] = useState<string[]>([])

  useEffect(() => {
    setFavouriteSlugs(getFavouriteSlugs())
  }, [])

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <li key={recipe.slug}>
          <div className="relative h-full">
            <Link
              href={`/recipes/${recipe.slug}`}
              className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-white/50 shadow-sm ring-1 ring-foreground/3 transition duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
            >
              {recipe.image && (
                <div className="relative aspect-4/3 w-full overflow-hidden border-b border-border/40 bg-muted/30">
                  <Image
                    src={publicPath(recipe.image)}
                    alt={recipe.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between p-5 pt-4">
                <div>
                  <h3 className="text-base leading-snug font-medium text-foreground group-hover:underline group-hover:decoration-primary/50 group-hover:underline-offset-2">
                    {recipe.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {recipe.description}
                  </p>
                </div>
                {recipe.prepMinutes != null && recipe.cookMinutes != null && (
                  <p className="mt-4 text-xs text-muted-foreground/90">
                    ~{recipe.prepMinutes + recipe.cookMinutes} min
                  </p>
                )}
              </div>
            </Link>
            <Button
              type="button"
              size="icon-sm"
              variant="ghost"
              aria-label={
                favouriteSlugs.includes(recipe.slug)
                  ? `Remove ${recipe.title} from favourites`
                  : `Add ${recipe.title} to favourites`
              }
              className="absolute top-2 right-2"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setFavouriteSlugs(toggleFavourite(recipe.slug))
              }}
            >
              <Heart
                className={cn(
                  "size-6",
                  favouriteSlugs.includes(recipe.slug) && "fill-rose-500 text-rose-500"
                )}
              />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
