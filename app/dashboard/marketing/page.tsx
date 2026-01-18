"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Marketing Hub</AlertTitle>
        <AlertDescription>
          Campaign templates are being updated.
        </AlertDescription>
      </Alert>
    </div>
  );
}
