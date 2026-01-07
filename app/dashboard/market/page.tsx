"use client"

import { SupplierCatalog } from "@/components/marketplace/supplier-catalog"

export default function MarketPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 hover:scale-[1.002] transition-transform">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Marketplace
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Source parts from verified local stockists and global partners.
        </p>
      </div>
      
      <SupplierCatalog />
    </div>
  )
}
