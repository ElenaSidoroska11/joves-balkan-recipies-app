import type { Recipe } from "@/lib/types/recipe"
import rawRecipes from "@/content/recipes.json"

const recipes = rawRecipes as Recipe[]

export function getAllRecipes(): Recipe[] {
  return [...recipes].sort((a, b) => a.title.localeCompare(b.title))
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug)
}

export function getAllRecipeSlugs(): string[] {
  return recipes.map((r) => r.slug)
}
