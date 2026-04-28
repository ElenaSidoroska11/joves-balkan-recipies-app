"use client"

const FAVOURITES_STORAGE_KEY = "joves-favourite-recipes"

function canUseStorage() {
  return typeof window !== "undefined"
}

export function getFavouriteSlugs(): string[] {
  if (!canUseStorage()) {
    return []
  }

  try {
    const raw = window.localStorage.getItem(FAVOURITES_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((item): item is string => typeof item === "string")
  } catch {
    return []
  }
}

export function setFavouriteSlugs(slugs: string[]) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(slugs))
}

export function isFavourite(slug: string) {
  return getFavouriteSlugs().includes(slug)
}

export function toggleFavourite(slug: string) {
  const current = getFavouriteSlugs()
  const next = current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug]

  setFavouriteSlugs(next)
  return next
}
