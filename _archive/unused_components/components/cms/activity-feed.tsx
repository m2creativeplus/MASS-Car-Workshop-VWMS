"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Activity,
  FileText,
  User,
  Settings,
  Upload,
  Trash2,
  Edit,
  Plus,
  Eye,
  Clock,
  Filter,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Activity Data
const ACTIVITY_FEED = [
  { 
    id: 1, 
    type: "content.published", 
    title: "Published Home page",
    user: { name: "Admin", initials: "AD", color: "bg-orange-500" },
    timestamp: "2 minutes ago",
    icon: FileText,
    iconColor: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"
  },
  { 
    id: 2, 
    type: "media.uploaded", 
    title: "Uploaded 3 new images to Media Library",
    user: { name: "Admin", initials: "AD", color: "bg-orange-500" },
    timestamp: "15 minutes ago",
    icon: Upload,
    iconColor: "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
  },
  { 
    id: 3, 
    type: "content.updated", 
    title: "Updated Terms of Service",
    user: { name: "Admin", initials: "AD", color: "bg-orange-500" },
    timestamp: "1 hour ago",
    icon: Edit,
    iconColor: "text-amber-500 bg-amber-100 dark:bg-amber-900/30"
  },
  { 
    id: 4, 
    type: "settings.changed", 
    title: "Changed branding colors",
    user: { name: "Admin", initials: "AD", color: "bg-orange-500" },
    timestamp: "2 hours ago",
    icon: Settings,
    iconColor: "text-purple-500 bg-purple-100 dark:bg-purple-900/30"
  },
  { 
    id: 5, 
    type: "user.added", 
    title: "Added new technician: Ahmed Hassan",
    user: { name: "Admin", initials: "AD", color: "bg-orange-500" },
    timestamp: "3 hours ago",
    icon: User,
    iconColor: "text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30"
  },
  { 
    id: 6, 
    type: "content.created", 
    title: "Created new article: Toyota Maintenance Guide",
    user: { name: "Admin", initials: "AD", color: "bg-orange-500" },
    timestamp: "5 hours ago",
    icon: Plus,
    iconColor: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"
  },
  { 
    id: 7, 
    type: "content.deleted", 
    title: "Deleted old blog post",
    user: { name: "Admin", initials: "AD", color: "bg-orange-500" },
    timestamp: "Yesterday",
    icon: Trash2,
    iconColor: "text-red-500 bg-red-100 dark:bg-red-900/30"
  },
]

interface ActivityFeedProps {
  limit?: number
  showHeader?: boolean
}

export function ActivityFeed({ limit, showHeader = true }: ActivityFeedProps) {
  const [filter, setFilter] = useState<string | null>(null)

  const displayedActivity = limit 
    ? ACTIVITY_FEED.slice(0, limit) 
    : ACTIVITY_FEED

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                Activity Feed
              </CardTitle>
              <CardDescription>
                Real-time updates on content and system changes
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
              <Button variant="ghost" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className={cn(!showHeader && "pt-6")}>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Activity Items */}
          <div className="space-y-6">
            {displayedActivity.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="relative pl-12">
                  {/* Timeline Node */}
                  <div className={cn(
                    "absolute left-0 w-10 h-10 rounded-full flex items-center justify-center",
                    activity.iconColor
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className={cn(
                                "text-[10px] text-white",
                                activity.user.color
                              )}>
                                {activity.user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-slate-500">{activity.user.name}</span>
                          </div>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {limit && ACTIVITY_FEED.length > limit && (
          <Button variant="ghost" className="w-full mt-4">
            View All Activity →
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
