"use client";

import dynamic from "next/dynamic";

const EstimatesModule = dynamic(() => import("@/components/estimates/estimates-module").then(m => m.EstimatesModule || m.default || m), { ssr: false });

export default function EstimatesPage() {
  return <EstimatesModule />;
}
