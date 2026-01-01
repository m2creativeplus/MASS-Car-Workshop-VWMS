import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import './globals.css'
// Convex provider disabled until NEXT_PUBLIC_CONVEX_URL is set
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { PHProvider } from "@/components/providers/posthog-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MASS Car Workshop - Vehicle Workshop Management System',
  description: 'Comprehensive workshop management solution for automotive businesses',
  generator: 'Next.js',
  keywords: ['car workshop', 'vehicle management', 'automotive', 'service center', 'work orders'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PHProvider>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </PHProvider>
      </body>
    </html>
  )
}
