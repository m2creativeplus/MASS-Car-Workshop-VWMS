"use client"

import { useState } from "react"
import SuppliersDirectory from "./suppliers-directory"
import SupplierDetail from "./supplier-detail"
import AddSupplierForm from "./add-supplier-form"

/**
 * High-level wrapper for all Supplier pages.
 * It swaps between:
 *   • Directory list
 *   • Single supplier detail
 *   • New-supplier form
 *
 * Feel free to replace this very simple state machine with
 * your favourite router or a URL-based approach later.
 */
export function SuppliersModule() {
  const [view, setView] = useState<"directory" | "detail" | "add">("directory")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const backToDirectory = () => setView("directory")

  return (
    <div className="flex flex-col gap-6">
      {view === "directory" && (
        <SuppliersDirectory
          onSelect={(id) => {
            setSelectedId(id)
            setView("detail")
          }}
          onAddSupplier={() => setView("add")}
        />
      )}

      {view === "detail" && selectedId && <SupplierDetail supplierId={selectedId} onBack={backToDirectory} />}

      {view === "add" && <AddSupplierForm onBack={backToDirectory} />}
    </div>
  )
}

export default SuppliersModule
