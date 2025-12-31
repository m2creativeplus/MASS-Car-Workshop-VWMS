"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Eye,
  Pencil,
  Trash2,
  Wrench,
  Car,
  Clock,
  CheckCircle2
} from "lucide-react"

// Work Order statuses with colors
const STATUSES: Record<string, { label: string; color: string }> = {
  CHECK_IN: { label: "Check-In", color: "bg-blue-500" },
  INSPECTING: { label: "Inspecting", color: "bg-yellow-500" },
  AWAITING_APPROVAL: { label: "Awaiting Approval", color: "bg-orange-500" },
  IN_PROGRESS: { label: "In Progress", color: "bg-purple-500" },
  COMPLETE: { label: "Complete", color: "bg-green-500" },
}

interface WorkOrder {
  id: string
  status: keyof typeof STATUSES
  vehicle: { make: string; model: string; year: number; plate: string }
  customer: { name: string; phone: string }
  checkinDate: string
  services: string[]
  assignedTech: string
  priority: "normal" | "high" | "urgent"
  estimate?: number
}

// Mock work orders data
const mockWorkOrders: WorkOrder[] = [
  {
    id: "WO-001",
    status: "CHECK_IN",
    vehicle: { make: "Toyota", model: "Camry", year: 2020, plate: "ABC-1234" },
    customer: { name: "Ahmed Hassan", phone: "+252-63-4567890" },
    checkinDate: "2024-12-26",
    services: ["Oil Change", "Brake Inspection"],
    assignedTech: "Mohamed Ali",
    priority: "normal"
  },
  {
    id: "WO-002",
    status: "INSPECTING",
    vehicle: { make: "Honda", model: "Civic", year: 2019, plate: "XYZ-5678" },
    customer: { name: "Fatima Omar", phone: "+252-63-7890123" },
    checkinDate: "2024-12-25",
    services: ["Full Service", "A/C Repair"],
    assignedTech: "Abdi Kareem",
    priority: "high"
  },
  {
    id: "WO-003",
    status: "IN_PROGRESS",
    vehicle: { make: "Nissan", model: "Patrol", year: 2021, plate: "DEF-9012" },
    customer: { name: "Said Ibrahim", phone: "+252-63-2345678" },
    checkinDate: "2024-12-24",
    services: ["Engine Diagnostics", "Transmission Service"],
    assignedTech: "Mohamed Ali",
    priority: "urgent",
    estimate: 4500
  },
  {
    id: "WO-004",
    status: "AWAITING_APPROVAL",
    vehicle: { make: "Toyota", model: "Land Cruiser", year: 2018, plate: "GHI-3456" },
    customer: { name: "Khadija Jama", phone: "+252-63-5678901" },
    checkinDate: "2024-12-25",
    services: ["Brake Replacement", "Tire Alignment"],
    assignedTech: "Abdi Kareem",
    priority: "normal",
    estimate: 2800
  },
  {
    id: "WO-005",
    status: "COMPLETE",
    vehicle: { make: "Hyundai", model: "Elantra", year: 2022, plate: "JKL-7890" },
    customer: { name: "Ali Yusuf", phone: "+252-63-8901234" },
    checkinDate: "2024-12-24",
    services: ["Oil Change", "Filter Replacement"],
    assignedTech: "Mohamed Ali",
    priority: "normal",
    estimate: 850
  },
]

