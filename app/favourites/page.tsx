import { getAllRecipes } from "@/lib/recipes"
import { FavouritesRecipesList } from "@/app/favourites/recipes-list"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My favourites",
  description: "Your saved Balkan recipes.",
}

export default function FavouritesPage() {
  const recipes = getAllRecipes()

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-medium tracking-tight">My favourites</h1>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
        Recipes you save with the heart icon show up here for quick access.
      </p>
      <FavouritesRecipesList recipes={recipes} />
    </div>
  )
}
