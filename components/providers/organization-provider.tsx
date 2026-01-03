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
  const { user } = useConvexAuth()
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null)
  
  // Check if this is a demo user (ID starts with "demo-")
  const isDemoUser = user?.id?.startsWith("demo-") || false
  
  // Only query Convex for real users, not demo users
  const userOrgs = useQuery(
    api.functions.getUserOrgs, 
    !isDemoUser && user?._id ? { userId: user._id as any } : "skip"
  )

  // For demo users, provide mock organization; for real users, use Convex data
  const organizations = useMemo(() => {
    if (isDemoUser) {
      return [DEMO_ORGANIZATION]
    }
    return userOrgs || []
  }, [isDemoUser, userOrgs])
  
  // Demo users are never "loading" - they get instant mock data
  const isLoading = isDemoUser ? false : userOrgs === undefined

  // Set default active org
  useEffect(() => {
    if (!activeOrgId && organizations.length > 0) {
      setActiveOrgId(organizations[0]._id)
    }
  }, [organizations, activeOrgId])

  const activeOrg = organizations.find(o => o._id === activeOrgId) || null

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
