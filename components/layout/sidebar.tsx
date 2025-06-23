"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  Wrench,
  Package,
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calculator,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "../auth/auth-provider"
import { UserMenu } from "./user-menu"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, hasPermission } = useAuth()

  const allMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "customers", label: "Customers", icon: Users },
    { id: "vehicles", label: "Vehicles", icon: Car },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "technicians", label: "Technicians", icon: Wrench },
    { id: "suppliers", label: "Suppliers", icon: Package },
    { id: "inspections", label: "Inspections", icon: FileText },
    { id: "estimates", label: "Estimates", icon: Calculator },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "ai-tools", label: "LOVABLE AI", icon: Bot },
  ]

  const menuItems = allMenuItems.filter((item) => hasPermission(item.id, "read"))

  return (
    <div
      className={cn(
        "bg-slate-900 text-white h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <div>
              <h1 className="font-bold text-sm">MASS Car Workshop</h1>
              <p className="text-xs text-slate-400">Vehicle Workshop Management System</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-white"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start mb-1 text-slate-300 hover:text-white hover:bg-slate-800",
                activeSection === item.id && "bg-blue-600 text-white hover:bg-blue-700",
                isCollapsed && "px-2",
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <UserMenu />
            </div>
            <div className="text-xs text-slate-400">
              <p>Hargeisa, Somaliland</p>
              <p className="mt-1">v2.1.0</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <UserMenu />
          </div>
        )}
      </div>
    </div>
  )
}
