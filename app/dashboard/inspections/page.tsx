"use client";

import dynamic from "next/dynamic";

const InspectionsModule = dynamic(() => import("@/components/inspections/inspections-module").then(m => m.InspectionsModule || m.default || m), { ssr: false });

export default function InspectionsPage() {
  return <InspectionsModule />;
}
