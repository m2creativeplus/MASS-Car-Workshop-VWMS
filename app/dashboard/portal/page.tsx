"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  Calendar,
  FileText,
  Clock,
  Wrench,
  CheckCircle2,
  Download,
  User,
  CreditCard,
  History,
} from "lucide-react"

// Sample customer data
const customerData = {
  name: "Mohamed Ahmed",
  email: "mohamed@example.com",
  phone: "+252 63 123 4567",
  memberSince: "2024-06-15",
  totalSpent: 4850,
  vehicleCount: 2,
}

const vehicles = [
  { 
    id: "1", 
    make: "Toyota", 
    model: "Hilux", 
    year: 2020, 
    plate: "HG-1234",
    lastService: "2026-01-05",
    nextService: "2026-04-05",
  },
  { 
    id: "2", 
    make: "Nissan", 
    model: "Patrol", 
    year: 2018, 
    plate: "HG-5678",
    lastService: "2025-12-10",
    nextService: "2026-03-10",
  },
]

const serviceHistory = [
  { id: "WO-001", date: "2026-01-05", vehicle: "Toyota Hilux", service: "Oil Change + Filter", amount: 85, status: "completed" },
  { id: "WO-002", date: "2025-12-10", vehicle: "Nissan Patrol", service: "Brake Service", amount: 320, status: "completed" },
  { id: "WO-003", date: "2025-11-20", vehicle: "Toyota Hilux", service: "AC Repair", amount: 450, status: "completed" },
]

const upcomingAppointments = [
  { id: "APT-001", date: "2026-01-15", time: "10:00 AM", vehicle: "Toyota Hilux", service: "Scheduled Maintenance" },
]

export default function CustomerPortalPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <User className="h-8 w-8 text-orange-500" />
            Customer Portal
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {customerData.name}
          </p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Calendar className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <Car className="h-5 w-5 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">{customerData.vehicleCount}</div>
            <div className="text-xs text-muted-foreground">My Vehicles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <CreditCard className="h-5 w-5 text-green-500 mb-2" />
            <div className="text-2xl font-bold">${customerData.totalSpent}</div>
            <div className="text-xs text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <History className="h-5 w-5 text-purple-500 mb-2" />
            <div className="text-2xl font-bold">{serviceHistory.length}</div>
            <div className="text-xs text-muted-foreground">Services Done</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Calendar className="h-5 w-5 text-orange-500 mb-2" />
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <div className="text-xs text-muted-foreground">Upcoming</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vehicles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
          <TabsTrigger value="history">Service History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:border-orange-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </CardTitle>
                    <Badge variant="outline">{vehicle.plate}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Service</span>
                    <span>{vehicle.lastService}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next Service Due</span>
                    <span className="text-orange-500 font-medium">{vehicle.nextService}</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    View History
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service History</CardTitle>
              <CardDescription>All services performed on your vehicles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {serviceHistory.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-500/15 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">{service.service}</div>
                        <div className="text-sm text-muted-foreground">
                          {service.vehicle} • {service.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${service.amount}</div>
                      <Button size="sm" variant="ghost" className="text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled services</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-orange-500" />
                        </div>
                        <div>
                          <div className="font-medium">{apt.service}</div>
                          <div className="text-sm text-muted-foreground">{apt.vehicle}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{apt.date}</div>
                        <div className="text-sm text-muted-foreground">{apt.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming appointments
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Download your invoices and receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {serviceHistory.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Invoice #{service.id}</div>
                        <div className="text-sm text-muted-foreground">{service.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">${service.amount}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
