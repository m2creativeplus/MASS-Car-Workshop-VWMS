"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Car,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Wrench,
  Gauge,
  Fuel,
  FileText,
  QrCode,
  Share2,
  Download,
  ExternalLink,
  Clock,
  MapPin
} from "lucide-react";

interface VehiclePassportProps {
  vehicle: {
    vin: string;
    make: string;
    model: string;
    year: number;
    color: string;
    mileage: number;
    fuelType: string;
    engineSize: string;
    transmission: string;
    licensePlate?: string;
  };
  serviceHistory: {
    id: string;
    date: string;
    type: string;
    mileage: number;
    description: string;
    provider: string;
  }[];
  inspections: {
    id: string;
    date: string;
    type: string;
    result: "pass" | "fail" | "warning";
    notes: string;
  }[];
  passportId: string;
  verifiedDate: string;
}

/**
 * Vehicle Passport - Public Verification Page
 * 
 * Shareable vehicle history and condition report
 * Accessible via QR code or direct link
 * 
 * Route: /verify/[id]
 */
export function VehiclePassport({ 
  vehicle, 
  serviceHistory, 
  inspections,
  passportId,
  verifiedDate 
}: VehiclePassportProps) {
  const [showQR, setShowQR] = useState(false);
  const passportUrl = `https://mass-car-workshop-vwms.vercel.app/verify/${passportId}`;

  const latestInspection = inspections[0];
  const totalServices = serviceHistory.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold">MASS OSS</h1>
              <p className="text-xs text-muted-foreground">Vehicle Passport</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 gap-1">
            <Shield className="h-3 w-3" />
            Verified
          </Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Vehicle Hero */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h2>
                <p className="opacity-90 mt-1">VIN: {vehicle.vin}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Passport ID</p>
                <p className="font-mono text-lg">{passportId}</p>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Color</p>
                <p className="font-medium">{vehicle.color}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mileage</p>
                <p className="font-medium flex items-center gap-1">
                  <Gauge className="h-4 w-4" />
                  {vehicle.mileage.toLocaleString()} km
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fuel Type</p>
                <p className="font-medium flex items-center gap-1">
                  <Fuel className="h-4 w-4" />
                  {vehicle.fuelType}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Engine</p>
                <p className="font-medium">{vehicle.engineSize}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-bold text-green-700 dark:text-green-400">Verified Vehicle</p>
                  <p className="text-sm text-muted-foreground">Last verified: {verifiedDate}</p>
                </div>
              </div>
              <Badge className="bg-green-500">Active</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-2xl font-bold">{totalServices}</p>
                <p className="text-xs text-muted-foreground">Service Records</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-2xl font-bold">{inspections.length}</p>
                <p className="text-xs text-muted-foreground">Inspections</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-2xl font-bold text-green-600">
                  {inspections.filter(i => i.result === "pass").length}
                </p>
                <p className="text-xs text-muted-foreground">Passed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Service History
            </CardTitle>
            <CardDescription>
              Complete maintenance record from verified workshops
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceHistory.map((service, index) => (
                <div key={service.id} className="relative pl-6 pb-4 last:pb-0">
                  {/* Timeline line */}
                  {index < serviceHistory.length - 1 && (
                    <div className="absolute left-[9px] top-6 bottom-0 w-0.5 bg-muted" />
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center">
                    <Wrench className="h-2.5 w-2.5 text-orange-500" />
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{service.type}</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {service.provider}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{service.date}</p>
                      <p className="text-xs text-muted-foreground">{service.mileage.toLocaleString()} km</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Inspection Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inspections.map(inspection => (
                <div 
                  key={inspection.id} 
                  className={`p-4 rounded-lg border ${
                    inspection.result === "pass" ? "border-green-200 bg-green-50 dark:bg-green-900/20" :
                    inspection.result === "warning" ? "border-amber-200 bg-amber-50 dark:bg-amber-900/20" :
                    "border-red-200 bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {inspection.result === "pass" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : inspection.result === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">{inspection.type}</p>
                        <p className="text-sm text-muted-foreground">{inspection.notes}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={
                        inspection.result === "pass" ? "bg-green-500" :
                        inspection.result === "warning" ? "bg-amber-500" : "bg-red-500"
                      }>
                        {inspection.result.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{inspection.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Share */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share this Passport</p>
                <p className="text-sm text-muted-foreground">
                  {passportUrl}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => setShowQR(!showQR)}>
                  <QrCode className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(passportUrl)}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="icon" className="bg-orange-500 hover:bg-orange-600">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {showQR && (
              <div className="mt-4 p-4 bg-white rounded-lg flex justify-center">
                <div className="w-40 h-40 bg-muted flex items-center justify-center">
                  <QrCode className="h-20 w-20 text-muted-foreground" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground py-8">
          <p>Powered by MASS OSS • Verified Vehicle Passport System</p>
          <p className="mt-1">© 2026 All rights reserved</p>
        </footer>
      </main>
    </div>
  );
}
