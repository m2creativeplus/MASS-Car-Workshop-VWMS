"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Dashboard } from "@/components/dashboard/dashboard"
import { TechnicianDashboard } from "@/components/dashboard/tech-dashboard"
import { useOrganization } from "@/components/providers/organization-provider"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { organization } = useOrganization()
  const userRoleData = useQuery(api.functions.getCurrentUserRole)

  if (!organization || userRoleData === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Determine which dashboard to show
  const role = userRoleData?.role || "admin"

  if (role === "technician") {
    return <TechnicianDashboard orgId={organization._id} userId={userRoleData?.userId || ""} />
  }

  // Default to Admin Dashboard for now (Admin, Staff, Custom)
  return <Dashboard orgId={organization._id} />
}
