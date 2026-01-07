"use client"

import { MobileApprovalFlow } from "@/components/customer-portal/mobile-approval-flow"

export default function CustomerPortalDemoPage() {
  return (
    <div className="bg-slate-900 flex justify-center items-center min-h-screen p-4">
      {/* Phone Simulator Frame */}
      <div className="relative w-full max-w-[400px] h-[850px] bg-black rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
         {/* Dynamic Island / Notch */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50"></div>
         
         {/* The App Content */}
         <div className="h-full w-full bg-white dark:bg-slate-950 overflow-y-auto scrollbar-hide">
            <MobileApprovalFlow />
         </div>

         {/* Home Indicator */}
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50"></div>
      </div>
      
      {/* Context Label */}
      <div className="fixed bottom-8 text-slate-500 text-sm font-mono hidden md:block">
         Simulated Mobile View • iPhone 14 Pro
      </div>
    </div>
  )
}
