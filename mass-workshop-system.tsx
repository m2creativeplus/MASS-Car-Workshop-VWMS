"use client"

import { useState } from "react"
import { SupabaseAuthProvider } from "@/components/auth/supabase-auth-provider"
import { SupabaseLoginForm } from "@/components/auth/supabase-login-form"
import { useSupabaseAuth } from "@/components/auth/supabase-auth-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { UserMenu } from "@/components/layout/user-menu"
import { ConnectionStatus } from "@/components/connection-status"
import dynamic from "next/dynamic"

// Import all modules
import { Dashboard } from "@/components/dashboard/dashboard"
import { Customers } from "@/components/customers/customers"
import { Vehicles } from "@/components/vehicles/vehicles"
import { Appointments } from "@/components/appointments/appointments"
import { TechnicianDashboard } from "@/components/technicians/technician-dashboard"
import { ReportsAnalytics } from "@/components/reports/reports-analytics"
import { AITools } from "@/components/ai-tools/ai-tools"

// Dynamically import modules that might cause SSR issues
const SuppliersModule = dynamic(() => import("@/components/suppliers/suppliers-module"), { ssr: false })
const InspectionsModule = dynamic(() => import("@/components/inspections/inspections-module"), { ssr: false })
const EstimatesModule = dynamic(() => import("@/components/estimates/estimates-module"), { ssr: false })
const DatabaseTest = dynamic(() => import("@/components/admin/database-test"), { ssr: false })

function WorkshopSystemContent() {
  const { user, logout } = useSupabaseAuth()
  const [activeModule, setActiveModule] = useState("dashboard")

  if (!user) {
    return <SupabaseLoginForm />
  }

  const renderModule = () => {
    switch (activeModule) {
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
      case "reports":
        return <ReportsAnalytics />
      case "ai-tools":
        return <AITools />
      case "database-test":
        return user.role === "admin" ? <DatabaseTest /> : <Dashboard />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} userRole={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MASS Car Workshop</h1>
              <p className="text-sm text-gray-600">Vehicle Workshop Management System</p>
            </div>
            <UserMenu user={user} onLogout={logout} />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <ConnectionStatus />
          {renderModule()}
        </main>
      </div>
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
