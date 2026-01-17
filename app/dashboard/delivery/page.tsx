"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, CalendarDays } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Delivery Management</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Active Deliveries
            </CardTitle>
            <CardDescription>Track ongoing vehicle deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center border-dashed border-2 rounded-lg">
              <span className="text-muted-foreground">No active deliveries</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Schedule Delivery
            </CardTitle>
            <CardDescription>Arrange new vehicle delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">New Schedule</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
