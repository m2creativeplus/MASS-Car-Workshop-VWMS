"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Car, Search, Plus, MapPin, Gauge, History, Edit } from "lucide-react"

export function Vehicles() {
  const [searchTerm, setSearchTerm] = useState("")

  const vehicles = [
    {
      id: 1,
      make: "Toyota",
      model: "Corolla",
      year: 2020,
      license: "SL-001-ABC",
      owner: "Ahmed Hassan",
      mileage: "45,000 km",
      status: "In Service",
      lastService: "2024-01-15",
      nextService: "2024-04-15",
      vin: "1HGBH41JXMN109186",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2019,
      license: "SL-002-DEF",
      owner: "Fatima Ali",
      mileage: "38,000 km",
      status: "Completed",
      lastService: "2024-01-20",
      nextService: "2024-05-20",
      vin: "2HGBH41JXMN109187",
    },
    {
      id: 3,
      make: "Nissan",
      model: "Altima",
      year: 2021,
      license: "SL-003-GHI",
      owner: "Mohamed Yusuf",
      mileage: "22,000 km",
      status: "Waiting",
      lastService: "2024-01-10",
      nextService: "2024-04-10",
      vin: "3HGBH41JXMN109188",
    },
    {
      id: 4,
      make: "Hyundai",
      model: "Elantra",
      year: 2018,
      license: "SL-004-JKL",
      owner: "Sahra Ahmed",
      mileage: "67,000 km",
      status: "In Service",
      lastService: "2024-01-25",
      nextService: "2024-04-25",
      vin: "4HGBH41JXMN109189",
    },
  ]

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Service":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Waiting":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicles</h1>
          <p className="text-gray-600">Track vehicle information and service history</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search vehicles by make, model, license plate, or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Status</Button>
            <Button variant="outline">Export List</Button>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-sm text-gray-600">Total Vehicles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">18</div>
            <p className="text-sm text-gray-600">In Service</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-sm text-gray-600">Completed Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="text-sm text-gray-600">Due for Service</p>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle List */}
      <div className="space-y-4">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Car className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        License: {vehicle.license}
                      </div>
                      <div>Owner: {vehicle.owner}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">VIN: {vehicle.vin}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Gauge className="w-4 h-4 mr-1" />
                      {vehicle.mileage}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Next service: {vehicle.nextService}</div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <History className="w-4 h-4 mr-1" />
                      Service History
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
