"use client";

import dynamic from "next/dynamic";

const NetworkExplorer = dynamic(() => import("@/components/network/network-explorer").then(m => m.NetworkExplorer || m.default || m), { ssr: false });

export default function NetworkPage() {
  return <NetworkExplorer />;
}
