"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function JapanImportsPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Japan Imports & Parts Finder</AlertTitle>
        <AlertDescription>
          The API connection to BeForward is currently being re-configured.
        </AlertDescription>
      </Alert>
    </div>
  );
}
