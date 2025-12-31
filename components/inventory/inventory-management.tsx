"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  ShoppingCart,
  Eye,
  Pencil,
  Trash2,
  Filter
} from "lucide-react"

// Mock inventory data matching Sakosys fields
const mockInventory = [
  { 
    id: "P-001", 
    image: "https://images.unsplash.com/photo-1627483262769-04d0a1401487?auto=format&fit=crop&w=150&q=80", 
    name: "Engine Oil 5W-30", 
    condition: "New", 
    sku: "OIL-5W30-4L", 
    quantity: 45, 
    price: 45, 
    warranty: "1 Year",
    status: "Active" 
  },
  { 
    id: "P-002", 
    image: "https://images.unsplash.com/photo-1600003014303-375F05a00a16?auto=format&fit=crop&w=150&q=80",
    name: "Brake Pads (Front)", 
    condition: "New", 
    sku: "BP-FRONT-001", 
    quantity: 8, 
    price: 150, 
    warranty: "6 Months",
    status: "Active" 
  },
  { 
    id: "P-003", 
    image: "https://images.unsplash.com/photo-1548611716-3e488ff20023?auto=format&fit=crop&w=150&q=80",
    name: "Alternator (Rebuilt)", 
    condition: "Used", 
    sku: "ALT-REB-001", 
    quantity: 2, 
    price: 85, 
    warranty: "3 Months",
    status: "Active" 
  },
]

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6">
      
      {/* Header Controls (Sakosys Style) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">
          Parts Stock List
        </h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Parts
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

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-b-lg border border-t-0 border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold">Image</th>
              <th className="px-6 py-4 font-bold">Name</th>
              <th className="px-6 py-4 font-bold">Condition</th>
              <th className="px-6 py-4 font-bold">Quantity</th>
              <th className="px-6 py-4 font-bold">Sell Price</th>
              <th className="px-6 py-4 font-bold">Warranty</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {mockInventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-3">
                  <div className="h-10 w-10 rounded overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-3 font-medium text-slate-900 dark:text-white">
                  {item.name}
                  <div className="text-xs text-slate-500 font-normal">{item.sku}</div>
                </td>
                <td className="px-6 py-3">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    item.condition === 'New' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.condition}
                  </span>
                </td>
                <td className="px-6 py-3 font-semibold">
                  {item.quantity}
                </td>
                <td className="px-6 py-3 font-bold text-emerald-600">
                  ${item.price}
                </td>
                <td className="px-6 py-3 text-slate-600">
                  {item.warranty}
                </td>
                <td className="px-6 py-3">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <div className="flex justify-center gap-2">
                    {/* Blue: Buy/Cart */}
                    <Button size="icon" className="h-8 w-8 bg-[#00c0ef] hover:bg-[#00acd6] text-white rounded shadow-sm">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    
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
             Showing 1 to 10 of 57 entries
           </div>
           <div className="flex gap-1">
             <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Previous</Button>
             <Button variant="solid" size="sm" className="h-7 text-xs bg-blue-500 text-white hover:bg-blue-600">1</Button>
             <Button variant="outline" size="sm" className="h-7 text-xs">2</Button>
             <Button variant="outline" size="sm" className="h-7 text-xs">3</Button>
             <Button variant="outline" size="sm" className="h-7 text-xs">Next</Button>
           </div>
        </div>
      </div>
    </div>
  )
}
