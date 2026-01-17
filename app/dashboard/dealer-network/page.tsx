"use client";

import dynamic from "next/dynamic";

const DealerNetwork = dynamic(
  () => import("@/components/network/dealer-network").then(mod => ({ default: mod.DealerNetwork })),
  { ssr: false, loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" /> }
);

export default function DealerNetworkPage() {
  return (
    <div className="p-6">
      <DealerNetwork />
    </div>
  );
}