export function WorkOrdersKanban() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = mockWorkOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getPriorityBadge = (priority: WorkOrder["priority"]) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500 hover:bg-red-600">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>
      default:
        return <Badge className="bg-slate-400 hover:bg-slate-500">Normal</Badge>
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6">
      
      {/* Header Controls (Sakosys Style) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">
          Repair Car / Work Orders
        </h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button className="bg-[#00A65A] hover:bg-[#008d4c] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Repair
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Button 
          size="sm" 
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
          className={statusFilter === "all" ? "bg-slate-800" : ""}
        >
          All ({mockWorkOrders.length})
        </Button>
        {Object.entries(STATUSES).map(([key, value]) => (
          <Button 
            key={key}
            size="sm" 
            variant={statusFilter === key ? "default" : "outline"}
            onClick={() => setStatusFilter(key)}
            className={statusFilter === key ? value.color : ""}
          >
            {value.label} ({mockWorkOrders.filter(o => o.status === key).length})
          </Button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-t-lg border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Show</span>
          <select className="border border-slate-300 rounded px-2 py-1 text-sm bg-transparent">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-slate-600">entries</span>
        </div>
        
        <div className="relative w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">Search:</span>
          <Input 
            className="pl-16 h-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table (Sakosys AdminLTE Style) */}
      <div className="bg-white dark:bg-slate-900 rounded-b-lg border border-t-0 border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400 border-b border-slate-200">
            <tr>
              <th className="px-4 py-4 font-bold">Order ID</th>
              <th className="px-4 py-4 font-bold">Vehicle</th>
              <th className="px-4 py-4 font-bold">Customer</th>
              <th className="px-4 py-4 font-bold">Services</th>
              <th className="px-4 py-4 font-bold">Technician</th>
              <th className="px-4 py-4 font-bold">Check-In</th>
              <th className="px-4 py-4 font-bold">Priority</th>
              <th className="px-4 py-4 font-bold">Status</th>
              <th className="px-4 py-4 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                {/* Order ID */}
                <td className="px-4 py-3 font-bold text-blue-600">
                  {order.id}
                </td>
                
                {/* Vehicle */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {order.vehicle.year} {order.vehicle.make} {order.vehicle.model}
                      </div>
                      <div className="text-xs text-orange-600 font-mono">{order.vehicle.plate}</div>
                    </div>
                  </div>
                </td>
                
                {/* Customer */}
                <td className="px-4 py-3">
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-xs text-slate-500">{order.customer.phone}</div>
                </td>
                
                {/* Services */}
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {order.services.slice(0, 2).map((service, i) => (
                      <span key={i} className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                        {service}
                      </span>
                    ))}
                    {order.services.length > 2 && (
                      <span className="text-xs text-slate-500">+{order.services.length - 2}</span>
                    )}
                  </div>
                </td>
                
                {/* Technician */}
                <td className="px-4 py-3 text-slate-600">
                  <div className="flex items-center gap-1">
                    <Wrench className="h-3 w-3" />
                    {order.assignedTech}
                  </div>
                </td>
                
                {/* Check-In Date */}
                <td className="px-4 py-3 text-slate-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(order.checkinDate).toLocaleDateString()}
                  </div>
                </td>
                
                {/* Priority */}
                <td className="px-4 py-3">
                  {getPriorityBadge(order.priority)}
                </td>
                
                {/* Status */}
                <td className="px-4 py-3">
                  <Badge className={`${STATUSES[order.status].color} hover:opacity-80`}>
                    {STATUSES[order.status].label}
                  </Badge>
                </td>
                
                {/* Actions (4 color buttons) */}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-1">
                    {/* Blue: Start/Continue */}
                    <Button size="icon" className="h-7 w-7 bg-[#00c0ef] hover:bg-[#00acd6] text-white rounded shadow-sm">
                      {order.status === "COMPLETE" ? <CheckCircle2 className="h-3 w-3" /> : <Wrench className="h-3 w-3" />}
                    </Button>
                    
                    {/* Yellow: View */}
                    <Button size="icon" className="h-7 w-7 bg-[#f39c12] hover:bg-[#d58512] text-white rounded shadow-sm">
                      <Eye className="h-3 w-3" />
                    </Button>

                    {/* Light Blue: Edit */}
                    <Button size="icon" className="h-7 w-7 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded shadow-sm">
                      <Pencil className="h-3 w-3" />
                    </Button>

                    {/* Red: Delete */}
                    <Button size="icon" className="h-7 w-7 bg-[#dd4b39] hover:bg-[#d73925] text-white rounded shadow-sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Footer */}
        <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center sm:px-6">
           <div className="text-xs text-slate-500">
             Showing 1 to {filteredOrders.length} of {mockWorkOrders.length} entries
           </div>
           <div className="flex gap-1">
             <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Previous</Button>
             <Button size="sm" className="h-7 text-xs bg-blue-500 text-white hover:bg-blue-600">1</Button>
             <Button variant="outline" size="sm" className="h-7 text-xs">Next</Button>
           </div>
        </div>
      </div>
    </div>
  )
}
