import type { Metadata } from 'next'
import './globals.css'
import { ConvexClientProvider } from '@/components/providers/convex-provider'

export const metadata: Metadata = {
  title: 'MASS Car Workshop - Vehicle Workshop Management System',
  description: 'Complete vehicle workshop management solution for automotive service centers. Manage customers, vehicles, appointments, work orders, inventory, and more.',
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
      <body>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  )
}

