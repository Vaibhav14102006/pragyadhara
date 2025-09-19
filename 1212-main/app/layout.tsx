import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { EnhancedLanguageProvider } from "@/components/ui/enhanced-language-context"
import { Toaster } from "@/components/ui/toaster"
import { GovernmentHeader } from "@/components/government-header"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Pragyadhara - Digital India Education Platform",
  description: "Government of India's comprehensive educational platform supporting NEP 2020, featuring interactive games, progress tracking, and multi-language support for students, teachers, and administrators.",
  keywords: ["Digital India", "Education", "NEP 2020", "Ministry of Education", "भारत सरकार", "शिक्षा", "ऑनलाइन शिक्षा", "Indian Schools", "Government Education", "Pragyadhara"],
  authors: [{ name: "Ministry of Education, Government of India" }],
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/pragyadhara-logo.svg",
  },
  openGraph: {
    title: "Pragyadhara - Digital India Education Platform",
    description: "Empowering Indian Education with technology",
    type: "website",
    locale: "hi_IN",
    siteName: "Pragyadhara",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body className={`font-sans ${dmSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="light" 
            enableSystem 
            disableTransitionOnChange
          >
            <EnhancedLanguageProvider>
              <AuthProvider>
                <GovernmentHeader />
                {children}
                <Toaster />
              </AuthProvider>
            </EnhancedLanguageProvider>
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
