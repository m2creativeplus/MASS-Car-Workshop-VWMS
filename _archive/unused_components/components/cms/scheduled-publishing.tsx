"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Calendar,
  Clock,
  Send,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Trash2,
  CalendarClock,
  Rocket
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Scheduled Content
const SCHEDULED_CONTENT = [
  { 
    id: 1, 
    title: "New Year Promotion Banner", 
    type: "Page", 
    scheduledFor: "2026-01-15 08:00:00",
    status: "scheduled",
    author: "Admin"
  },
  { 
    id: 2, 
    title: "Service Price Update", 
    type: "Settings", 
    scheduledFor: "2026-01-10 00:00:00",
    status: "scheduled",
    author: "Admin"
  },
  { 
    id: 3, 
    title: "Holiday Announcement", 
    type: "Article", 
    scheduledFor: "2026-01-08 12:00:00",
    status: "scheduled",
    author: "Admin"
  },
]

// Sample Approval Queue
const APPROVAL_QUEUE = [
  { 
    id: 1, 
    title: "Updated Privacy Policy", 
    type: "Page", 
    submittedBy: "Staff User",
    submittedAt: "2026-01-07 03:00:00",
    status: "pending"
  },
  { 
    id: 2, 
    title: "New Blog: Toyota Maintenance Guide", 
    type: "Article", 
    submittedBy: "Content Writer",
    submittedAt: "2026-01-06 18:00:00",
    status: "pending"
  },
]

export function ScheduledPublishing() {
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT: Scheduled Content */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-orange-500" />
                Scheduled Publishing
              </CardTitle>
              <CardDescription>
                Content queued for future release
              </CardDescription>
            </div>
            <Button size="sm" className="gap-2 bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4" /> Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {SCHEDULED_CONTENT.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No content scheduled</p>
            </div>
          ) : (
            SCHEDULED_CONTENT.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.scheduledFor}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}

          <Separator />

          {/* Quick Schedule Form */}
          <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <Label className="text-sm font-semibold">Quick Schedule</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Time</Label>
                <Input type="time" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch id="notify" />
                <Label htmlFor="notify" className="text-sm">Notify on publish</Label>
              </div>
              <Button size="sm" className="gap-2">
                <Send className="w-4 h-4" /> Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RIGHT: Approval Queue */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Approval Queue
          </CardTitle>
          <CardDescription>
            Content awaiting review and approval
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {APPROVAL_QUEUE.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>All content approved</p>
            </div>
          ) : (
            APPROVAL_QUEUE.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      <span className="text-xs text-slate-500">
                        by {item.submittedBy}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Submitted: {item.submittedAt}
                    </p>
                  </div>
                  <Badge className="bg-amber-500 text-white">Pending</Badge>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" /> Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" /> Reject
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
