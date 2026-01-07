"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Webhook,
  Plus,
  Play,
  Pause,
  Trash2,
  ExternalLink,
  Copy,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Settings2,
  Key
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Webhooks
const WEBHOOKS = [
  { 
    id: 1, 
    name: "Vercel Deploy Hook", 
    url: "https://api.vercel.com/v1/hooks/xxx",
    events: ["content.published", "content.deleted"],
    status: "active",
    lastTriggered: "2026-01-07 04:25:00",
    lastStatus: "success"
  },
  { 
    id: 2, 
    name: "Slack Notifications", 
    url: "https://hooks.slack.com/services/xxx",
    events: ["content.published", "user.login_failed"],
    status: "active",
    lastTriggered: "2026-01-07 04:20:00",
    lastStatus: "success"
  },
  { 
    id: 3, 
    name: "Analytics Tracker", 
    url: "https://analytics.example.com/webhook",
    events: ["content.viewed"],
    status: "paused",
    lastTriggered: "2026-01-06 12:00:00",
    lastStatus: "failed"
  },
]

// Sample API Keys
const API_KEYS = [
  { 
    id: 1, 
    name: "Production API Key", 
    key: "mass_pk_xxx...xxx",
    permissions: ["read", "write"],
    created: "2026-01-01",
    lastUsed: "2026-01-07 04:25:00"
  },
  { 
    id: 2, 
    name: "Mobile App Key", 
    key: "mass_mob_xxx...xxx",
    permissions: ["read"],
    created: "2026-01-05",
    lastUsed: "2026-01-07 04:00:00"
  },
]

export function WebhooksApiManager() {
  const [showNewWebhook, setShowNewWebhook] = useState(false)

  return (
    <div className="space-y-6">
      {/* Webhooks Section */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="w-5 h-5 text-orange-500" />
                Webhooks
              </CardTitle>
              <CardDescription>
                Trigger external actions when content changes
              </CardDescription>
            </div>
            <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4" /> Add Webhook
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-900">
                <TableHead>Name</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Triggered</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {WEBHOOKS.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{webhook.name}</p>
                      <p className="text-xs text-slate-500 font-mono truncate max-w-[200px]">
                        {webhook.url}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      webhook.status === "active" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-slate-100 text-slate-500"
                    )}>
                      {webhook.status === "active" ? (
                        <><Play className="w-3 h-3 mr-1" /> Active</>
                      ) : (
                        <><Pause className="w-3 h-3 mr-1" /> Paused</>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {webhook.lastStatus === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-xs text-slate-500">{webhook.lastTriggered}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* API Keys Section */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-orange-500" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage API access for external applications
              </CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" /> Generate Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-900">
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {API_KEYS.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono">
                        {apiKey.key}
                      </code>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {apiKey.permissions.map((perm) => (
                        <Badge 
                          key={perm} 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            perm === "write" && "border-amber-500 text-amber-600"
                          )}
                        >
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {apiKey.lastUsed}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" /> Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
