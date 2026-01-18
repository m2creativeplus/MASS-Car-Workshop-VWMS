"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function ImportDutyPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Import Duty Calculator</AlertTitle>
        <AlertDescription>
          The GovTech connection is currently offline.
        </AlertDescription>
      </Alert>
    </div>
  );
}
