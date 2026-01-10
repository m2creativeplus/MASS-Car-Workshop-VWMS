"use client";

import dynamic from "next/dynamic";

const SuppliersModule = dynamic(() => import("@/components/suppliers/suppliers-module").then(m => m.SuppliersModule || m.default || m), { ssr: false });

export default function SuppliersPage() {
  return <SuppliersModule />;
}
