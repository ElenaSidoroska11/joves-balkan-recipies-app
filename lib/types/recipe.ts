export type Ingredient = {
  amount?: string
  item: string
}

export type Recipe = {
  slug: string
  image?: string
  title: string
  description: string
  region?: string
  prepMinutes?: number
  cookMinutes?: number
  servings?: number
  tags?: string[]
  ingredients: Ingredient[]
  steps: string[]
  notes?: string
}
