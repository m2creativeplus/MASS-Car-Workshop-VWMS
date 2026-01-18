"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Menu,
  GripVertical,
  LayoutDashboard,
  Wrench,
  Users,
  Car,
  Calendar,
  Package,
  DollarSign,
  ClipboardCheck,
  BarChart3,
  Truck,
  Bot,
  Settings,
  Save,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Default Menu Items (initial state if nothing in DB)
const DEFAULT_MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/dashboard", roles: ["owner", "admin", "staff", "tech"], order: 0, isActive: true },
  { id: "work-orders", label: "Work Orders", icon: "Wrench", path: "/dashboard/work-orders", roles: ["owner", "admin", "staff", "tech"], order: 1, isActive: true },
  { id: "customers", label: "Customers", icon: "Users", path: "/dashboard/customers", roles: ["owner", "admin", "staff"], order: 2, isActive: true },
  { id: "vehicles", label: "Vehicles", icon: "Car", path: "/dashboard/vehicles", roles: ["owner", "admin", "staff", "tech"], order: 3, isActive: true },
  { id: "appointments", label: "Appointments", icon: "Calendar", path: "/dashboard/appointments", roles: ["owner", "admin", "staff"], order: 4, isActive: true },
  { id: "inventory", label: "Inventory", icon: "Package", path: "/dashboard/inventory", roles: ["owner", "admin"], order: 5, isActive: true },
  { id: "pos", label: "POS / Sales", icon: "DollarSign", path: "/dashboard/pos", roles: ["owner", "admin", "staff"], order: 6, isActive: true },
  { id: "inspections", label: "Inspections", icon: "ClipboardCheck", path: "/dashboard/inspections", roles: ["owner", "admin", "staff", "tech"], order: 7, isActive: true },
  { id: "reports", label: "Reports", icon: "BarChart3", path: "/dashboard/reports", roles: ["owner", "admin"], order: 8, isActive: true },
  { id: "delivery", label: "Delivery", icon: "Truck", path: "/dashboard/delivery", roles: ["owner", "admin"], order: 9, isActive: true },
  { id: "ai-tools", label: "AI Tools", icon: "Bot", path: "/dashboard/ai", roles: ["owner", "admin"], order: 10, isActive: true },
  { id: "settings", label: "Settings", icon: "Settings", path: "/dashboard/settings", roles: ["owner", "admin"], order: 11, isActive: true },
]

const DEFAULT_WIDGETS = [
  { id: "revenue", label: "Revenue Overview", enabled: true, roles: ["owner", "admin"] },
  { id: "jobs-today", label: "Jobs Today", enabled: true, roles: ["owner", "admin", "staff", "tech"] },
  { id: "appointments", label: "Upcoming Appointments", enabled: true, roles: ["owner", "admin", "staff"] },
  { id: "inventory-alerts", label: "Inventory Alerts", enabled: true, roles: ["owner", "admin"] },
  { id: "customer-stats", label: "Customer Stats", enabled: false, roles: ["owner", "admin"] },
  { id: "vehicle-status", label: "Vehicle Status", enabled: true, roles: ["owner", "admin", "staff", "tech"] },
]

const ROLES = [
  { id: "owner", label: "Owner", color: "bg-orange-500" },
  { id: "admin", label: "Admin", color: "bg-blue-500" },
  { id: "staff", label: "Staff", color: "bg-purple-500" },
  { id: "tech", label: "Technician", color: "bg-slate-500" },
]

const ICON_MAP: Record<string, any> = {
  LayoutDashboard, Wrench, Users, Car, Calendar, Package, 
  DollarSign, ClipboardCheck, BarChart3, Truck, Bot, Settings
}

