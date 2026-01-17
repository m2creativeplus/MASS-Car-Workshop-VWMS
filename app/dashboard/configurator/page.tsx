"use client";

import dynamic from "next/dynamic";

const VehicleConfigurator = dynamic(
  () => import("@/components/ai-tools/vehicle-configurator").then(mod => ({ default: mod.VehicleConfigurator })),
  { ssr: false, loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" /> }
);

export default function ConfiguratorPage() {
  return (
    <div className="p-6">
      <VehicleConfigurator />
    </div>
  );
}
