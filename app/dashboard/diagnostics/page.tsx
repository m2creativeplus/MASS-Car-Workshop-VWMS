"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function DiagnosticsPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>AI Diagnostics Module</AlertTitle>
        <AlertDescription>
          This AI-powered module is undergoing an upgrade. Service will resume in the next deployment.
        </AlertDescription>
      </Alert>
    </div>
  );
}
