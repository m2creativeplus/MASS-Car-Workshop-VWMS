"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  GripVertical, 
  Settings2, 
  Clock, 
  Trash2,
  ChevronRight,
  Save,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Workflow Data (would come from Convex in production)
const SAMPLE_WORKFLOWS = [
  {
    id: "wf-1",
    name: "Standard Repair",
    isActive: true,
    stages: [
      { id: "s1", name: "Check-In", color: "#3b82f6", slaMinutes: 15, position: 1 },
      { id: "s2", name: "Diagnosing", color: "#f59e0b", slaMinutes: 60, position: 2 },
      { id: "s3", name: "Awaiting Approval", color: "#8b5cf6", slaMinutes: 120, position: 3 },
      { id: "s4", name: "Parts Ordering", color: "#ec4899", slaMinutes: 1440, position: 4 },
      { id: "s5", name: "Repairing", color: "#10b981", slaMinutes: 180, position: 5 },
      { id: "s6", name: "Quality Check", color: "#06b6d4", slaMinutes: 30, position: 6 },
      { id: "s7", name: "Ready for Pickup", color: "#22c55e", slaMinutes: 0, position: 7 },
    ]
  },
  {
    id: "wf-2",
    name: "Express Service",
    isActive: true,
    stages: [
      { id: "s1", name: "Check-In", color: "#3b82f6", slaMinutes: 10, position: 1 },
      { id: "s2", name: "Service", color: "#10b981", slaMinutes: 45, position: 2 },
      { id: "s3", name: "Ready", color: "#22c55e", slaMinutes: 0, position: 3 },
    ]
  }
]

export function WorkflowEditor() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(SAMPLE_WORKFLOWS[0])
  const [isSaving, setIsSaving] = useState(false)

  const formatSLA = (minutes: number) => {
    if (minutes === 0) return "No Limit"
    if (minutes < 60) return `${minutes}m`
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h`
    return `${Math.floor(minutes / 1440)}d`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT PANEL: Workflow List */}
      <div className="lg:col-span-4 space-y-4">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Workflow Templates</CardTitle>
              <Button size="sm" className="gap-1 bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4" /> New
              </Button>
            </div>
            <CardDescription>
              Define the stages a job moves through.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {SAMPLE_WORKFLOWS.map((wf) => (
              <button
                key={wf.id}
                onClick={() => setSelectedWorkflow(wf)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all",
                  selectedWorkflow.id === wf.id 
                    ? "bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500" 
                    : "bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <Settings2 className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">{wf.name}</p>
                    <p className="text-xs text-slate-500">{wf.stages.length} stages</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {wf.isActive && <Badge variant="outline" className="text-emerald-600 border-emerald-500">Active</Badge>}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT PANEL: Stage Editor */}
      <div className="lg:col-span-8">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedWorkflow.name}</CardTitle>
                <CardDescription>
                  Drag to reorder. Click a stage to edit its SLA and color.
                </CardDescription>
              </div>
              <Button className="gap-2" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedWorkflow.stages.map((stage, index) => (
                <div 
                  key={stage.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group hover:border-orange-500/50 transition-colors"
                >
                  <button className="cursor-grab text-slate-400 hover:text-slate-600">
                    <GripVertical className="w-5 h-5" />
                  </button>
                  
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: stage.color }}
                  />
                  
                  <div className="flex-1">
                    <Input 
                      defaultValue={stage.name}
                      className="border-0 bg-transparent p-0 h-auto font-medium text-slate-800 dark:text-white focus-visible:ring-0"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">{formatSLA(stage.slaMinutes)}</span>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                      <Settings2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full gap-2 border-dashed">
                <Plus className="w-4 h-4" /> Add Stage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
