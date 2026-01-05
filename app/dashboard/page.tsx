"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Dashboard } from "@/components/dashboard/dashboard"
import { TechnicianDashboard } from "@/components/dashboard/tech-dashboard"
import { useOrganization } from "@/components/providers/organization-provider"
import { useConvexAuth } from "@/components/auth/convex-auth-provider"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { organization, isLoading: orgLoading } = useOrganization()
  const { user } = useConvexAuth()
  
  // Check if demo user to skip backend query
  const isDemoUser = user?.id?.startsWith("demo-") ?? false
  
  // Only query user role if NOT a demo user
  const userRoleData = useQuery(
    api.functions.getCurrentUserRole,
    isDemoUser ? "skip" : undefined
  )

  // For demo users, default to admin role
  const role = isDemoUser ? (user?.role || "admin") : (userRoleData?.role || "admin")
  
  // Loading state: Skip for demo users 
  if (orgLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }
  
  // For real users, also wait for role data
  if (!isDemoUser && userRoleData === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }
  
  // No organization means redirect should have happened, but show loader as fallback
  if (!organization) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (role === "technician") {
    return <TechnicianDashboard orgId={organization._id} userId={userRoleData?.userId || user?.id || ""} />
  }

  // Default to Admin Dashboard for now (Admin, Staff, Custom)
  return <Dashboard orgId={organization._id} />
}
