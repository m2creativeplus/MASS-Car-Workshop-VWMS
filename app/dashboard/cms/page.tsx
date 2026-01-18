"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Zap,
  ShieldCheck,
  Info
} from "lucide-react"

export default function CMSControlCenterPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              CMS CONTROL CENTER
            </Badge>
            <Badge variant="outline" className="text-slate-500">v2.0 Enterprise</Badge>
            <Badge className="bg-emerald-100 text-emerald-700 border-0 gap-1">
              <ShieldCheck className="w-3 h-3" /> Government-Grade
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            MASS OSS – Operational CMS
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Enterprise content management system.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Zap className="w-4 h-4 text-orange-500" />
          <span>Benchmarked against Contentful, Strapi, & Tekmetric</span>
        </div>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>System Update in Progress</AlertTitle>
        <AlertDescription>
          The CMS modules are currently being upgraded to the new architecture. Features will be re-enabled incrementally.
        </AlertDescription>
      </Alert>

      {/* Placeholder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6 opacity-50">
            <h3 className="font-bold">Content Management</h3>
            <p className="text-sm">Maintenance Mode</p>
          </Card>
          <Card className="p-6 opacity-50">
            <h3 className="font-bold">Media Library</h3>
            <p className="text-sm">Maintenance Mode</p>
          </Card>
          <Card className="p-6 opacity-50">
            <h3 className="font-bold">System Settings</h3>
            <p className="text-sm">Maintenance Mode</p>
          </Card>
      </div>
    </div>
  )
}
