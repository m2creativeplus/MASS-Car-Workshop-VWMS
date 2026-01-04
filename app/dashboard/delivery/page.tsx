"use client";

import dynamic from "next/dynamic";

const DeliveryModule = dynamic(() => import("@/components/delivery/delivery-module").then(m => m.DeliveryModule || m.default || m), { ssr: false });

export default function DeliveryPage() {
  return <DeliveryModule />;
}
