"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Wrench,
  DollarSign,
  Clock,
  ThumbsUp,
  TrendingUp,
  Download,
  Mail,
  Search,
  FileText,
  AlertTriangle,
  Star,
  Filter,
  Settings,
} from "lucide-react"

interface ServiceRecord {
  id: string
  date: string
  customer: string
  vehicle: string
  serviceType: string
  technician: string
  status: "Completed" | "In Progress" | "Pending"
  totalCost: number
}

interface KPIData {
  totalServices: number
  totalRevenue: number
  avgServiceTime: number
  customerSatisfaction: number
}

export function ReportsAnalytics() {
  const [dateFilter, setDateFilter] = useState("This Month")
  const [searchTerm, setSearchTerm] = useState("")
  const [userRole] = useState<"Admin" | "Staff" | "Technician">("Admin") // Mock role

  // Mock data
  const kpiData: KPIData = {
    totalServices: 156,
    totalRevenue: 45280,
    avgServiceTime: 2.4,
    customerSatisfaction: 4.8,
  }

  const revenueData = [
    { month: "Jan", revenue: 32000, services: 120 },
    { month: "Feb", revenue: 28000, services: 98 },
    { month: "Mar", revenue: 35000, services: 134 },
    { month: "Apr", revenue: 42000, services: 156 },
    { month: "May", revenue: 38000, services: 142 },
    { month: "Jun", revenue: 45280, services: 168 },
  ]

  const servicesCategoryData = [
    { category: "Oil Change", count: 45, revenue: 4500 },
    { category: "Brake Service", count: 32, revenue: 9600 },
    { category: "Engine Diagnostic", count: 28, revenue: 11200 },
    { category: "Tire Service", count: 25, revenue: 7500 },
    { category: "Transmission", count: 15, revenue: 7500 },
    { category: "AC Service", count: 11, revenue: 4950 },
  ]

  const serviceRecords: ServiceRecord[] = [
    {
      id: "S001",
      date: "2024-06-20",
      customer: "Ahmed Hassan",
      vehicle: "Toyota Corolla 2020",
      serviceType: "Oil Change",
      technician: "Ali Mohamed",
      status: "Completed",
      totalCost: 85,
    },
    {
      id: "S002",
      date: "2024-06-20",
      customer: "Fatima Ali",
      vehicle: "Honda Civic 2019",
      serviceType: "Brake Service",
      technician: "Hassan Omar",
      status: "Completed",
      totalCost: 320,
    },
    {
      id: "S003",
      date: "2024-06-19",
      customer: "Mohamed Yusuf",
      vehicle: "Nissan Altima 2021",
      serviceType: "Engine Diagnostic",
      technician: "Amina Yusuf",
      status: "In Progress",
      totalCost: 450,
    },
    {
      id: "S004",
      date: "2024-06-19",
      customer: "Sahra Ahmed",
      vehicle: "Hyundai Elantra 2018",
      serviceType: "Tire Service",
      technician: "Omar Ahmed",
      status: "Completed",
      totalCost: 280,
    },
    {
      id: "S005",
      date: "2024-06-18",
      customer: "Khadija Osman",
      vehicle: "Ford Focus 2020",
      serviceType: "AC Service",
      technician: "Ali Mohamed",
      status: "Completed",
      totalCost: 195,
    },
  ]

  const insights = {
    topTechnician: {
      name: "Ali Mohamed",
      completedJobs: 28,
      rating: 4.9,
      specialization: "Engine Specialist",
    },
    mostRequestedService: {
      service: "Oil Change",
      count: 45,
      percentage: 28.8,
    },
    lowInventory: [
      { part: "Engine Oil 5W-30", stock: 3, minRequired: 10 },
      { part: "Brake Pads", stock: 5, minRequired: 15 },
      { part: "Air Filters", stock: 2, minRequired: 8 },
    ],
  }

  const filteredRecords = serviceRecords.filter(
    (record) =>
      record.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.technician.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const handleExportCSV = () => {
    const csvContent = [
      ["Date", "Customer", "Vehicle", "Service Type", "Technician", "Status", "Total Cost"],
      ...filteredRecords.map((record) => [
        record.date,
        record.customer,
        record.vehicle,
        record.serviceType,
        record.technician,
        record.status,
        record.totalCost.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `services-report-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
            {(userRole === "Admin" || userRole === "Staff") && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {userRole}
              </Badge>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor workshop performance, customer trends, revenue, and service stats
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
                <SelectItem value="Custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Services</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{kpiData.totalServices}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(kpiData.totalRevenue)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Service Time</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{kpiData.avgServiceTime}h</p>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                  -5% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{kpiData.customerSatisfaction}/5</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +0.2 from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <TrendingUp className="w-5 h-5" />
              Revenue Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? formatCurrency(Number(value)) : value,
                    name === "revenue" ? "Revenue" : "Services",
                  ]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Settings className="w-5 h-5" />
              Services by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={servicesCategoryData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="category" className="text-sm" angle={-45} textAnchor="end" height={80} />
                <YAxis className="text-sm" />
                <Tooltip
                  formatter={(value, name) => [value, name === "count" ? "Services" : "Revenue"]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#10b981" name="Services" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Detailed Table Section */}
        <div className="xl:col-span-2">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="dark:text-white">Recent Services Report</CardTitle>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Button variant="outline" onClick={handleExportCSV} className="whitespace-nowrap">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Date</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Customer</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Vehicle</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Service</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Technician</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Status</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="p-3 text-sm dark:text-gray-300">{record.date}</td>
                        <td className="p-3 text-sm dark:text-gray-300">{record.customer}</td>
                        <td className="p-3 text-sm dark:text-gray-300">{record.vehicle}</td>
                        <td className="p-3 text-sm dark:text-gray-300">{record.serviceType}</td>
                        <td className="p-3 text-sm dark:text-gray-300">{record.technician}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                        </td>
                        <td className="p-3 text-sm font-medium dark:text-gray-300">
                          {formatCurrency(record.totalCost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Panel */}
        <div className="space-y-6">
          {/* Top Technician */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg dark:text-white">
                <Star className="w-5 h-5 text-yellow-500" />
                Top Technician
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{insights.topTechnician.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white">{insights.topTechnician.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{insights.topTechnician.specialization}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Completed Jobs:</span>
                  <span className="font-medium dark:text-white">{insights.topTechnician.completedJobs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                  <span className="font-medium dark:text-white">⭐ {insights.topTechnician.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Most Requested Service */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg dark:text-white">
                <Wrench className="w-5 h-5 text-blue-500" />
                Most Requested Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <h3 className="text-xl font-bold dark:text-white">{insights.mostRequestedService.service}</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 my-2">
                  {insights.mostRequestedService.count}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {insights.mostRequestedService.percentage}% of all services
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Alert */}
          <Card className="border-orange-200 dark:bg-gray-800 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-orange-700 dark:text-orange-400">
                <AlertTriangle className="w-5 h-5" />
                Inventory Low Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insights.lowInventory.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded"
                  >
                    <div>
                      <p className="font-medium text-sm dark:text-white">{item.part}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Min required: {item.minRequired}</p>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      {item.stock} left
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Admin-Only Control Buttons */}
      {userRole === "Admin" && (
        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700">
                <FileText className="w-4 h-4 mr-2" />
                Generate PDF Report
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Mail className="w-4 h-4 mr-2" />
                Email Summary to Management
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
