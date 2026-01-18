"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Settings</AlertTitle>
        <AlertDescription>
          System configuration is restricted during the upgrade process.
        </AlertDescription>
      </Alert>
    </div>
  );
}
