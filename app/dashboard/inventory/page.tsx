"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Inventory System</AlertTitle>
        <AlertDescription>
          Inventory Management is being upgraded. Please use the spreadsheet backup for now.
        </AlertDescription>
      </Alert>
    </div>
  );
}
