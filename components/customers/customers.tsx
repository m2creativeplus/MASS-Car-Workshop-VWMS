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
  Phone,
  Mail,
  Users
} from "lucide-react"

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  vehicles: number
  totalSpent: number
  lastVisit: string
  status: "active" | "inactive"
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    firstName: "Mohamed",
    lastName: "Ahmed",
    email: "mohamed.ahmed@email.com",
    phone: "+252 61 234 5678",
    address: "Hargeisa, Somaliland",
    vehicles: 2,
    totalSpent: 4500,
    lastVisit: "2025-12-20",
    status: "active"
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Hassan",
    email: "sarah.hassan@email.com",
    phone: "+252 63 345 6789",
    vehicles: 1,
    totalSpent: 2300,
    lastVisit: "2025-12-18",
    status: "active"
  },
  {
    id: "3",
    firstName: "Ahmed",
    lastName: "Ali",
    email: "ahmed.ali@email.com",
    phone: "+252 62 456 7890",
    vehicles: 3,
    totalSpent: 8900,
    lastVisit: "2025-11-30",
    status: "inactive"
  },
  {
    id: "4",
    firstName: "Fatima",
    lastName: "Omar",
    email: "fatima.omar@email.com",
    phone: "+252 65 567 8901",
    vehicles: 1,
    totalSpent: 1200,
    lastVisit: "2025-12-28",
    status: "active"
  },
]

export function Customers() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = mockCustomers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  )

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6">
      
      {/* Header Controls (Sakosys Style) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">
          Customer List
        </h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button className="bg-[#00A65A] hover:bg-[#008d4c] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
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
              <th className="px-6 py-4 font-bold">Avatar</th>
              <th className="px-6 py-4 font-bold">Name</th>
              <th className="px-6 py-4 font-bold">Contact</th>
              <th className="px-6 py-4 font-bold">Vehicles</th>
              <th className="px-6 py-4 font-bold">Total Spent</th>
              <th className="px-6 py-4 font-bold">Last Visit</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                {/* Avatar */}
                <td className="px-6 py-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow">
                    {customer.firstName[0]}{customer.lastName[0]}
                  </div>
                </td>
                
                {/* Name */}
                <td className="px-6 py-3 font-medium text-slate-900 dark:text-white">
                  {customer.firstName} {customer.lastName}
                  {customer.address && (
                    <div className="text-xs text-slate-500 font-normal">{customer.address}</div>
                  )}
                </td>
                
                {/* Contact */}
                <td className="px-6 py-3">
                  <div className="flex items-center gap-1 text-xs text-slate-600 mb-1">
                    <Mail className="h-3 w-3" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-600">
                    <Phone className="h-3 w-3" />
                    {customer.phone}
                  </div>
                </td>
                
                {/* Vehicles */}
                <td className="px-6 py-3">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold">
                    <Users className="h-4 w-4 text-blue-500" />
                    {customer.vehicles}
                  </span>
                </td>
                
                {/* Total Spent */}
                <td className="px-6 py-3 font-bold text-emerald-600">
                  ${customer.totalSpent.toLocaleString()}
                </td>
                
                {/* Last Visit */}
                <td className="px-6 py-3 text-slate-600">
                  {new Date(customer.lastVisit).toLocaleDateString()}
                </td>
                
                {/* Status */}
                <td className="px-6 py-3">
                  <Badge className={customer.status === 'active' 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-slate-400 hover:bg-slate-500"
                  }>
                    {customer.status}
                  </Badge>
                </td>
                
                {/* Actions (4 color buttons) */}
                <td className="px-6 py-3">
                  <div className="flex justify-center gap-2">
                    {/* Yellow: View */}
                    <Button size="icon" className="h-8 w-8 bg-[#f39c12] hover:bg-[#d58512] text-white rounded shadow-sm">
                      <Eye className="h-4 w-4" />
                    </Button>

                    {/* Light Blue: Edit */}
                    <Button size="icon" className="h-8 w-8 bg-[#3c8dbc] hover:bg-[#367fa9] text-white rounded shadow-sm">
                      <Pencil className="h-4 w-4" />
                    </Button>

                    {/* Red: Delete */}
                    <Button size="icon" className="h-8 w-8 bg-[#dd4b39] hover:bg-[#d73925] text-white rounded shadow-sm">
                      <Trash2 className="h-4 w-4" />
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
             Showing 1 to {filteredCustomers.length} of {mockCustomers.length} entries
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
