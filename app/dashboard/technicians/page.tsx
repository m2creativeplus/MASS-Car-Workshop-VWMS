"use client";

import dynamic from "next/dynamic";

const TechnicianDashboard = dynamic(() => import("@/components/technicians/technician-dashboard").then(m => m.TechnicianDashboard || m.default || m), { ssr: false });

export default function TechniciansPage() {
  return <TechnicianDashboard />;
}
