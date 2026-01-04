"use client";

import dynamic from "next/dynamic";

const RemindersModule = dynamic(() => import("@/components/reminders/reminders-module").then(m => m.RemindersModule || m.default || m), { ssr: false });

export default function RemindersPage() {
  return <RemindersModule />;
}
