"use client"

import { InventoryManagement } from "@/components/inventory/inventory-management"
import { useOrganization } from "@/components/providers/organization-provider"
import { Loader2 } from "lucide-react"

export default function InventoryPage() {
  const { organization, isLoading } = useOrganization()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500" />
          <p className="text-slate-500 dark:text-slate-400">Loading inventory...</p>
        </div>
      </div>
    )
  }

  const orgId = organization?._id || "demo-org-001"

  return <InventoryManagement orgId={orgId} />
}

