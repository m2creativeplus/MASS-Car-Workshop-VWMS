"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function VehicleCheckInWizard() {
  return (
    <div className="p-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Check-In Wizard</AlertTitle>
        <AlertDescription>
          The Vehicle Check-In Wizard is currently under maintenance.
        </AlertDescription>
      </Alert>
    </div>
  );
}
