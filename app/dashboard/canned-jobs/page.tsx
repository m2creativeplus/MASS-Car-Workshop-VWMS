"use client";

import dynamic from "next/dynamic";

const CannedJobsLibrary = dynamic(() => import("@/components/canned-jobs/canned-jobs-library").then(m => m.CannedJobsLibrary || m.default || m), { ssr: false });

export default function CannedJobsPage() {
  return <CannedJobsLibrary />;
}
