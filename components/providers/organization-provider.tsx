"use client"

import { createContext, useContext, useState, useEffect } from "react"
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

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useConvexAuth()
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null)
  
  // Fetch user's organizations
  const userOrgs = useQuery(api.functions.getUserOrgs, 
    user?._id ? { userId: user._id as any } : "skip"
  )

  const organizations = userOrgs || []
  const isLoading = userOrgs === undefined

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
