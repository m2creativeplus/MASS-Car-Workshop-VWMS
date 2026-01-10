"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Phone, Mail, Calendar, AlertTriangle } from "lucide-react";

const declinedJobs = [
  { id: "DJ-001", customer: "Mohamed Ahmed", vehicle: "2019 Toyota Hilux", service: "Full Brake Replacement", amount: "$450", reason: "Too expensive", date: "2025-01-02" },
  { id: "DJ-002", customer: "Fatima Omar", vehicle: "2020 Nissan Patrol", service: "AC Compressor Repair", amount: "$680", reason: "Will come back later", date: "2025-01-01" },
  { id: "DJ-003", customer: "Ahmed Ali", vehicle: "2018 Mitsubishi Pajero", service: "Transmission Service", amount: "$1,200", reason: "Getting second opinion", date: "2024-12-28" },
];

export default function DeclinedJobsPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-950 min-h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Declined Jobs</h1>
        <Badge variant="destructive" className="text-base px-4 py-1">
          <AlertTriangle className="w-4 h-4 mr-2" />
          {declinedJobs.length} Pending Follow-ups
        </Badge>
      </div>

      <div className="grid gap-4">
        {declinedJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    {job.id} - {job.service}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{job.vehicle}</p>
                </div>
                <span className="text-xl font-bold text-red-500">{job.amount}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{job.customer}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Declined on {job.date}
                  </p>
                  <Badge variant="outline" className="mt-2">{job.reason}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4 mr-1" /> Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4 mr-1" /> Email
                  </Button>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    Re-estimate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
