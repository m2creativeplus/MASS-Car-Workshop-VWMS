"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function InspectionsPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Inspections Module</AlertTitle>
        <AlertDescription>
          The Inspections system is currently offline for maintenance.
        </AlertDescription>
      </Alert>
    </div>
  );
}
