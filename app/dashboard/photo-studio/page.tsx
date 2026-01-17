"use client";

import dynamic from "next/dynamic";

// Dynamic imports to avoid SSR issues
const VehiclePhotoStudio = dynamic(
  () => import("@/components/ai-tools/vehicle-photo-studio").then(mod => ({ default: mod.VehiclePhotoStudio })),
  { ssr: false, loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" /> }
);

export default function PhotoStudioPage() {
  return (
    <div className="p-6">
      <VehiclePhotoStudio />
    </div>
  );
}
