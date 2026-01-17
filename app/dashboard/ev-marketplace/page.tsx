"use client";

import dynamic from "next/dynamic";

const EVMarketplace = dynamic(
  () => import("@/components/marketplace/ev-marketplace").then(mod => ({ default: mod.EVMarketplace })),
  { ssr: false, loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" /> }
);

export default function EVMarketplacePage() {
  return (
    <div className="p-6">
      <EVMarketplace />
    </div>
  );
}
