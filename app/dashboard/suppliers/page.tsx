"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function SuppliersPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Supplier Directory</AlertTitle>
        <AlertDescription>
          The Supplier Directory is currently offline.
        </AlertDescription>
      </Alert>
    </div>
  );
}
