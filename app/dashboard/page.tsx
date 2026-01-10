"use client"

import { Dashboard } from "@/components/dashboard/dashboard"
import { useOrganization } from "@/components/providers/organization-provider"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { organization, isLoading } = useOrganization()

  // Show loading skeleton while organization is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" />
          <p className="text-slate-500 dark:text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // If no organization after loading, use demo org
  const orgId = organization?._id || "demo-org-001"

  return <Dashboard />
}

