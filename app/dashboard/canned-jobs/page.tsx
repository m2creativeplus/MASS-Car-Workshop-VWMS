"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function CannedJobsPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Module Under Maintenance</AlertTitle>
        <AlertDescription>
          The Canned Jobs Library is currently being optimized and will be back online shortly.
        </AlertDescription>
      </Alert>
    </div>
  );
}
