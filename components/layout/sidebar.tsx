"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  UserCheck,
  Building2,
  ClipboardCheck,
  FileText,
  BarChart3,
  Bot,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useSupabaseAuth } from "@/components/auth/supabase-auth-provider"

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "staff", "technician", "customer"] },
  { id: "customers", label: "Customers", icon: Users, roles: ["admin", "staff"] },
  { id: "vehicles", label: "Vehicles", icon: Car, roles: ["admin", "staff", "technician", "customer"] },
  { id: "appointments", label: "Appointments", icon: Calendar, roles: ["admin", "staff", "technician", "customer"] },
  { id: "technicians", label: "Technicians", icon: UserCheck, roles: ["admin", "staff"] },
  { id: "suppliers", label: "Suppliers", icon: Building2, roles: ["admin", "staff"] },
  { id: "inspections", label: "Inspections", icon: ClipboardCheck, roles: ["admin", "staff", "technician"] },
  { id: "estimates", label: "Estimates", icon: FileText, roles: ["admin", "staff", "technician"] },
  { id: "reports", label: "Reports", icon: BarChart3, roles: ["admin", "staff"] },
  { id: "ai-tools", label: "AI Tools", icon: Bot, roles: ["admin", "staff", "technician"] },
  { id: "database-test", label: "Database Test", icon: Database, roles: ["admin"] },
]

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, hasPermission } = useSupabaseAuth()

  const filteredMenuItems = menuItems.filter((item) => {
    if (!user) return false
    return item.roles.includes(user.role) && hasPermission(item.id, "read")
  })

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-900">MASS VWMS</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeModule === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "px-2",
                  isActive && "bg-blue-600 text-white hover:bg-blue-700",
                )}
                onClick={() => onModuleChange(item.id)}
              >
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="text-xs text-gray-500 text-center">
            MASS Car Workshop VWMS
            <br />
            v1.0.0
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
