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
import { AuthProvider, useAuth } from "./components/auth/auth-provider"
import { LoginForm } from "./components/auth/login-form"

function MassWorkshopContent() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")

  // Move all the existing renderContent logic here
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

  if (!user) {
    return null // This will be handled by the parent component
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

export default function MassWorkshopSystem() {
  return (
    <AuthProvider>
      <MassWorkshopApp />
    </AuthProvider>
  )
}

function MassWorkshopApp() {
  const { user, login, isLoading } = useAuth()
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    setLoginError(null)
    const success = await login(email, password)
    if (!success) {
      setLoginError("Invalid email or password. Please try again.")
    }
    return success
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} isLoading={isLoading} error={loginError || undefined} />
  }

  return <MassWorkshopContent />
}
