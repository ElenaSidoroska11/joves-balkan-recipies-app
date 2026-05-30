import { Geist, Geist_Mono } from "next/font/google"

import type { Metadata, Viewport } from "next"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { jovePhotos } from "@/lib/jove-photos"
import { cn } from "@/lib/utils"

const siteImage = jovePhotos[1].src

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL("http://localhost:3000"),
  title: {
    default: "Jove’s Balkan recipes",
    template: "%s · Jove’s Balkan recipes",
  },
  description:
    "Balkan home cooking from Jove’s kitchen — family recipes, written for the table.",
  openGraph: {
    title: "Jove’s Balkan recipes",
    description:
      "Balkan home cooking from Jove’s kitchen — family recipes, written for the table.",
    images: [{ url: siteImage, alt: jovePhotos[1].alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jove’s Balkan recipes",
    description:
      "Balkan home cooking from Jove’s kitchen — family recipes, written for the table.",
    images: [siteImage],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b3532" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1a1a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <div className="relative z-0 flex min-h-svh flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
