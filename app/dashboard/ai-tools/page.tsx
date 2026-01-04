"use client";

import dynamic from "next/dynamic";

const AITools = dynamic(() => import("@/components/ai-tools/ai-tools").then(m => m.AITools || m.default || m), { ssr: false });

export default function AIToolsPage() {
  return <AITools />;
}
