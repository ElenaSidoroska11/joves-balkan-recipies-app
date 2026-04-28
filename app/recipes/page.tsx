import { getAllRecipes } from "@/lib/recipes"
import { RecipesSearchList } from "@/app/recipes/recipes-search-list"

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
      <RecipesSearchList list={list} />
    </div>
  )
}
