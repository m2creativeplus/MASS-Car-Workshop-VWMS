"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Permission, hasPermission } from "@/lib/permissions"
import { useConvexAuth } from "convex/react"

interface PermissionGuardProps {
  permission: Permission
  fallback?: React.ReactNode
  children: React.ReactNode
}

/**
 * A wrapper component that only renders its children if the authenticated user
 * has the required permission. Optionally renders a fallback.
 */
export function PermissionGuard({ permission, fallback = null, children }: PermissionGuardProps) {
  const { isAuthenticated } = useConvexAuth()
  
  // Fetch user's role and permissions
  // Note: We need a query that returns the current user's role and permissions
  // For now, we'll assume we have a hook or query for this.
  // In a real app, you'd likely fetch this once in a layout and pass it down via Context
  
  // Placeholder: We need to implement `api.users.getCurrentUserRole`
  const userRoleData = useQuery(api.users.getCurrentUserRole)

  if (!isAuthenticated) return null
  if (!userRoleData) return null // Loading state

  const canAccess = hasPermission(
    userRoleData.role as "admin" | "staff" | "technician" | "custom",
    userRoleData.permissions,
    permission
  )

  if (!canAccess) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
