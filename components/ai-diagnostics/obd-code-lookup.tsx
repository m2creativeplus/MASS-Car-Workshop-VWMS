"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench,
  Clock,
  DollarSign,
  CarFront,
  Loader2,
  Info,
  ShieldAlert
} from "lucide-react"
import { decodeDTC, searchDTCByKeyword, getDTCSystem, getSeverityColor, type DTCResult } from "@/lib/obd-decoder"

export function OBDCodeLookup() {
  const [codeInput, setCodeInput] = useState("")
  const [result, setResult] = useState<DTCResult | null>(null)
  const [searchResults, setSearchResults] = useState<DTCResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLookup = () => {
    setLoading(true)
    setError(null)
    setSearchResults([])
    
    // Simulate brief loading for UX
    setTimeout(() => {
      const decoded = decodeDTC(codeInput)
      if (decoded) {
        setResult(decoded)
      } else {
        // Try keyword search
        const results = searchDTCByKeyword(codeInput)
        if (results.length > 0) {
          setSearchResults(results)
          setResult(null)
        } else {
          setError("Invalid code format. Use format: P0300, C0035, B1000, or U0100")
        }
      }
      setLoading(false)
    }, 300)
  }

  const getSeverityBadge = (severity: DTCResult['severity']) => {
    const styles = {
      low: "bg-green-500",
      medium: "bg-amber-500", 
      high: "bg-red-500",
      critical: "bg-red-700 animate-pulse"
    }
    return <Badge className={`${styles[severity]} text-white`}>{severity.toUpperCase()}</Badge>
  }

  const getSystemIcon = (system: DTCResult['system']) => {
    switch (system) {
      case 'powertrain': return <CarFront className="h-5 w-5" />
      case 'chassis': return <Wrench className="h-5 w-5" />
      case 'body': return <ShieldAlert className="h-5 w-5" />
      case 'network': return <Info className="h-5 w-5" />
    }
  }

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Search className="h-5 w-5 text-blue-500" />
          OBD-II Code Lookup
        </CardTitle>
        <CardDescription>
          Enter a diagnostic trouble code (DTC) to get detailed information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <Input
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
            placeholder="Enter code (e.g., P0300)"
            className="font-mono text-lg"
            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
          />
          <Button 
            onClick={handleLookup} 
            disabled={!codeInput || loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {/* Quick Codes */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-slate-500">Quick lookup:</span>
          {['P0300', 'P0420', 'P0171', 'P0505', 'C0035'].map(code => (
            <Button
              key={code}
              variant="outline"
              size="sm"
              className="h-6 text-xs font-mono"
              onClick={() => {
                setCodeInput(code)
                setTimeout(() => {
                  const decoded = decodeDTC(code)
                  if (decoded) setResult(decoded)
                }, 100)
              }}
            >
              {code}
            </Button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="h-12 w-12 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: getSeverityColor(result.severity) }}
                >
                  {getSystemIcon(result.system)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-mono">{result.code}</h3>
                  <p className="text-sm text-slate-500">{getDTCSystem(result.code)}</p>
                </div>
              </div>
              {getSeverityBadge(result.severity)}
            </div>

            {/* Description */}
            <div className="p-3 bg-white dark:bg-slate-800 rounded border">
              <p className="font-medium">{result.description}</p>
            </div>

            {/* Possible Causes */}
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Possible Causes
              </h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-slate-600 dark:text-slate-400">
                {result.possibleCauses.map((cause, i) => (
                  <li key={i}>{cause}</li>
                ))}
              </ul>
            </div>

            {/* Common Parts */}
            {result.commonParts.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-blue-500" />
                  Common Parts Needed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.commonParts.map((part, i) => (
                    <Badge key={i} variant="outline" className="font-normal">
                      {part}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Labor Estimate */}
            {result.laborHours && (
              <div className="flex gap-4 pt-2 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Est. Labor: <strong>{result.laborHours} hrs</strong></span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Found {searchResults.length} matching codes:</p>
            {searchResults.slice(0, 5).map(r => (
              <button
                key={r.code}
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded border hover:border-blue-500 transition-colors text-left"
                onClick={() => {
                  setResult(r)
                  setSearchResults([])
                  setCodeInput(r.code)
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold">{r.code}</span>
                  {getSeverityBadge(r.severity)}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{r.description}</p>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default OBDCodeLookup
