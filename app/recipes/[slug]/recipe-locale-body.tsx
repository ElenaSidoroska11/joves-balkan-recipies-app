"use client"

import { useMemo, useState } from "react"
import { Clock, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { Ingredient, Recipe } from "@/lib/types/recipe"

type Locale = "en" | "mk"

const UI = {
  en: {
    regionLabel: "Region / style",
    servesLabel: "Serves",
    prep: "prep",
    cook: "cook",
    ingredients: "Ingredients",
    method: "Method",
    notes: "Notes from the kitchen",
    langNames: { en: "English", mk: "Macedonian" } as const,
  },
  mk: {
    regionLabel: "Регион / стил",
    servesLabel: "Порции",
    prep: "подготвување",
    cook: "готвење",
    ingredients: "Состојки",
    method: "Подготовка",
    notes: "Белешки од кујната",
    langNames: { en: "англиски", mk: "македонски" } as const,
  },
} as const

function formatTimeMinutes(minutes: number, locale: Locale) {
  if (locale === "en") {
    if (minutes < 60) return `${minutes} min`
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    if (m === 0) return `${h} h`
    return `${h} h ${m} min`
  }
  if (minutes < 60) return `${minutes} мин`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (m === 0) return `${h} ч`
  return `${h} ч ${m} мин`
}

function resolveCopy(recipe: Recipe, locale: Locale) {
  const mk = recipe.localeMk
  if (locale === "en" || !mk) {
    return {
      description: recipe.description,
      region: recipe.region,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      notes: recipe.notes,
      tags: recipe.tags,
    }
  }
  return {
    description: mk.description,
    region: mk.region ?? recipe.region,
    ingredients: mk.ingredients,
    steps: mk.steps,
    notes: mk.notes ?? recipe.notes,
    tags: mk.tags ?? recipe.tags,
  }
}

type RecipeLocaleBodyProps = {
  recipe: Recipe
  totalTime: number | null
}

export function RecipeLocaleBody({ recipe, totalTime }: RecipeLocaleBodyProps) {
  const hasMk = Boolean(recipe.localeMk)
  const [locale, setLocale] = useState<Locale>("en")

  const copy = useMemo(
    () => resolveCopy(recipe, hasMk ? locale : "en"),
    [recipe, locale, hasMk]
  )

  const labels = UI[hasMk ? locale : "en"]

  const effectiveLocale = hasMk ? locale : "en"

  return (
    <>
      <div
        className="mt-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between"
        role="tablist"
        aria-label="Recipe language"
      >
        <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {effectiveLocale === "mk" ? "Јазик" : "Language"}
        </div>
        <div className="inline-flex w-fit rounded-lg border border-border bg-muted/30 p-1">
          {(["en", "mk"] as const).map((code) => {
            const disabled = code === "mk" && !hasMk
            const active = effectiveLocale === code
            return (
              <Button
                key={code}
                type="button"
                role="tab"
                variant="ghost"
                size="sm"
                disabled={disabled}
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                title={
                  disabled
                    ? effectiveLocale === "mk"
                      ? "Нема македонски превод"
                      : "Macedonian version unavailable"
                    : undefined
                }
                className={cn(
                  "min-w-12 rounded-md px-4 font-semibold",
                  active &&
                    "cursor-default bg-primary text-primary-foreground shadow-sm hover:bg-primary! hover:text-primary-foreground!",
                  !active &&
                    "cursor-pointer text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
                onClick={() => setLocale(code)}
              >
                {code.toUpperCase()}
              </Button>
            )
          })}
        </div>
      </div>

      <p className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground">
        {copy.description}
      </p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {copy.region && (
          <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/25 px-4 py-3 shadow-sm">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-muted-foreground"
              aria-hidden
            >
              <MapPin className="size-4" />
            </div>
            <div className="min-w-0">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {labels.regionLabel}
              </dt>
              <dd className="mt-0.5 text-sm font-medium text-foreground">
                {copy.region}
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
                {labels.servesLabel}
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
                {formatTimeMinutes(totalTime, effectiveLocale)}
              </dd>
              {(recipe.prepMinutes != null || recipe.cookMinutes != null) && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {[
                    recipe.prepMinutes != null &&
                      `${labels.prep} ${formatTimeMinutes(recipe.prepMinutes, effectiveLocale)}`,
                    recipe.cookMinutes != null &&
                      `${labels.cook} ${formatTimeMinutes(recipe.cookMinutes, effectiveLocale)}`,
                  ]
                    .filter(Boolean)
                    .join(
                      effectiveLocale === "mk" ? " · " : " · "
                    )}
                </p>
              )}
            </div>
          </div>
        )}
      </dl>

      {copy.tags && copy.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {copy.tags.map((tag) => (
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
        <h2 className="text-lg font-medium">{labels.ingredients}</h2>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed">
          {copy.ingredients.map((ing: Ingredient, i: number) => (
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
        <h2 className="text-lg font-medium">{labels.method}</h2>
        <ol className="mt-3 list-decimal space-y-3 ps-5 text-sm leading-relaxed">
          {copy.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {copy.notes && (
        <section className="mt-10 rounded-lg border border-border bg-muted/40 p-4">
          <h2 className="text-sm font-medium">{labels.notes}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {copy.notes}
          </p>
        </section>
      )}
    </>
  )
}
