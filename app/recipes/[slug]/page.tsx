import Link from "next/link"

import Image from "@/lib/next-image"
import { notFound } from "next/navigation"

import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/recipes"
import { publicPath } from "@/lib/utils"
import { RecipeLocaleBody } from "@/app/recipes/[slug]/recipe-locale-body"

import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllRecipeSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)
  if (!recipe) {
    return { title: "Recipe" }
  }
  const metaTitle = recipe.titleEn
    ? `${recipe.title} (${recipe.titleEn})`
    : recipe.title

  return {
    title: metaTitle,
    description: recipe.description,
  }
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)
  if (!recipe) {
    notFound()
  }

  const totalTime =
    recipe.prepMinutes != null || recipe.cookMinutes != null
      ? (recipe.prepMinutes ?? 0) + (recipe.cookMinutes ?? 0)
      : null

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/recipes"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4 shrink-0" aria-hidden />
        <span>All recipes</span>
      </Link>
      <h1 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
        {recipe.title}
        {recipe.titleEn ? (
          <span className="text-muted-foreground font-normal">
            {" "}
            ({recipe.titleEn})
          </span>
        ) : null}
      </h1>

      {recipe.image && (
        <div className="relative mt-6 aspect-4/3 w-full max-w-2xl overflow-hidden rounded-xl border border-border/60 bg-muted/30 shadow-sm">
          <Image
            src={publicPath(recipe.image)}
            alt={
              recipe.titleEn
                ? `${recipe.title} (${recipe.titleEn})`
                : recipe.title
            }
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 42rem"
          />
        </div>
      )}

      <RecipeLocaleBody recipe={recipe} totalTime={totalTime} />
    </article>
  )
}
