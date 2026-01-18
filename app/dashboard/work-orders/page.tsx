"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function WorkOrdersPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Work Orders</AlertTitle>
        <AlertDescription>
          The Kanban Board is currently offline for performance tuning.
        </AlertDescription>
      </Alert>
    </div>
  );
}
