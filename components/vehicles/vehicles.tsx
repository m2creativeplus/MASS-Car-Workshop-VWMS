"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Eye,
  Pencil,
  Trash2,
  Car as CarIcon,
  Wrench,
  RefreshCw,
  Loader2
} from "lucide-react"
import { database, Vehicle as DbVehicle } from "@/lib/database"

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  licensePlate: string
  vin: string
  color: string
  mileage: number
  owner: string
  status: "active" | "in-service" | "completed"
}

// Transform database vehicle to UI vehicle
function transformVehicle(dbVehicle: DbVehicle): Vehicle {
  const statusMap: Record<string, Vehicle['status']> = {
    'Active': 'active',
    'Maintenance': 'in-service',
    'Tax Due': 'completed'
  }
  return {
    id: dbVehicle.id,
    make: dbVehicle.make,
    model: dbVehicle.model,
    year: dbVehicle.year,
    licensePlate: dbVehicle.license_plate,
    vin: dbVehicle.vin,
    color: dbVehicle.color,
    mileage: dbVehicle.mileage,
    owner: 'Fleet Owner',
    status: statusMap[dbVehicle.status || ''] || 'active'
  }
}

// Demo data
const demoVehicles: Vehicle[] = [
  { id: "1", make: "Toyota", model: "Land Cruiser 79", year: 2019, licensePlate: "SL-82307-T", vin: "JTM8R5EV5JD789012", color: "White", mileage: 48000, owner: "Mohamed Ahmed", status: "active" },
  { id: "2", make: "Toyota", model: "Hilux", year: 2020, licensePlate: "SL-70115-G", vin: "JTM5R6EV1LD567890", color: "Gray", mileage: 28000, owner: "Sarah Hassan", status: "in-service" },
  { id: "3", make: "Nissan", model: "Patrol", year: 2018, licensePlate: "SL-61203-D", vin: "JN1TBNT30Z0000001", color: "Black", mileage: 85000, owner: "Ahmed Ali", status: "active" },
  { id: "4", make: "Mitsubishi", model: "Pajero", year: 2021, licensePlate: "SL-55401-P", vin: "JMYLYV97J1J000001", color: "Silver", mileage: 15000, owner: "Fatima Omar", status: "completed" },
]

export function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(demoVehicles)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const { data, error } = await database.vehicles.getAll()
      if (data && data.length > 0) {
        setVehicles(data.map(transformVehicle))
      }
    } catch (err) {
      console.error('Failed to fetch vehicles:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const filteredVehicles = vehicles.filter(vehicle =>
    `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: Vehicle["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      case "in-service":
        return <Badge className="bg-amber-500 hover:bg-amber-600">In Service</Badge>
      case "completed":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Completed</Badge>
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 p-6">
      
      {/* Header Controls (Sakosys Style) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">
          Car Stock / Vehicle List
        </h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchVehicles}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
          <Button className="bg-[#00A65A] hover:bg-[#008d4c] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
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
              <th className="px-6 py-4 font-bold">Image</th>
              <th className="px-6 py-4 font-bold">Vehicle</th>
              <th className="px-6 py-4 font-bold">Plate / VIN</th>
              <th className="px-6 py-4 font-bold">Owner</th>
              <th className="px-6 py-4 font-bold">Mileage</th>
              <th className="px-6 py-4 font-bold">Color</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                {/* Image/Icon */}
                <td className="px-6 py-3">
                  <div className="h-10 w-10 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <CarIcon className="h-5 w-5 text-white" />
                  </div>
                </td>
                
                {/* Vehicle */}
                <td className="px-6 py-3 font-medium text-slate-900 dark:text-white">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </td>
                
                {/* Plate / VIN */}
                <td className="px-6 py-3">
                  <div className="font-semibold text-orange-600">{vehicle.licensePlate}</div>
                  <div className="text-xs text-slate-500 font-mono">{vehicle.vin}</div>
                </td>
                
                {/* Owner */}
                <td className="px-6 py-3 text-slate-600">
                  {vehicle.owner}
                </td>
                
                {/* Mileage */}
                <td className="px-6 py-3 font-semibold">
                  {vehicle.mileage.toLocaleString()} km
                </td>
                
                {/* Color */}
                <td className="px-6 py-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: vehicle.color.toLowerCase() }}></span>
                    {vehicle.color}
                  </span>
                </td>
                
                {/* Status */}
                <td className="px-6 py-3">
                  {getStatusBadge(vehicle.status)}
                </td>
                
                {/* Actions (4 color buttons) */}
                <td className="px-6 py-3">
                  <div className="flex justify-center gap-2">
                    {/* Blue: Repair */}
                    <Button size="icon" className="h-8 w-8 bg-[#00c0ef] hover:bg-[#00acd6] text-white rounded shadow-sm">
                      <Wrench className="h-4 w-4" />
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
             Showing 1 to {filteredVehicles.length} of {vehicles.length} entries
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
