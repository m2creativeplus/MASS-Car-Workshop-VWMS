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

  const getModuleTitle = (id: string) => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard Overview",
      customers: "Customer Management",
      vehicles: "Vehicle Registry",
      appointments: "Service Schedule",
      technicians: "Technician Portal",
      suppliers: "Supplier Directory",
      inspections: "Digital Vehicle Inspections",
      estimates: "Estimates & Invoices",
      reports: "Analytics & Reports",
      "ai-tools": "AI Assistant",
      "database-test": "System Diagnostics"
    }
    return titles[id] || "Dashboard"
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans antialiased text-foreground">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} userRole={user.role} />
      
      <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        {/* Glass Header */}
        <header className="absolute top-0 left-0 right-0 h-16 glass-card z-10 mx-6 mt-4 rounded-xl flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              {getModuleTitle(activeModule)}
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <ConnectionStatus />
             <UserMenu />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 pt-24 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderModule()}
          </div>
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
