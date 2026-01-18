"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function MassOSPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>MASS OS Dashboard</AlertTitle>
        <AlertDescription>
          The Operating System Dashboard is upgrading.
        </AlertDescription>
      </Alert>
    </div>
  );
}
