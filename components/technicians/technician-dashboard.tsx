"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  User,
  Wrench,
  Clock,
  TrendingUp,
  Star,
  AlertCircle,
  CheckCircle2,
  Activity
} from "lucide-react"
import { useState } from "react"

interface Technician {
  id: string
  name: string
  role: string
  status: "available" | "working" | "break" | "offline"
  currentJob?: string
  completedToday: number
  efficiency: number
  rating: number
  specialties: string[]
  certifications: string[]
}

const mockTechnicians: Technician[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Senior Mechanic",
    status: "working",
    currentJob: "Brake Service - BMW X5 (#4052)",
    completedToday: 3,
    efficiency: 95,
    rating: 4.8,
    specialties: ["Engine Repair", "Brake Systems", "Diagnostics"],
    certifications: ["ASE Master", "BMW Certified"]
  },
  {
    id: "2",
    name: "Mike Ross",
    role: "Mechanic",
    status: "available",
    completedToday: 2,
    efficiency: 88,
    rating: 4.6,
    specialties: ["Oil Service", "Tire Replacement", "General Maintenance"],
    certifications: ["ASE Certified"]
  },
  {
    id: "3",
    name: "Sarah Smith",
    role: "Technician",
    status: "break",
    completedToday: 4,
    efficiency: 92,
    rating: 4.9,
    specialties: ["Electrical Systems", "AC Repair", "Diagnostics"],
    certifications: ["ASE Master", "Electrical Specialist"]
  },
]

export function TechnicianDashboard() {
  const [technicians, setTechnicians] = useState<Technician[]>(mockTechnicians)

  const getStatusConfig = (status: Technician["status"]) => {
    switch (status) {
      case "available":
        return { 
          color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
          dot: "bg-emerald-500",
          label: "Available"
        }
      case "working":
        return { 
          color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
          dot: "bg-blue-500",
          label: "Working"
        }
      case "break":
        return { 
          color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
          dot: "bg-amber-500",
          label: "On Break"
        }
      case "offline":
        return { 
          color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
          dot: "bg-gray-500",
          label: "Offline"
        }
    }
  }

  const totalCompleted = technicians.reduce((sum, t) => sum + t.completedToday, 0)
  const avgEfficiency = Math.round(technicians.reduce((sum, t) => sum + t.efficiency, 0) / technicians.length)
  const activeCount = technicians.filter(t => t.status === "working").length

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Technician Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor team performance and assignments</p>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <h3 className="text-2xl font-bold mt-1">{technicians.length}</h3>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Currently Working</p>
                <h3 className="text-2xl font-bold mt-1">{activeCount}</h3>
              </div>
              <Wrench className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <h3 className="text-2xl font-bold mt-1">{totalCompleted}</h3>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Efficiency</p>
                <h3 className="text-2xl font-bold mt-1">{avgEfficiency}%</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technician Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {technicians.map((tech, index) => {
          const statusConfig = getStatusConfig(tech.status)
          
          return (
            <Card 
              key={tech.id}
              className="glass-card hover:shadow-lg transition-all duration-200 animate-slide-in-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-4 border-background">
                        <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white text-xl font-bold">
                          {tech.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-background ${statusConfig.dot}`} />
                    </div>
                    
                    <div>
                      <CardTitle className="text-xl">{tech.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{tech.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold">{tech.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Current Job */}
                {tech.currentJob && (
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                      <span className="font-medium text-blue-700 dark:text-blue-300">
                        Currently working on:
                      </span>
                    </div>
                    <p className="text-sm mt-1 font-semibold">{tech.currentJob}</p>
                  </div>
                )}

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed Today</span>
                      <span className="font-bold">{tech.completedToday}</span>
                    </div>
                    <Progress value={(tech.completedToday / 5) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Efficiency</span>
                      <span className="font-bold">{tech.efficiency}%</span>
                    </div>
                    <Progress value={tech.efficiency} className="h-2" />
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">SPECIALTIES</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.specialties.map((specialty, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">CERTIFICATIONS</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.certifications.map((cert, i) => (
                      <Badge key={i} className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {tech.status === "available" && (
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                      Assign Job
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1">
                    View Details
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
