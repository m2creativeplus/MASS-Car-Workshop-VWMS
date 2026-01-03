"use client"

import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useConvexAuth } from "@/components/auth/convex-auth-provider"

interface Organization {
  _id: string
  name: string
  slug: string
  role: string
}

interface OrganizationContextType {
  organization: Organization | null
  setOrganization: (org: Organization) => void
  organizations: Organization[]
  isLoading: boolean
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

// Demo organization for demo users
const DEMO_ORGANIZATION: Organization = {
  _id: "demo-org-001",
  name: "MASS Car Workshop",
  slug: "mass-hargeisa",
  role: "admin"
}

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useConvexAuth()
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null)
  
  // Check if this is a demo user (ID starts with "demo-")
  const isDemoUser = user?.id?.startsWith("demo-") ?? false
  
  // Only query Convex for real users who are logged in and not demo users
  const shouldQueryConvex = !authLoading && user && !isDemoUser
  const userOrgs = useQuery(
    api.functions.getUserOrgs, 
    shouldQueryConvex && user?._id ? { userId: user._id as any } : "skip"
  )

  // For demo users, provide mock organization; for real users, use Convex data
  const organizations = useMemo(() => {
    if (isDemoUser && user) {
      return [DEMO_ORGANIZATION]
    }
    return userOrgs || []
  }, [isDemoUser, user, userOrgs])
  
  // Loading states:
  // 1. Auth is loading -> we're loading
  // 2. Demo user with a user object -> NOT loading (instant data)
  // 3. Real user without Convex data yet -> loading
  const isLoading = authLoading || (!isDemoUser && !userOrgs && !!user)

  // Set default active org when organizations change
  useEffect(() => {
    if (organizations.length > 0 && !activeOrgId) {
      setActiveOrgId(organizations[0]._id)
    }
  }, [organizations, activeOrgId])

  const activeOrg = organizations.find(o => o._id === activeOrgId) || (organizations.length > 0 ? organizations[0] : null)

  const setOrganization = (org: Organization) => {
    setActiveOrgId(org._id)
  }

  return (
    <OrganizationContext.Provider value={{
      organization: activeOrg,
      setOrganization,
      organizations,
      isLoading
    }}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error("useOrganization must be used within an OrganizationProvider")
  }
  return context
}

