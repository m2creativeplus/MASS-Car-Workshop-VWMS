"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function MarketPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Marketplace</AlertTitle>
        <AlertDescription>
          The Parts Marketplace is undergoing maintenance.
        </AlertDescription>
      </Alert>
    </div>
  );
}
