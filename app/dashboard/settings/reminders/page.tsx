"use client";

import dynamic from "next/dynamic";

const ServiceRemindersSettings = dynamic(
  () => import("@/components/settings/service-reminders-settings").then(mod => ({ default: mod.ServiceRemindersSettings })),
  { ssr: false, loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" /> }
);

export default function RemindersSettingsPage() {
  return (
    <div className="p-6">
      <ServiceRemindersSettings />
    </div>
  );
}
