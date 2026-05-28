# Jove’s Balkan Recipes

A personal recipe site celebrating Balkan home cooking — family dishes, bilingual recipe pages, and a warm, editorial feel. Built as a portfolio project and deployed on [Vercel](https://vercel.com).

Link : https://joves-balkan-recipies-app.vercel.app/

## About

**Jove’s Balkan recipes** is a Next.js app that presents a curated collection of dishes from a mother’s kitchen. The home page introduces the story behind the food; the recipe catalog lets visitors browse, search, and save favourites. Each recipe detail page can be read in **English** or **Macedonian**, with ingredients, method, timing, and notes.

This project showcases modern React patterns (App Router, client islands for interactivity), static content from JSON, accessible UI, and a cohesive visual design with light/dark theme support.

---

## Features

- **Home** — Hero, family photos, and a preview of featured recipes
- **Recipe catalog** — Browse all dishes with client-side search
- **Recipe detail** — Full ingredients, steps, prep/cook time, servings, and kitchen notes
- **Bilingual UI** — Toggle between English and Macedonian on recipe pages
- **Favourites** — Save recipes in the browser (`localStorage`) and view them on a dedicated page
- **Theme** — Light and dark mode via `next-themes`
- **Responsive layout** — Mobile-first design with sticky navigation

---

## Tech stack

| Area | Tools |
|------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI | [shadcn/ui](https://ui.shadcn.com), Radix UI, Lucide icons |
| Content | Static JSON (`content/recipes.json`) |
| Hosting | Vercel |

---

## Getting started

### Prerequisites

- Node.js 
- npm 

### Install and run locally

```bash
git clone https://github.com/YOUR_USERNAME/joves-balkan-recipies-app.git
cd joves-balkan-recipies-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build      # Production build
npm run start      # Run production server locally
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run format     # Prettier (TS/TSX)
```



## Project structure

```
app/                 # Pages and layouts (App Router)
components/          # Header, UI primitives (shadcn)
content/             # recipes.json — recipe data
lib/                 # Recipes helpers, favourites, types, utils
public/              # Recipe and family images
```

To add UI components from shadcn:

```bash
npx shadcn@latest add button
```

---


---
