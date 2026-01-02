"use client"

import MassWorkshopSystem from "@/mass-workshop-system"
import { RoleGuard } from "@/components/auth/role-guard"

export default function DashboardPage() {
  return (
    <RoleGuard allowedRoles={["admin", "staff", "technician"]}>
      <MassWorkshopSystem />
    </RoleGuard>
  )
}
