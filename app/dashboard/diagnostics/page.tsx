"use client";

import dynamic from "next/dynamic";

const AutoDiagnosticsModule = dynamic(() => import("@/components/ai-diagnostics/auto-diagnostics-module").then(m => m.AutoDiagnosticsModule || m.default || m), { ssr: false });

export default function DiagnosticsPage() {
  return <AutoDiagnosticsModule />;
}
