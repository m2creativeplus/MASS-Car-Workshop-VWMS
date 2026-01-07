"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Users, 
  Shield, 
  Eye, 
  EyeOff, 
  LayoutDashboard,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  ChevronRight,
  Save,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Role Data
const SAMPLE_ROLES = [
  {
    id: "role-owner",
    name: "Owner",
    description: "Full system access with revenue visibility",
    priority: 1,
    permissions: {
      dashboard: true,
      workOrders: true,
      customers: true,
      vehicles: true,
      inventory: true,
      reports: true,
      financials: true,
      settings: true,
    }
  },
  {
    id: "role-advisor",
    name: "Service Advisor",
    description: "Customer-facing operations without financials",
    priority: 2,
    permissions: {
      dashboard: true,
      workOrders: true,
      customers: true,
      vehicles: true,
      inventory: false,
      reports: false,
      financials: false,
      settings: false,
    }
  },
  {
    id: "role-tech",
    name: "Technician",
    description: "Job-focused view only",
    priority: 3,
    permissions: {
      dashboard: false,
      workOrders: true,
      customers: false,
      vehicles: true,
      inventory: false,
      reports: false,
      financials: false,
      settings: false,
    }
  }
]

const PERMISSION_LABELS: Record<string, { label: string; icon: any; sensitive: boolean }> = {
  dashboard: { label: "Dashboard", icon: LayoutDashboard, sensitive: false },
  workOrders: { label: "Work Orders", icon: Wrench, sensitive: false },
  customers: { label: "Customers", icon: Users, sensitive: false },
  vehicles: { label: "Vehicles", icon: FileText, sensitive: false },
  inventory: { label: "Inventory", icon: FileText, sensitive: false },
  reports: { label: "Reports", icon: FileText, sensitive: true },
  financials: { label: "Financials", icon: DollarSign, sensitive: true },
  settings: { label: "Settings", icon: Settings, sensitive: true },
}

export function RoleExperienceEditor() {
  const [selectedRole, setSelectedRole] = useState(SAMPLE_ROLES[0])
  const [isSaving, setIsSaving] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT: Role List */}
      <div className="lg:col-span-4 space-y-4">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-500" />
              Role Profiles
            </CardTitle>
            <CardDescription>
              Define what each role can see and do.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {SAMPLE_ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all",
                  selectedRole.id === role.id 
                    ? "bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500" 
                    : "bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                    role.name === "Owner" && "bg-gradient-to-br from-orange-500 to-red-500",
                    role.name === "Service Advisor" && "bg-gradient-to-br from-blue-500 to-cyan-500",
                    role.name === "Technician" && "bg-gradient-to-br from-slate-500 to-slate-600",
                  )}>
                    {role.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">{role.name}</p>
                    <p className="text-xs text-slate-500">Priority {role.priority}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Permission Editor */}
      <div className="lg:col-span-8">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {selectedRole.name} Experience
                </CardTitle>
                <CardDescription>{selectedRole.description}</CardDescription>
              </div>
              <Button className="gap-2" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Standard Permissions */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Module Access
              </h3>
              {Object.entries(selectedRole.permissions)
                .filter(([key]) => !PERMISSION_LABELS[key]?.sensitive)
                .map(([key, value]) => {
                  const config = PERMISSION_LABELS[key]
                  const Icon = config?.icon || FileText
                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-slate-400" />
                        <span className="font-medium">{config?.label || key}</span>
                      </div>
                      <Switch checked={value} />
                    </div>
                  )
                })}
            </div>

            <Separator />

            {/* Sensitive Permissions */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider flex items-center gap-2">
                <EyeOff className="w-4 h-4" /> Sensitive Access
              </h3>
              {Object.entries(selectedRole.permissions)
                .filter(([key]) => PERMISSION_LABELS[key]?.sensitive)
                .map(([key, value]) => {
                  const config = PERMISSION_LABELS[key]
                  const Icon = config?.icon || FileText
                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-900/30">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-red-400" />
                        <span className="font-medium text-red-700 dark:text-red-300">{config?.label || key}</span>
                      </div>
                      <Switch checked={value} />
                    </div>
                  )
                })}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
