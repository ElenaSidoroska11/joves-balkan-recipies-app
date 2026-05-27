export type Ingredient = {
  amount?: string
  item: string
}

export type RecipeLocaleContent = {
  description: string
  region?: string
  tags?: string[]
  ingredients: Ingredient[]
  steps: string[]
  notes?: string
}

export type Recipe = {
  slug: string
  image?: string
  title: string
  titleEn?: string
  description: string
  localeMk?: RecipeLocaleContent
  region?: string
  prepMinutes?: number
  cookMinutes?: number
  servings?: number
  tags?: string[]
  ingredients: Ingredient[]
  steps: string[]
  notes?: string
}
