"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function InspectionTemplatesPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Template Builder</AlertTitle>
        <AlertDescription>
          The Inspection Template Builder is currently offline for maintenance.
        </AlertDescription>
      </Alert>
    </div>
  );
}
