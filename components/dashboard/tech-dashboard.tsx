"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wrench, Clock, CheckCircle2, AlertCircle, Play, Pause } from "lucide-react"

export function TechnicianDashboard({ orgId, userId }: { orgId: string, userId: string }) {
  // Fetch key data for this technician
  // In a real implementation, we would likely have specific queries for "my active jobs"
  // For now, we'll filter client-side or use existing queries
  
  const workOrders = useQuery(api.functions.getWorkOrders, { orgId })
  const performance = useQuery(api.functions.getTechnicianPerformance, { orgId })
  
  const myPerformance = performance?.find((p: any) => p.name.includes("Demo") || true) // Simplified
  const myJobs = workOrders?.filter(j => j.technicianId === userId || j.status === "in-progress") || []
  
  const activeJob = myJobs.find(j => j.status === "in-progress")
  const waitingJobs = myJobs.filter(j => j.status === "check-in" || j.status === "waiting-parts")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Technician Dashboard</h2>
          <p className="text-muted-foreground">Manage your assigned jobs and track your efficiency.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1">Online</Badge>
          <div className="text-sm font-medium text-muted-foreground">
             {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myPerformance?.avgEfficiency || 100}%</div>
            <Progress value={myPerformance?.avgEfficiency || 100} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">Target: 100%+</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Job</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJob ? activeJob.jobNumber : "None"}</div>
            <p className="text-xs text-muted-foreground">
                {activeJob ? activeJob.vehicleId : "Ready for next job"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myPerformance?.totalJobs || 0}</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myPerformance?.totalBillableHours?.toFixed(1) || "0.0"}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Areas */}
      <div className="grid gap-6 md:grid-cols-7">
        
        {/* Active Job / Clock In */}
        <Card className="col-span-4 bg-slate-950 text-white border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Current Job</CardTitle>
            <CardDescription className="text-slate-400">Track your time on the current detailed task.</CardDescription>
          </CardHeader>
          <CardContent>
            {activeJob ? (
                <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-orange-400">{activeJob.jobNumber}</h3>
                                <p className="text-sm text-slate-300">2018 Toyota Hilux - Brake Service</p>
                            </div>
                            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                                <Pause className="mr-2 h-4 w-4" /> Stop Timer
                            </Button>
                        </div>
                        
                        <div className="flex gap-8">
                             <div>
                                 <label className="text-xs uppercase tracking-wider text-slate-500">Duration</label>
                                 <div className="text-4xl font-mono text-white">01:24:30</div>
                             </div>
                             <div>
                                 <label className="text-xs uppercase tracking-wider text-slate-500">Est. Time</label>
                                 <div className="text-4xl font-mono text-slate-400">01:30:00</div>
                             </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-800 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                        <Wrench className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">No Active Job</h3>
                    <p className="text-slate-400 max-w-sm mt-2 mb-6">You are not currently clocked into any job. Select a job from the queue to start.</p>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Assigned Jobs Queue */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>My Assignments</CardTitle>
            <CardDescription>Jobs waiting for your attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {waitingJobs.map(job => (
                    <div key={job._id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer group">
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{job.jobNumber}</p>
                            <p className="text-xs text-muted-foreground">{job.status}</p>
                        </div>
                        <Button size="sm" className="hidden group-hover:flex bg-green-600 hover:bg-green-700">
                            <Play className="mr-2 h-3 w-3" /> Start
                        </Button>
                    </div>
                ))}
                {waitingJobs.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                        No pending jobs assignments. Relax! ☕
                    </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
