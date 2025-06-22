"use client"

import { useState } from "react"
import { Sidebar } from "./components/layout/sidebar"
import { Dashboard } from "./components/dashboard/dashboard"
import { Customers } from "./components/customers/customers"
import { Vehicles } from "./components/vehicles/vehicles"
import { Appointments } from "./components/appointments/appointments"
import { AITools } from "./components/ai-tools/ai-tools"
import { TechnicianDashboard } from "./components/technicians/technician-dashboard"
import { ReportsAnalytics } from "./components/reports/reports-analytics"

export default function MassWorkshopSystem() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "customers":
        return <Customers />
      case "vehicles":
        return <Vehicles />
      case "appointments":
        return <Appointments />
      case "ai-tools":
        return <AITools />
      case "technicians":
        return <TechnicianDashboard />
      case "inventory":
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Inventory Module</h1>
            <p>Coming soon...</p>
          </div>
        )
      case "reports":
        return <ReportsAnalytics />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  )
}
