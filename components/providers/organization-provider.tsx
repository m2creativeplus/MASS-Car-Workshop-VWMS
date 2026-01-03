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

// Demo organization for demo users - instant access, no backend query needed
const DEMO_ORGANIZATION: Organization = {
  _id: "demo-org-001",
  name: "MASS Car Workshop",
  slug: "mass-hargeisa",
  role: "admin"
}

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useConvexAuth()
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null)
  
  // ROBUSTNESS FIX: Check localStorage directly for demo flag to avoid React Context race conditions
  // This ensures we detect demo mode even if useConvexAuth is slightly delayed
  const isLocalStorageDemo = typeof window !== 'undefined' ? 
    window.localStorage.getItem("mass_demo_mode") === "true" || window.localStorage.getItem("convex_demo_user") !== null
    : false

  const isDemoUser = Boolean(user?.id?.startsWith("demo-")) || isLocalStorageDemo
  
  // Query convex only if NOT a demo user (double check)
  const shouldQueryConvex = Boolean(!authLoading && user && !isDemoUser)
  
  const userOrgs = useQuery(
    api.functions.getUserOrgs, 
    shouldQueryConvex ? { userId: user?.id as any } : "skip" // Cast user.id to any to satisfy Convex type
  )

  const organizations = useMemo(() => {
    if (isDemoUser) {
      return [DEMO_ORGANIZATION]
    }
    return userOrgs || []
  }, [isDemoUser, userOrgs])
  
  // Loading state with absolute priority for Demo mode
  const isLoading = useMemo(() => {
    // 1. If we know it's a demo user (via Context or LocalStorage), WE ARE NEVER LOADING.
    // This is the critical fix. Instant access.
    if (isDemoUser) return false

    // 2. If Auth is loading, we are loading
    if (authLoading) return true
    
    // 3. If no user, we aren't "loading orgs", we are just unauthenticated (handled by AuthGuard)
    if (!user) return false
    
    // 4. Real user state: Loading only if userOrgs is undefined
    return userOrgs === undefined
  }, [authLoading, user, isDemoUser, userOrgs])

  // Debug logging (can be removed in production)
  useEffect(() => {
    console.log("[OrgProvider] State:", { 
      authLoading, 
      hasUser: !!user,
      userId: user?.id,
      isDemoUser, 
      shouldQueryConvex,
      userOrgsStatus: userOrgs === undefined ? "pending" : userOrgs === null ? "null" : `${userOrgs.length} orgs`,
      isLoading,
      organizations: organizations.map(o => o.name)
    })
  }, [authLoading, user, isDemoUser, shouldQueryConvex, userOrgs, isLoading, organizations])

  // Set default active org when organizations change
  useEffect(() => {
    if (organizations.length > 0 && !activeOrgId) {
      setActiveOrgId(organizations[0]._id)
    }
  }, [organizations, activeOrgId])

  const activeOrg = organizations.find(o => o._id === activeOrgId) || 
                   (organizations.length > 0 ? organizations[0] : null)

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
// force deploy 1767406620
