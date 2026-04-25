import type { Metadata } from "next"
import Link from "next/link"

import Image from "@/lib/next-image"

import { Button } from "@/components/ui/button"
import { jovePhotos } from "@/lib/jove-photos"
import { getAllRecipes } from "@/lib/recipes"
import { publicPath } from "@/lib/utils"

export const metadata: Metadata = {
  title: { absolute: "Jove’s Balkan recipes" },
  description:
    "Jove’s Balkan recipes — home cooking, family story, and dishes from a mother’s kitchen.",
}

function HeroPhotoFrame({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <div
      className={[
        "overflow-hidden rounded-xl bg-white p-1.5",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,1),0_4px_16px_rgba(255,255,255,0.95),0_12px_32px_-6px_rgba(0,0,0,0.08),0_20px_50px_-12px_rgba(0,0,0,0.06)]",
        "relative z-10 transition-transform duration-500 hover:z-30 hover:scale-[1.02]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 200px"
        />
      </div>
    </div>
  )
}

export default function HomePage() {
  const [first, ...otherRecipes] = getAllRecipes()
  const recipePreview = [first, ...otherRecipes].filter(Boolean).slice(0, 3)

  return (
    <main className="min-h-svh">
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-24">
        <div className="site-container grid items-center gap-12 md:min-h-[min(72vh,560px)] md:grid-cols-2 md:items-center md:gap-10 lg:gap-16">
          <div className="min-w-0 text-left">
            <p className="text-[0.7rem] font-medium tracking-[0.28em] text-muted-foreground uppercase md:text-xs">
              Balkan home cooking
            </p>
            <h1 className="mt-6 max-w-xl text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.04] font-semibold tracking-tight text-foreground">
              <span className="block text-balance">Food from my mother</span>
              <span className="mt-2 block text-balance">
                <span className="text-primary">Jove&apos;s</span> table
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-balance text-muted-foreground md:mt-8 md:text-lg">
              Recipes written down the way we actually cook — a little of this,
              a little of that, and a lot of care. This site is a love letter in
              dishes.
            </p>
            <div className="mt-2 h-px w-20 bg-primary/35" aria-hidden />
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <Button
                asChild
                size="lg"
                className="h-10 px-6 text-sm font-medium"
              >
                <Link href="/recipes">View recipes</Link>
              </Button>
              {first && (
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="h-10 border-border/60 bg-white/50 px-6 text-sm font-medium"
                >
                  <Link href={`/recipes/${first.slug}`}>
                    Start with {first.title}
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="flex w-full justify-center md:min-h-0 md:items-center md:justify-end">
            <div className="w-full max-w-[min(24rem,100%)] sm:max-w-104">
              <div className="grid grid-cols-2 items-start gap-x-6 gap-y-5 sm:gap-x-8 sm:gap-y-6">
                <HeroPhotoFrame
                  src={jovePhotos[0].src}
                  alt={jovePhotos[0].alt}
                  priority
                  className="aspect-3/4 w-full max-w-full rotate-2"
                />
                <div className="translate-y-3 sm:translate-y-4">
                  <HeroPhotoFrame
                    src={jovePhotos[1].src}
                    alt={jovePhotos[1].alt}
                    className="aspect-3/4 w-full max-w-full -rotate-3"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-center sm:mt-9">
                <div className="w-full max-w-[16rem] sm:max-w-70">
                  <HeroPhotoFrame
                    src={jovePhotos[2].src}
                    alt={jovePhotos[2].alt}
                    className="aspect-4/3 w-full max-w-full rotate-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {recipePreview.length > 0 && (
        <section className="border-t border-border/50 px-4 py-16 sm:px-6 md:py-20">
          <div className="site-container">
            <div className="mb-8 flex justify-end">
              <Button
                asChild
                variant="outline"
                className="border-border/60 bg-white/30"
              >
                <Link href="/recipes">All recipes</Link>
              </Button>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recipePreview.map((recipe) => (
                <li key={recipe.slug}>
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
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h3 className="text-base leading-snug font-medium text-foreground group-hover:underline group-hover:decoration-primary/50 group-hover:underline-offset-2">
                          {recipe.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {recipe.description}
                        </p>
                      </div>
                      {recipe.prepMinutes != null &&
                        recipe.cookMinutes != null && (
                          <p className="mt-4 text-xs text-muted-foreground/90">
                            ~{recipe.prepMinutes + recipe.cookMinutes} min
                          </p>
                        )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  )
}
