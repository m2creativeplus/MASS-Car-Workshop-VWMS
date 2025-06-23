"use client"

import { useState } from "react"
import { SupabaseAuthProvider, useSupabaseAuth } from "./components/auth/supabase-auth-provider"
import { SupabaseLoginForm } from "./components/auth/supabase-login-form"
import { Sidebar } from "./components/layout/sidebar"
import { Dashboard } from "./components/dashboard/dashboard"
import { Customers } from "./components/customers/customers"
import { Vehicles } from "./components/vehicles/vehicles"
import { Appointments } from "./components/appointments/appointments"
import { TechnicianDashboard } from "./components/technicians/technician-dashboard"
import { SuppliersModule } from "./components/suppliers/suppliers-module"
import { InspectionsModule } from "./components/inspections/inspections-module"
import { EstimatesModule } from "./components/estimates/estimates-module"
import { ReportsAnalytics } from "./components/reports/reports-analytics"
import { AITools } from "./components/ai-tools/ai-tools"

function WorkshopSystemContent() {
  const { user, isLoading } = useSupabaseAuth()
  const [activeSection, setActiveSection] = useState("dashboard")

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-medium">Loading MASS Workshop System...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <SupabaseLoginForm />
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "customers":
        return <Customers />
      case "vehicles":
        return <Vehicles />
      case "appointments":
        return <Appointments />
      case "technicians":
        return <TechnicianDashboard />
      case "suppliers":
        return <SuppliersModule />
      case "inspections":
        return <InspectionsModule />
      case "estimates":
        return <EstimatesModule />
      case "inventory":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <p>Coming soon...</p>
          </div>
        )
      case "reports":
        return <ReportsAnalytics />
      case "ai-tools":
        return <AITools />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">{renderActiveSection()}</main>
    </div>
  )
}

export default function MassWorkshopSystem() {
  return (
    <SupabaseAuthProvider>
      <WorkshopSystemContent />
    </SupabaseAuthProvider>
  )
}
