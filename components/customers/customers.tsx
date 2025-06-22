"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { User, Phone, Mail, Car, Calendar, Search, Plus, Eye, Edit } from "lucide-react"

export function Customers() {
  const [searchTerm, setSearchTerm] = useState("")

  const customers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      phone: "+252-61-123-4567",
      email: "ahmed@email.com",
      vehicles: 2,
      lastService: "2024-01-15",
      totalSpent: "$2,450",
      status: "Active",
      loyaltyPoints: 1250,
    },
    {
      id: 2,
      name: "Fatima Ali",
      phone: "+252-61-234-5678",
      email: "fatima@email.com",
      vehicles: 1,
      lastService: "2024-01-20",
      totalSpent: "$890",
      status: "Active",
      loyaltyPoints: 445,
    },
    {
      id: 3,
      name: "Mohamed Yusuf",
      phone: "+252-61-345-6789",
      email: "mohamed@email.com",
      vehicles: 3,
      lastService: "2024-01-10",
      totalSpent: "$3,200",
      status: "VIP",
      loyaltyPoints: 1600,
    },
    {
      id: 4,
      name: "Sahra Ahmed",
      phone: "+252-61-456-7890",
      email: "sahra@email.com",
      vehicles: 1,
      lastService: "2024-01-25",
      totalSpent: "$650",
      status: "New",
      loyaltyPoints: 325,
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage customer profiles and information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">124</div>
            <p className="text-sm text-gray-600">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">18</div>
            <p className="text-sm text-gray-600">VIP Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">$2,850</div>
            <p className="text-sm text-gray-600">Avg. Customer Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">92%</div>
            <p className="text-sm text-gray-600">Retention Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {customer.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="w-4 h-4 mr-1" />
                      {customer.vehicles} vehicle(s)
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Last service: {customer.lastService}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{customer.totalSpent}</div>
                    <div className="text-sm text-gray-600">{customer.loyaltyPoints} points</div>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <Badge
                      variant={
                        customer.status === "VIP" ? "default" : customer.status === "Active" ? "secondary" : "outline"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
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
