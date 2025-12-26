"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Phone,
  Mail,
  Car as CarIcon,
  Calendar,
  DollarSign,
  Edit,
  Trash2
} from "lucide-react"
import { useState } from "react"

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
]

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground mt-1">Manage your customer database and relationships</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20">
          <Plus className="mr-2 h-4 w-4" />
          Add New Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <h3 className="text-2xl font-bold mt-1">{customers.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <CarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <h3 className="text-2xl font-bold mt-1">
                  {customers.filter(c => c.status === "active").length}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CarIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
                <h3 className="text-2xl font-bold mt-1">
                  {customers.reduce((sum, c) => sum + c.vehicles, 0)}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <CarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">
                  ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <div className="grid gap-4">
        {filteredCustomers.map((customer, index) => (
          <Card 
            key={customer.id} 
            className="glass-card hover:shadow-md transition-all duration-200 animate-slide-in-left"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Avatar */}
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {customer.firstName[0]}{customer.lastName[0]}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">
                        {customer.firstName} {customer.lastName}
                      </h3>
                      <Badge variant={customer.status === "active" ? "default" : "secondary"} className="text-xs">
                        {customer.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CarIcon className="h-4 w-4" />
                        {customer.vehicles} vehicle{customer.vehicles !== 1 ? 's' : ''}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Last visit: {new Date(customer.lastVisit).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <div className="text-right mr-4">
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      ${customer.totalSpent.toLocaleString()}
                    </p>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No customers found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
