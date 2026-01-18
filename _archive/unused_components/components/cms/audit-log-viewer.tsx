"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Shield,
  Search,
  Filter,
  Download,
  User,
  Clock,
  FileText,
  Settings,
  Trash2,
  Edit,
  Plus,
  Eye,
  LogIn,
  LogOut,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Audit Log Data
const AUDIT_LOGS = [
  { 
    id: 1, 
    action: "content.published", 
    entity: "Page", 
    entityId: "home", 
    user: "admin@massworkshop.so", 
    ip: "192.168.1.100",
    timestamp: "2026-01-07 04:25:00",
    severity: "info",
    details: "Published Home page v5"
  },
  { 
    id: 2, 
    action: "user.login", 
    entity: "User", 
    entityId: "admin", 
    user: "admin@massworkshop.so", 
    ip: "192.168.1.100",
    timestamp: "2026-01-07 04:20:00",
    severity: "info",
    details: "Successful login"
  },
  { 
    id: 3, 
    action: "settings.updated", 
    entity: "Settings", 
    entityId: "branding", 
    user: "admin@massworkshop.so", 
    ip: "192.168.1.100",
    timestamp: "2026-01-07 04:15:00",
    severity: "warning",
    details: "Changed primary color to #f97316"
  },
  { 
    id: 4, 
    action: "content.deleted", 
    entity: "Article", 
    entityId: "old-post", 
    user: "admin@massworkshop.so", 
    ip: "192.168.1.100",
    timestamp: "2026-01-07 04:10:00",
    severity: "critical",
    details: "Deleted article: Old Post"
  },
  { 
    id: 5, 
    action: "user.login_failed", 
    entity: "User", 
    entityId: "unknown", 
    user: "hacker@bad.com", 
    ip: "45.33.32.156",
    timestamp: "2026-01-07 04:05:00",
    severity: "critical",
    details: "Failed login attempt - invalid credentials"
  },
  { 
    id: 6, 
    action: "role.assigned", 
    entity: "User", 
    entityId: "tech-001", 
    user: "admin@massworkshop.so", 
    ip: "192.168.1.100",
    timestamp: "2026-01-07 04:00:00",
    severity: "warning",
    details: "Assigned Technician role to Ahmed"
  },
  { 
    id: 7, 
    action: "content.created", 
    entity: "Page", 
    entityId: "terms-so", 
    user: "admin@massworkshop.so", 
    ip: "192.168.1.100",
    timestamp: "2026-01-06 23:00:00",
    severity: "info",
    details: "Created Somali Terms of Service page"
  },
]

const ACTION_ICONS: Record<string, any> = {
  "content.published": FileText,
  "content.created": Plus,
  "content.updated": Edit,
  "content.deleted": Trash2,
  "user.login": LogIn,
  "user.logout": LogOut,
  "user.login_failed": AlertTriangle,
  "settings.updated": Settings,
  "role.assigned": User,
}

const SEVERITY_STYLES: Record<string, string> = {
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export function AuditLogViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null)

  const filteredLogs = AUDIT_LOGS.filter(log => {
    const matchesSearch = log.action.includes(searchQuery.toLowerCase()) || 
                         log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.includes(searchQuery.toLowerCase())
    const matchesSeverity = !selectedSeverity || log.severity === selectedSeverity
    return matchesSearch && matchesSeverity
  })

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-500" />
              Audit Logs
            </CardTitle>
            <CardDescription>
              Comprehensive tracking of all system actions (Government-grade compliance)
            </CardDescription>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Search by action, user, or details..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["info", "warning", "critical"].map((severity) => (
              <Badge
                key={severity}
                variant="outline"
                className={cn(
                  "cursor-pointer capitalize",
                  selectedSeverity === severity && SEVERITY_STYLES[severity]
                )}
                onClick={() => setSelectedSeverity(selectedSeverity === severity ? null : severity)}
              >
                {severity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Log Table */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-900">
                <TableHead className="w-[200px]">Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>User</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const Icon = ACTION_ICONS[log.action] || FileText
                return (
                  <TableRow key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          log.severity === "critical" ? "bg-red-100 dark:bg-red-900/30" :
                          log.severity === "warning" ? "bg-amber-100 dark:bg-amber-900/30" :
                          "bg-slate-100 dark:bg-slate-800"
                        )}>
                          <Icon className={cn(
                            "w-4 h-4",
                            log.severity === "critical" ? "text-red-600" :
                            log.severity === "warning" ? "text-amber-600" :
                            "text-slate-500"
                          )} />
                        </div>
                        <div>
                          <p className="font-mono text-xs">{log.action}</p>
                          <Badge variant="outline" className="text-xs mt-0.5">
                            {log.entity}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{log.details}</TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">{log.user}</TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">{log.ip}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {log.timestamp}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Events", value: AUDIT_LOGS.length, color: "text-blue-500" },
            { label: "Warnings", value: AUDIT_LOGS.filter(l => l.severity === "warning").length, color: "text-amber-500" },
            { label: "Critical", value: AUDIT_LOGS.filter(l => l.severity === "critical").length, color: "text-red-500" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-center">
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
