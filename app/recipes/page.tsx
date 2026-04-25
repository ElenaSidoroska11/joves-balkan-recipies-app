import Link from "next/link"

import Image from "@/lib/next-image"

import { getAllRecipes } from "@/lib/recipes"
import { publicPath } from "@/lib/utils"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All recipes",
  description: "Home-style Balkan dishes from Jove’s kitchen — browse the collection.",
}

export default function RecipesIndexPage() {
  const list = getAllRecipes()

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-medium tracking-tight">All recipes</h1>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
        A growing set of family recipes. Each page has ingredients, steps, and the little notes
        that make them taste like home.
      </p>
      <ul className="mt-8 flex flex-col gap-3">
        {list.map((recipe) => (
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
    </div>
  )
}
