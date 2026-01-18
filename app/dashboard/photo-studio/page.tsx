"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function PhotoStudioPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>AI Photo Studio</AlertTitle>
        <AlertDescription>
          The Background Removal & Enhancement engine is upgrading.
        </AlertDescription>
      </Alert>
    </div>
  );
}
