"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  Car as CarIcon,
  Calendar,
  Wrench,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react"
import { useState } from "react"

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
  lastService: string
  nextService: string
  status: "active" | "in-service" | "completed"
  serviceHistory: number
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Land Cruiser",
    year: 2020,
    licensePlate: "ABC-1234",
    vin: "JTMRFREV5HD085123",
    color: "White",
    mileage: 45000,
    owner: "Mohamed Ahmed",
    lastService: "2025-12-01",
    nextService: "2026-03-01",
    status: "active",
    serviceHistory: 12
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    year: 2019,
    licensePlate: "XYZ-5678",
    vin: "2HGFC2F59KH542789",
    color: "Silver",
    mileage: 62000,
    owner: "Sarah Hassan",
    lastService: "2025-12-15",
    nextService: "2026-03-15",
    status: "in-service",
    serviceHistory: 8
  },
  {
    id: "3",
    make: "Ford",
    model: "F-150",
    year: 2021,
    licensePlate: "DEF-9012",
    vin: "1FTFW1E85MKE12345",
    color: "Blue",
    mileage: 38000,
    owner: "Ahmed Ali",
    lastService: "2025-11-20",
    nextService: "2026-02-20",
    status: "completed",
    serviceHistory: 5
  },
]

export function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVehicles = vehicles.filter(vehicle =>
    `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusConfig = (status: Vehicle["status"]) => {
    switch (status) {
      case "active":
        return { color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", label: "Active" }
      case "in-service":
        return { color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", label: "In Service" }
      case "completed":
        return { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", label: "Completed" }
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Registry</h1>
          <p className="text-muted-foreground mt-1">Manage all vehicles and service history</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20">
          <Plus className="mr-2 h-4 w-4" />
          Register New Vehicle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
                <h3 className="text-2xl font-bold mt-1">{vehicles.length}</h3>
              </div>
              <CarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Service</p>
                <h3 className="text-2xl font-bold mt-1">
                  {vehicles.filter(v => v.status === "in-service").length}
                </h3>
              </div>
              <Wrench className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Service Due</p>
                <h3 className="text-2xl font-bold mt-1">3</h3>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold mt-1">
                  {vehicles.filter(v => v.status === "completed").length}
                </h3>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by make, model, plate, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVehicles.map((vehicle, index) => {
          const statusConfig = getStatusConfig(vehicle.status)
          
          return (
            <Card 
              key={vehicle.id} 
              className="glass-card hover:shadow-lg transition-all duration-200 animate-slide-in-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <CarIcon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle>{vehicle.year} {vehicle.make} {vehicle.model}</CardTitle>
                      <p className="text-sm text-muted-foreground">{vehicle.licensePlate}</p>
                    </div>
                  </div>
                  <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Vehicle Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Owner</p>
                    <p className="font-medium">{vehicle.owner}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Color</p>
                    <p className="font-medium">{vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Mileage</p>
                    <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Service History</p>
                    <p className="font-medium">{vehicle.serviceHistory} records</p>
                  </div>
                </div>

                {/* Service Timeline */}
                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Last Service
                    </span>
                    <span className="font-medium">{new Date(vehicle.lastService).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Next Service
                    </span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">
                      {new Date(vehicle.nextService).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Service History
                  </Button>
                  <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                    <Wrench className="mr-2 h-4 w-4" />
                    Schedule Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
