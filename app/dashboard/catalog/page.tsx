"use client";

import dynamic from "next/dynamic";

const CatalogModule = dynamic(() => import("@/components/catalog/catalog-module").then(m => m.CatalogModule || m.default || m), { ssr: false });

export default function CatalogPage() {
  return <CatalogModule />;
}
