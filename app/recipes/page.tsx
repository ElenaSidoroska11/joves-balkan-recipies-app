import Link from "next/link"

import { getAllRecipes } from "@/lib/recipes"

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
              className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <span className="font-medium">{recipe.title}</span>
              <p className="mt-1 text-sm text-muted-foreground">{recipe.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
