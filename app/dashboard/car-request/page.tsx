"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CarFront, Calendar, ClipboardCheck } from "lucide-react";

export default function CarRequestPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Car Request</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CarFront className="h-5 w-5" />
              New Purchase Request
            </CardTitle>
            <CardDescription>Request a specific vehicle for import</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Create Request</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
