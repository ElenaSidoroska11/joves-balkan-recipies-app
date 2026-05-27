import Link from "next/link"

import Image from "@/lib/next-image"
import { notFound } from "next/navigation"

import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/recipes"
import { publicPath } from "@/lib/utils"

import type { Metadata } from "next"
import { ArrowLeft, Clock, MapPin, Users } from "lucide-react"

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
  return {
    title: recipe.title,
    description: recipe.description,
  }
}

function formatTime(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (m === 0) return `${h} h`
  return `${h} h ${m} min`
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
      </h1>

      {recipe.image && (
        <div className="relative mt-6 aspect-4/3 w-full max-w-2xl overflow-hidden rounded-xl border border-border/60 bg-muted/30 shadow-sm">
          <Image
            src={publicPath(recipe.image)}
            alt={recipe.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 42rem"
          />
        </div>
      )}

      <p className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground">
        {recipe.description}
      </p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recipe.region && (
          <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/25 px-4 py-3 shadow-sm">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-muted-foreground"
              aria-hidden
            >
              <MapPin className="size-4" />
            </div>
            <div className="min-w-0">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Region / style
              </dt>
              <dd className="mt-0.5 text-sm font-medium text-foreground">
                {recipe.region}
              </dd>
            </div>
          </div>
        )}
        {recipe.servings != null && (
          <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/25 px-4 py-3 shadow-sm">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-muted-foreground"
              aria-hidden
            >
              <Users className="size-4" />
            </div>
            <div className="min-w-0">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Serves
              </dt>
              <dd className="mt-0.5 text-sm font-medium text-foreground">
                {recipe.servings}
              </dd>
            </div>
          </div>
        )}
        {totalTime != null && totalTime > 0 && (
          <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/25 px-4 py-3 shadow-sm sm:col-span-2 lg:col-span-1">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-muted-foreground"
              aria-hidden
            >
              <Clock className="size-4" />
            </div>
            <div className="min-w-0">
              <dd className="mt-0.5 text-sm font-medium text-foreground">
                {formatTime(totalTime)}
              </dd>
              {(recipe.prepMinutes != null || recipe.cookMinutes != null) && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {[
                    recipe.prepMinutes != null &&
                      `prep ${formatTime(recipe.prepMinutes)}`,
                    recipe.cookMinutes != null &&
                      `cook ${formatTime(recipe.cookMinutes)}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
          </div>
        )}
      </dl>

      {recipe.tags && recipe.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-medium">Ingredients</h2>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed">
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>
              {ing.amount && (
                <span className="text-muted-foreground">{ing.amount} </span>
              )}
              {ing.item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Method</h2>
        <ol className="mt-3 list-decimal space-y-3 ps-5 text-sm leading-relaxed">
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {recipe.notes && (
        <section className="mt-10 rounded-lg border border-border bg-muted/40 p-4">
          <h2 className="text-sm font-medium">Notes from the kitchen</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {recipe.notes}
          </p>
        </section>
      )}
    </article>
  )
}
