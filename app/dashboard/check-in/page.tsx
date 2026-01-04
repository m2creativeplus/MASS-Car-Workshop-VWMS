"use client";

import { useRouter } from "next/navigation";
import VehicleCheckInWizard from "@/components/inspections/vehicle-check-in-wizard";
import { useOrganization } from "@/components/providers/organization-provider";
import { Loader2 } from "lucide-react";

export default function NewCheckInPage() {
  const router = useRouter();
  const { organization, isLoading } = useOrganization();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }
  
  if (!organization) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500">No organization found. Please log in again.</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <VehicleCheckInWizard 
        orgId={organization._id}
        onComplete={(data) => {
          console.log("Check-in complete:", data);
          router.push("/dashboard/work-orders");
        }}
        onCancel={() => {
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
