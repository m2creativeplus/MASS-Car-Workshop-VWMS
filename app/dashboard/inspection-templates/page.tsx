"use client";

import dynamic from "next/dynamic";

const InspectionTemplateBuilder = dynamic(() => import("@/components/inspections/inspection-template-builder").then(m => m.InspectionTemplateBuilder || m.default || m), { ssr: false });

export default function InspectionTemplatesPage() {
  return <InspectionTemplateBuilder />;
}
