"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Car, Plus, RefreshCw, CheckCircle, X } from "lucide-react"

export function Appointments() {
  // 🆕 initialize selectedDate with today's date in ISO-format (yyyy-mm-dd)
  const today = new Date()
  const defaultDate = today.toISOString().split("T")[0] // "2025-06-22"
  const [selectedDate, setSelectedDate] = useState<string>(defaultDate)

  const appointments = [
    {
      id: 1,
      time: "09:00",
      customer: "Ahmed Hassan",
      vehicle: "Toyota Corolla",
      service: "Oil Change",
      status: "Confirmed",
      technician: "Ali Mohamed",
      duration: "1 hour",
    },
    {
      id: 2,
      time: "10:30",
      customer: "Fatima Ali",
      vehicle: "Honda Civic",
      service: "Brake Inspection",
      status: "Confirmed",
      technician: "Hassan Omar",
      duration: "2 hours",
    },
    {
      id: 3,
      time: "13:00",
      customer: "Mohamed Yusuf",
      vehicle: "Nissan Altima",
      service: "General Maintenance",
      status: "Pending",
      technician: "Amina Yusuf",
      duration: "3 hours",
    },
    {
      id: 4,
      time: "15:30",
      customer: "Sahra Ahmed",
      vehicle: "Hyundai Elantra",
      service: "Engine Diagnostic",
      status: "Confirmed",
      technician: "Omar Ahmed",
      duration: "2 hours",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage customer appointments and scheduling</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Date Selection and Quick Stats */}
      <div className="grid lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={selectedDate} // controlled value
                onChange={(e) => setSelectedDate(e.target.value)} // 🔄 update state
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
            <div className="mt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Today
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Tomorrow
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">7</div>
            <p className="text-sm text-gray-600">Today's Appointments</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-sm text-gray-600">Confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule - {selectedDate}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{appointment.time}</div>
                    <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <User className="w-4 h-4 mr-1" />
                      {appointment.customer}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="w-4 h-4 mr-1" />
                      {appointment.vehicle}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{appointment.service}</div>
                    <div className="text-sm text-gray-600">Technician: {appointment.technician}</div>
                    <div className="text-xs text-gray-500">Duration: {appointment.duration}</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Complete
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle>Available Time Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {["08:00", "08:30", "11:00", "11:30", "14:00", "14:30", "16:00", "16:30", "17:00", "17:30"].map((time) => (
              <Button key={time} variant="outline" size="sm" className="text-green-600 border-green-200">
                {time}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