export function NavigationUIEditor() {
  const { toast } = useToast()
  const orgId = "default" // In production, get from context
  
  // CONVEX INTEGRATION
  const savedConfig = useQuery(api.cms.getNavigationConfig, { orgId })
  const saveConfig = useMutation(api.cms.saveNavigationConfig)
  
  const [menuItems, setMenuItems] = useState(DEFAULT_MENU_ITEMS)
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS)
  const [selectedRole, setSelectedRole] = useState("owner")
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  
  // Load saved config from Convex
  useEffect(() => {
    if (savedConfig) {
      if (savedConfig.menuItems?.length) {
        setMenuItems(savedConfig.menuItems)
      }
      if (savedConfig.dashboardWidgets?.length) {
        setWidgets(savedConfig.dashboardWidgets)
      }
    }
  }, [savedConfig])

  const toggleMenuItemForRole = (itemId: string, role: string) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newRoles = item.roles.includes(role)
          ? item.roles.filter(r => r !== role)
          : [...item.roles, role]
        return { ...item, roles: newRoles }
      }
      return item
    }))
    setHasChanges(true)
  }
  
  const toggleWidget = (widgetId: string, enabled: boolean) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, enabled } : w
    ))
    setHasChanges(true)
  }
  
  // SAVE TO CONVEX
  const handleSave = async () => {
    setIsSaving(true)
    try {
      await saveConfig({
        menuItems,
        dashboardWidgets: widgets,
        orgId
      })
      toast({ title: "Saved!", description: "Navigation configuration saved to database." })
      setHasChanges(false)
    } catch (error) {
      toast({ title: "Error", description: "Failed to save configuration", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Menu className="w-6 h-6 text-orange-500" />
            Navigation & UI Configuration
          </h2>
          <p className="text-slate-500">
            Control sidebar menu visibility and dashboard widgets per role - <span className="text-emerald-600 font-medium">Persisted to Convex</span>
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !hasChanges} 
          className={cn(
            "gap-2",
            hasChanges ? "bg-orange-600 hover:bg-orange-700" : "bg-slate-400"
          )}
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {hasChanges ? "Save Configuration" : "No Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Menu Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Sidebar Menu Items</CardTitle>
              <CardDescription>
                Toggle visibility per role. Changes save to database.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {menuItems.map((item) => {
                const Icon = ICON_MAP[item.icon] || Menu
                return (
                  <div 
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  >
                    <button className="cursor-grab text-slate-400 hover:text-slate-600">
                      <GripVertical className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-3 flex-1">
                      <Icon className="w-5 h-5 text-slate-400" />
                      <span className="font-medium">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {ROLES.map((role) => (
                        <button
                          key={role.id}
                          onClick={() => toggleMenuItemForRole(item.id, role.id)}
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                            item.roles.includes(role.id)
                              ? `${role.color} text-white`
                              : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                          )}
                          title={`${item.roles.includes(role.id) ? "Visible" : "Hidden"} for ${role.label}`}
                        >
                          {role.label.charAt(0)}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Dashboard Widgets */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Dashboard Widgets</CardTitle>
              <CardDescription>
                Enable/disable dashboard widgets per role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {widgets.map((widget) => (
                <div 
                  key={widget.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={widget.enabled}
                      onCheckedChange={(checked) => toggleWidget(widget.id, checked)}
                    />
                    <span className="font-medium">{widget.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {widget.roles.map((role) => {
                      const roleConfig = ROLES.find(r => r.id === role)
                      return (
                        <Badge 
                          key={role} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {roleConfig?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Preview */}
        <div className="lg:col-span-5">
          <Card className="border-slate-200 dark:border-slate-800 sticky top-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sidebar Preview</CardTitle>
                <div className="flex gap-1">
                  {ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all",
                        selectedRole === role.id
                          ? `${role.color} text-white`
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                      )}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>
              <CardDescription>
                Viewing as: <strong>{ROLES.find(r => r.id === selectedRole)?.label}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 space-y-1">
                {menuItems
                  .filter(item => item.roles.includes(selectedRole) && item.isActive)
                  .sort((a, b) => a.order - b.order)
                  .map((item) => {
                    const Icon = ICON_MAP[item.icon] || Menu
                    return (
                      <div 
                        key={item.id}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 cursor-pointer"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                    )
                  })}
                {menuItems.filter(item => item.roles.includes(selectedRole)).length === 0 && (
                  <p className="text-slate-500 text-sm text-center py-4">No menu items visible</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
