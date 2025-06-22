"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Wrench,
  History,
  Stethoscope,
  RefreshCw,
  Package,
  Eye,
  CheckCircle,
  Clock,
  Car,
  User,
  FileText,
  X,
  Plus,
  Search,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"

interface Job {
  id: string
  vehiclePlate: string
  serviceType: string
  customerName: string
  status: "In Progress" | "Completed" | "Pending" | "Assigned"
  priority: "High" | "Medium" | "Low"
  vehicleInfo: {
    make: string
    model: string
    year: number
    mileage: string
    color: string
  }
  customerInfo: {
    phone: string
    email: string
  }
  diagnosisNotes: string
  partsUsed: string[]
  partsRequested: string[]
  startTime: string
  endTime?: string
  estimatedTime: string
  assignedDate: string
  technicianNotes: string
}

interface Technician {
  id: string
  name: string
  specialization: string
  activeJobs: number
  completedToday: number
  rating: number
  status: "Available" | "Busy" | "Break"
}

export function TechnicianDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null)
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false)
  const [isDiagnosticFormOpen, setIsDiagnosticFormOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [diagnosticReport, setDiagnosticReport] = useState({
    jobId: "",
    summary: "",
    recommendedParts: [] as string[],
    newPart: "",
  })

  // Sample data
  const technicians: Technician[] = [
    {
      id: "T001",
      name: "Ali Mohamed",
      specialization: "Engine Specialist",
      activeJobs: 3,
      completedToday: 2,
      rating: 4.8,
      status: "Busy",
    },
    {
      id: "T002",
      name: "Hassan Omar",
      specialization: "Brake Systems",
      activeJobs: 2,
      completedToday: 4,
      rating: 4.9,
      status: "Available",
    },
    {
      id: "T003",
      name: "Amina Yusuf",
      specialization: "Electrical Systems",
      activeJobs: 1,
      completedToday: 3,
      rating: 4.7,
      status: "Break",
    },
    {
      id: "T004",
      name: "Omar Ahmed",
      specialization: "General Maintenance",
      activeJobs: 4,
      completedToday: 1,
      rating: 4.6,
      status: "Busy",
    },
  ]

  const jobs: Job[] = [
    {
      id: "J001",
      vehiclePlate: "SL-001-ABC",
      serviceType: "Engine Diagnostic",
      customerName: "Ahmed Hassan",
      status: "In Progress",
      priority: "High",
      vehicleInfo: {
        make: "Toyota",
        model: "Corolla",
        year: 2020,
        mileage: "45,000 km",
        color: "White",
      },
      customerInfo: {
        phone: "+252-61-123-4567",
        email: "ahmed@email.com",
      },
      diagnosisNotes:
        "Engine making unusual noise. Checking timing belt and spark plugs. Customer reports noise started 3 days ago.",
      partsUsed: ["Spark Plugs", "Engine Oil"],
      partsRequested: ["Timing Belt", "Oil Filter"],
      startTime: "09:00 AM",
      estimatedTime: "2 hours",
      assignedDate: "2024-01-15",
      technicianNotes: "Initial inspection complete. Timing belt shows wear. Recommended replacement.",
    },
    {
      id: "J002",
      vehiclePlate: "SL-002-DEF",
      serviceType: "Brake Service",
      customerName: "Fatima Ali",
      status: "Completed",
      priority: "Medium",
      vehicleInfo: {
        make: "Honda",
        model: "Civic",
        year: 2019,
        mileage: "38,000 km",
        color: "Blue",
      },
      customerInfo: {
        phone: "+252-61-234-5678",
        email: "fatima@email.com",
      },
      diagnosisNotes: "Brake pads worn out. Replaced front brake pads and checked brake fluid levels.",
      partsUsed: ["Brake Pads", "Brake Fluid"],
      partsRequested: [],
      startTime: "11:00 AM",
      endTime: "01:30 PM",
      estimatedTime: "2.5 hours",
      assignedDate: "2024-01-15",
      technicianNotes: "Service completed successfully. Brake system tested and functioning properly.",
    },
    {
      id: "J003",
      vehiclePlate: "SL-003-GHI",
      serviceType: "Oil Change",
      customerName: "Mohamed Yusuf",
      status: "Assigned",
      priority: "Low",
      vehicleInfo: {
        make: "Nissan",
        model: "Altima",
        year: 2021,
        mileage: "22,000 km",
        color: "Silver",
      },
      customerInfo: {
        phone: "+252-61-345-6789",
        email: "mohamed@email.com",
      },
      diagnosisNotes: "Routine oil change and filter replacement scheduled.",
      partsUsed: [],
      partsRequested: ["Engine Oil", "Oil Filter"],
      startTime: "02:00 PM",
      estimatedTime: "1 hour",
      assignedDate: "2024-01-16",
      technicianNotes: "",
    },
  ]

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Wrench },
    { id: "active-jobs", label: "Active Jobs", icon: Clock },
    { id: "job-history", label: "Job History", icon: History },
    { id: "diagnostics", label: "Diagnostics", icon: Stethoscope },
    { id: "parts-requests", label: "Parts Requests", icon: Package },
    { id: "performance", label: "Performance", icon: RefreshCw },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-blue-100 text-blue-800"
      case "Assigned":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTechnicianStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Busy":
        return "bg-red-100 text-red-800"
      case "Break":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.serviceType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleJobComplete = (jobId: string) => {
    console.log(`Marking job ${jobId} as completed`)
    setIsJobDetailsOpen(false)
  }

  const handleAddPart = () => {
    if (diagnosticReport.newPart.trim()) {
      setDiagnosticReport({
        ...diagnosticReport,
        recommendedParts: [...diagnosticReport.recommendedParts, diagnosticReport.newPart.trim()],
        newPart: "",
      })
    }
  }

  const handleRemovePart = (index: number) => {
    setDiagnosticReport({
      ...diagnosticReport,
      recommendedParts: diagnosticReport.recommendedParts.filter((_, i) => i !== index),
    })
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Technicians Overview</h2>
        <p className="text-gray-600">Monitor technician performance and job assignments</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Technicians</p>
                <p className="text-2xl font-bold text-gray-900">{technicians.length}</p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {technicians.reduce((sum, tech) => sum + tech.activeJobs, 0)}
                </p>
              </div>
              <Wrench className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {technicians.reduce((sum, tech) => sum + tech.completedToday, 0)}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-blue-600">
                  {technicians.filter((tech) => tech.status === "Available").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technicians Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Technician Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {technicians.map((technician) => (
              <Card key={technician.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{technician.name.charAt(0)}</span>
                    </div>
                    <Badge className={getTechnicianStatusColor(technician.status)}>{technician.status}</Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{technician.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{technician.specialization}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Jobs:</span>
                      <span className="font-medium">{technician.activeJobs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed Today:</span>
                      <span className="font-medium">{technician.completedToday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">⭐ {technician.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderActiveJobs = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Active Jobs</h2>
          <p className="text-gray-600">Monitor ongoing technician assignments</p>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-600">Job ID</th>
                  <th className="text-left p-4 font-medium text-gray-600">Vehicle</th>
                  <th className="text-left p-4 font-medium text-gray-600">Service</th>
                  <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left p-4 font-medium text-gray-600">Priority</th>
                  <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{job.id}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{job.vehiclePlate}</div>
                        <div className="text-sm text-gray-600">
                          {job.vehicleInfo.year} {job.vehicleInfo.make} {job.vehicleInfo.model}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{job.serviceType}</td>
                    <td className="p-4">{job.customerName}</td>
                    <td className="p-4">
                      <Badge className={getPriorityColor(job.priority)}>{job.priority}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedJob(job)
                          setIsJobDetailsOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDiagnosticForm = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Vehicle Diagnostics</h2>
        <p className="text-gray-600">Submit diagnostic reports and recommendations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Diagnostic Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job ID</label>
            <Input
              value={diagnosticReport.jobId}
              onChange={(e) => setDiagnosticReport({ ...diagnosticReport, jobId: e.target.value })}
              placeholder="Enter Job ID (e.g., J001)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis Summary</label>
            <Textarea
              value={diagnosticReport.summary}
              onChange={(e) => setDiagnosticReport({ ...diagnosticReport, summary: e.target.value })}
              placeholder="Enter detailed diagnosis and findings..."
              rows={6}
              className="resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recommended Parts</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {diagnosticReport.recommendedParts.map((part, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {part}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemovePart(index)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add part name..."
                value={diagnosticReport.newPart}
                onChange={(e) => setDiagnosticReport({ ...diagnosticReport, newPart: e.target.value })}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleAddPart()}
              />
              <Button size="sm" onClick={handleAddPart}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="flex-1 sm:flex-none">
              <FileText className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview()
      case "active-jobs":
        return renderActiveJobs()
      case "diagnostics":
        return renderDiagnosticForm()
      case "job-history":
        return (
          <div className="text-center py-12">
            <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Job History</h3>
            <p className="text-gray-600">View completed job history and performance metrics</p>
          </div>
        )
      case "parts-requests":
        return (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Parts Requests</h3>
            <p className="text-gray-600">Track parts requests and inventory needs</p>
          </div>
        )
      case "performance":
        return (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Analytics</h3>
            <p className="text-gray-600">View technician performance metrics and reports</p>
          </div>
        )
      default:
        return renderOverview()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Technicians Module</h1>
          <p className="text-gray-600">Manage technician assignments and performance</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  ${
                    activeSection === item.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      {renderContent()}

      {/* Job Details Modal */}
      <Dialog open={isJobDetailsOpen} onOpenChange={setIsJobDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Job Details - {selectedJob?.id}</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Vehicle Information</h4>
                  <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-2 text-gray-500" />
                      <span>
                        {selectedJob.vehicleInfo.year} {selectedJob.vehicleInfo.make} {selectedJob.vehicleInfo.model}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{selectedJob.vehiclePlate}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-gray-500">📊</span>
                      <span>{selectedJob.vehicleInfo.mileage}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-gray-500">🎨</span>
                      <span>{selectedJob.vehicleInfo.color}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Customer Information</h4>
                  <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{selectedJob.customerName}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{selectedJob.customerInfo.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{selectedJob.customerInfo.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Job Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium">{selectedJob.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <Badge className={getPriorityColor(selectedJob.priority)}>{selectedJob.priority}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={getStatusColor(selectedJob.status)}>{selectedJob.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Assigned Date:</span>
                      <span className="font-medium">{selectedJob.assignedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Time:</span>
                      <span className="font-medium">{selectedJob.startTime}</span>
                    </div>
                    {selectedJob.endTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">End Time:</span>
                        <span className="font-medium">{selectedJob.endTime}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Time:</span>
                      <span className="font-medium">{selectedJob.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Parts Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 block mb-2">Parts Used:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.partsUsed.length > 0 ? (
                          selectedJob.partsUsed.map((part, index) => (
                            <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                              {part}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No parts used yet</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 block mb-2">Parts Requested:</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.partsRequested.length > 0 ? (
                          selectedJob.partsRequested.map((part, index) => (
                            <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                              {part}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No parts requested</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Diagnosis Notes</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedJob.diagnosisNotes}</p>
              </div>

              {selectedJob.technicianNotes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Technician Notes</h4>
                  <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">{selectedJob.technicianNotes}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t">
                {selectedJob.status !== "Completed" && (
                  <Button onClick={() => handleJobComplete(selectedJob.id)} className="flex-1 sm:flex-none">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Completed
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setDiagnosticReport({ ...diagnosticReport, jobId: selectedJob.id })
                    setIsDiagnosticFormOpen(true)
                  }}
                  className="flex-1 sm:flex-none"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Add Diagnostic
                </Button>
                <Button variant="outline" onClick={() => setIsJobDetailsOpen(false)} className="flex-1 sm:flex-none">
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
