"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Car,
  Package,
  UserPlus,
  Wrench,
  ChevronLeft,
  ChevronRight,
  X,
  Minimize2,
  Plus,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"

export function Dashboard() {
  const [showSetupWizard, setShowSetupWizard] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)) // June 2025
  const [calendarView, setCalendarView] = useState<"Month" | "Week" | "Day">("Month")

  const stats = [
    { title: "EMPLOYEES", value: "1", icon: Users, color: "text-teal-600", bgColor: "bg-teal-100" },
    { title: "CUSTOMERS", value: "1", icon: Users, color: "text-orange-600", bgColor: "bg-orange-100" },
    { title: "SUPPLIERS", value: "1", icon: UserPlus, color: "text-pink-600", bgColor: "bg-pink-100" },
    { title: "PRODUCTS", value: "1", icon: Package, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "VEHICLE SELL", value: "0", icon: Car, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "SERVICES", value: "2", icon: Wrench, color: "text-indigo-600", bgColor: "bg-indigo-100" },
  ]

  const recentCustomer = {
    name: "Washingtone Ochieng",
    email: "Samuel@gmail.com",
    avatar: "WO",
  }

  // Generate calendar days for June 2025
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDateObj = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDateObj))
      currentDateObj.setDate(currentDateObj.getDate() + 1)
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ]
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">Dashboard : Admin</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        </div>
      </div>

      {/* Setup Wizard */}
      {showSetupWizard && (
        <Card className="bg-gray-100">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-gray-700">Setup Wizard</CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setShowSetupWizard(false)}>
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowSetupWizard(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600 mt-1">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Services Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Services</CardTitle>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="50, 100"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeDasharray="50, 100"
                    strokeDashoffset="-50"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">2</span>
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="text-sm text-gray-600">Services</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-sm mr-2"></div>
                </div>
                <div className="text-xl font-bold">1</div>
                <div className="text-sm text-gray-600">Free Services</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
                </div>
                <div className="text-xl font-bold">1</div>
                <div className="text-sm text-gray-600">Paid Services</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recently Joined Customer */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recently Joined Customer</CardTitle>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{recentCustomer.avatar}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{recentCustomer.name}</h3>
                <p className="text-sm text-gray-600">{recentCustomer.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar and Service Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-orange-500">
                  ● Open
                </Badge>
                <Badge variant="outline" className="text-green-500">
                  ● Completed
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Today</span>
                <span className="text-lg font-semibold text-orange-500">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <div className="flex space-x-1">
                  {["Month", "Week", "Day"].map((view) => (
                    <Button
                      key={view}
                      variant={calendarView === view ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCalendarView(view as "Month" | "Week" | "Day")}
                      className="text-xs"
                    >
                      {view}
                    </Button>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const isCurrentMonth = day.getMonth() === currentDate.getMonth()
                const isToday = day.toDateString() === new Date().toDateString()
                const hasEvent = day.getDate() === 21 && isCurrentMonth // Sample event on 21st

                return (
                  <div
                    key={index}
                    className={`
                      text-center p-2 text-sm cursor-pointer hover:bg-gray-100 rounded
                      ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                      ${isToday ? "bg-blue-100 text-blue-600 font-semibold" : ""}
                      ${hasEvent ? "bg-orange-100" : ""}
                    `}
                  >
                    {day.getDate()}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Service Details */}
        <div className="space-y-6">
          {/* Upcoming Service Details */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Upcoming Service Details</CardTitle>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Services
              </Button>
            </CardContent>
          </Card>

          {/* Paid Service Details */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Paid Service Details</CardTitle>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-center">
                  <div className="text-xs">Apr</div>
                  <div className="text-sm font-bold">03</div>
                </div>
                <div>
                  <div className="font-semibold">J000001</div>
                  <div className="text-sm text-gray-600">2024-04-03</div>
                  <div className="flex items-center mt-1">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">N</span>
                    </div>
                    <span className="text-sm">Nandan kumar</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
