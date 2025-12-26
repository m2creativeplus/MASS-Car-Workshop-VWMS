"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  Clock, 
  Wrench, 
  CheckCircle2,
  AlertCircle,
  Calendar,
  DollarSign,
  User,
  Car,
  Phone,
  Mail,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

// Work Order statuses
const STATUSES = {
  CHECK_IN: { label: "Check-In", color: "bg-blue-500", icon: Clock },
  INSPECTING: { label: "Inspecting", color: "bg-yellow-500", icon: Search },
  AWAITING_APPROVAL: { label: "Awaiting Approval", color: "bg-orange-500", icon: AlertCircle },
  IN_PROGRESS: { label: "In Progress", color: "bg-purple-500", icon: Wrench },
  COMPLETE: { label: "Complete", color: "bg-green-500", icon: CheckCircle2 },
}

// Mock work orders data
const mockWorkOrders = [
  {
    id: "WO-001",
    status: "CHECK_IN",
    vehicle: { make: "Toyota", model: "Camry", year: 2020, plate: "ABC-1234", vin: "1HGBH41JXMN109186" },
    customer: { name: "Ahmed Hassan", phone: "+252-63-4567890", email: "ahmed@email.com" },
    checkinDate: "2024-12-26",
    checkinTime: "08:30 AM",
    estimatedCompletion: "2024-12-27",
    mileage: 45280,
    services: ["Oil Change", "Brake Inspection"],
    assignedTech: "Mohamed Ali",
    priority: "normal"
  },
  {
    id: "WO-002",
    status: "INSPECTING",
    vehicle: { make: "Honda", model: "Civic", year: 2019, plate: "XYZ-5678", vin: "2HGFC2F59LH123456" },
    customer: { name: "Fatima Omar", phone: "+252-63-7890123", email: "fatima@email.com" },
    checkinDate: "2024-12-25",
    checkinTime: "10:00 AM",
    estimatedCompletion: "2024-12-26",
    mileage: 62000,
    services: ["Full Service", "A/C Repair"],
    assignedTech: "Abdi Kareem",
    priority: "high"
  },
  {
    id: "WO-003",
    status: "IN_PROGRESS",
    vehicle: { make: "Nissan", model: "Patrol", year: 2021, plate: "DEF-9012", vin: "5N1AR2MM0LC123456" },
    customer: { name: "Said Ibrahim", phone: "+252-63-2345678", email: "said@email.com" },
    checkinDate: "2024-12-24",
    checkinTime: "02:00 PM",
    estimatedCompletion: "2024-12-26",
    mileage: 38500,
    services: ["Engine Diagnostics", "Transmission Service"],
    assignedTech: "Mohamed Ali",
    priority: "urgent",
    estimate: 4500
  },
  {
    id: "WO-004",
    status: "AWAITING_APPROVAL",
    vehicle: { make: "Toyota", model: "Land Cruiser", year: 2018, plate: "GHI-3456", vin: "JTMHV05J604123456" },
    customer: { name: "Khadija Jama", phone: "+252-63-5678901", email: "khadija@email.com" },
    checkinDate: "2024-12-25",
    checkinTime: "11:30 AM",
    estimatedCompletion: "2024-12-27",
    mileage: 78200,
    services: ["Brake Replacement", "Tire Alignment", "Oil Change"],
    assignedTech: "Abdi Kareem",
    priority: "normal",
    estimate: 2800
  },
  {
    id: "WO-005",
    status: "COMPLETE",
    vehicle: { make: "Hyundai", model: "Elantra", year: 2022, plate: "JKL-7890", vin: "KMHD84LF5NU123456" },
    customer: { name: "Ali Yusuf", phone: "+252-63-8901234", email: "ali@email.com" },
    checkinDate: "2024-12-24",
    checkinTime: "09:00 AM",
    completedDate: "2024-12-25",
    completedTime: "04:30 PM",
    mileage: 22100,
    services: ["General Service"],
    assignedTech: "Mohamed Ali",
    priority: "normal",
    estimate: 850,
    final: 850
  },
]

export function WorkOrdersKanban() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedWO, setSelectedWO] = useState<typeof mockWorkOrders[0] | null>(null)

  const filteredOrders = mockWorkOrders.filter(wo => 
    wo.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wo.vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wo.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const groupedOrders = Object.keys(STATUSES).reduce((acc, status) => {
    acc[status] = filteredOrders.filter(wo => wo.status === status)
    return acc
  }, {} as Record<string, typeof mockWorkOrders>)

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Work Orders</h2>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by WO#, Plate, or Customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Work Order
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {groupedOrders.CHECK_IN.length + groupedOrders.INSPECTING.length} Check-ins
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {groupedOrders.IN_PROGRESS.length} In Progress
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {groupedOrders.AWAITING_APPROVAL.length} Awaiting Approval
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {groupedOrders.COMPLETE.length} Completed Today
            </span>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 h-full min-w-max">
          {Object.entries(STATUSES).map(([status, config]) => {
            const Icon = config.icon
            const orders = groupedOrders[status] || []

            return (
              <div key={status} className="flex-1 min-w-[320px] max-w-[400px] flex flex-col">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-lg ${config.color} bg-opacity-10 flex items-center justify-center`}>
                      <Icon className={`h-4 w-4 ${config.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{config.label}</h3>
                    <Badge variant="secondary" className="ml-2">{orders.length}</Badge>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {orders.map((wo) => (
                    <Card 
                      key={wo.id}
                      className="p-4 hover:shadow-lg transition-shadow cursor-pointer border-l-4 dark:bg-slate-900"
                      style={{ borderLeftColor: config.color.replace('bg-', '#') }}
                      onClick={() => setSelectedWO(wo)}
                    >
                      {/* WO Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white">{wo.id}</h4>
                            {wo.priority === "urgent" && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                            {wo.priority === "high" && (
                              <Badge className="bg-orange-500 text-xs">High</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {wo.checkinDate} • {wo.checkinTime}
                          </p>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Vehicle Info */}
                      <div className="mb-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="h-4 w-4 text-orange-500" />
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {wo.vehicle.year} {wo.vehicle.make} {wo.vehicle.model}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                          <span>Plate: {wo.vehicle.plate}</span>
                          <span>{wo.mileage.toLocaleString()} km</span>
                        </div>
                      </div>

                      {/* Customer */}
                      <div className="mb-3 flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{wo.customer.name}</span>
                      </div>

                      {/* Services */}
                      <div className="mb-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {wo.services.slice(0, 2).map((service, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{service}</Badge>
                          ))}
                          {wo.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">+{wo.services.length - 2} more</Badge>
                          )}
                        </div>
                      </div>

                      {/* Tech & Estimate */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <Wrench className="h-3 w-3" />
                          <span>{wo.assignedTech}</span>
                        </div>
                        {wo.estimate && (
                          <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                            <DollarSign className="h-4 w-4" />
                            <span>{wo.estimate.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}

                  {orders.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <Icon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p className="text-sm">No work orders</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
