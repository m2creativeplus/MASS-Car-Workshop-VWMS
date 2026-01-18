"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  History,
  GitBranch,
  RotateCcw,
  Eye,
  Clock,
  User,
  ChevronRight,
  Diff,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Version History
const VERSION_HISTORY = [
  { 
    id: "v-5", 
    version: "5", 
    action: "Published", 
    author: "Admin", 
    timestamp: "2026-01-07 04:25:00",
    isCurrent: true,
    changes: ["Updated pricing section", "Fixed typo in footer"]
  },
  { 
    id: "v-4", 
    version: "4", 
    action: "Draft saved", 
    author: "Admin", 
    timestamp: "2026-01-07 04:20:00",
    isCurrent: false,
    changes: ["Added new FAQ item"]
  },
  { 
    id: "v-3", 
    version: "3", 
    action: "Published", 
    author: "Admin", 
    timestamp: "2026-01-06 18:00:00",
    isCurrent: false,
    changes: ["Major content update", "New hero image"]
  },
  { 
    id: "v-2", 
    version: "2", 
    action: "Published", 
    author: "Admin", 
    timestamp: "2026-01-05 12:30:00",
    isCurrent: false,
    changes: ["Initial content revision"]
  },
  { 
    id: "v-1", 
    version: "1", 
    action: "Created", 
    author: "System", 
    timestamp: "2026-01-01 00:00:00",
    isCurrent: false,
    changes: ["Initial creation"]
  },
]

interface ContentVersioningProps {
  contentId?: string
  contentType?: string
}

export function ContentVersioning({ contentId = "page-home", contentType = "Page" }: ContentVersioningProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [compareMode, setCompareMode] = useState(false)

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-orange-500" />
              Version History
            </CardTitle>
            <CardDescription>
              Track changes and restore previous versions
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCompareMode(!compareMode)}
              className={cn(compareMode && "bg-orange-50 border-orange-500")}
            >
              <Diff className="w-4 h-4 mr-2" />
              {compareMode ? "Exit Compare" : "Compare"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Version Timeline */}
        <div className="relative">
          {VERSION_HISTORY.map((version, index) => (
            <div 
              key={version.id}
              className={cn(
                "relative pl-8 pb-6 border-l-2 transition-all cursor-pointer",
                version.isCurrent 
                  ? "border-orange-500" 
                  : "border-slate-200 dark:border-slate-700",
                selectedVersion === version.id && "bg-slate-50 dark:bg-slate-900 -mx-4 px-4 rounded-lg",
                index === VERSION_HISTORY.length - 1 && "pb-0"
              )}
              onClick={() => setSelectedVersion(version.id)}
            >
              {/* Timeline Node */}
              <div className={cn(
                "absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full border-2",
                version.isCurrent 
                  ? "bg-orange-500 border-orange-500" 
                  : "bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-600"
              )}>
                {version.isCurrent && (
                  <CheckCircle2 className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                )}
              </div>

              {/* Version Content */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-sm">v{version.version}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        version.action === "Published" && "bg-emerald-100 text-emerald-700 border-emerald-200",
                        version.action === "Draft saved" && "bg-amber-100 text-amber-700 border-amber-200",
                        version.action === "Created" && "bg-blue-100 text-blue-700 border-blue-200"
                      )}
                    >
                      {version.action}
                    </Badge>
                    {version.isCurrent && (
                      <Badge className="bg-orange-500 text-white">Current</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {version.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {version.timestamp}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {version.changes.map((change, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
                {!version.isCurrent && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8">
                      <Eye className="w-4 h-4 mr-1" /> Preview
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <RotateCcw className="w-4 h-4 mr-1" /> Restore
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Branch Info */}
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium">Main Branch</span>
            <Badge variant="outline" className="text-xs">Production</Badge>
          </div>
          <Button variant="ghost" size="sm">Create Branch</Button>
        </div>
      </CardContent>
    </Card>
  )
}
