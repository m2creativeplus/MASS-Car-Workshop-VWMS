"use client"

import { useState } from "react"
import EstimatesDashboard from "./estimates-dashboard"
import CreateEstimate from "./create-estimate"
import EstimateViewer from "./estimate-viewer"

/**
 * End-to-end Digital Estimating wrapper.
 * Switches between dashboard, create wizard, and viewer.
 */
export function EstimatesModule() {
  const [view, setView] = useState<"dashboard" | "create" | "view">("dashboard")
  const [estimateId, setEstimateId] = useState<string | null>(null)

  const gotoDashboard = () => setView("dashboard")

  return (
    <>
      {view === "dashboard" && (
        <EstimatesDashboard
          onCreate={() => setView("create")}
          onOpen={(id) => {
            setEstimateId(id)
            setView("view")
          }}
        />
      )}

      {view === "create" && (
        <CreateEstimate
          onCancel={gotoDashboard}
          onSaved={(id) => {
            setEstimateId(id)
            setView("view")
          }}
        />
      )}

      {view === "view" && estimateId && <EstimateViewer id={estimateId} onBack={gotoDashboard} />}
    </>
  )
}

export default EstimatesModule
