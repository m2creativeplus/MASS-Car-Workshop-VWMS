import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import './globals.css'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { PHProvider } from "@/components/providers/posthog-provider";
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MASS Car Workshop - Vehicle Workshop Management System',
  description: 'Comprehensive workshop management solution for automotive businesses',
  generator: 'Next.js',
  keywords: ['car workshop', 'vehicle management', 'automotive', 'service center', 'work orders'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MASS Workshop',
  },
}

export const viewport = {
  themeColor: '#B68A35',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Native app feel
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PHProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="data-theme"
              defaultTheme="golden"
              enableSystem={false}
              themes={['golden', 'silver', 'green', 'red']}
            >
              <div className="flex flex-col min-h-screen">
                {children}
              </div>
              <Toaster />
            </ThemeProvider>
          </ConvexClientProvider>
        </PHProvider>
      </body>
    </html>
  )
}
// FORCE DEPLOY 1767448768
