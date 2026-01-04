"use client"

import { useState, useRef } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Upload, FileJson, FileSpreadsheet, AlertTriangle, CheckCircle2 } from "lucide-react"

export function BulkUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const simulateUpload = async () => {
    if (!file) return
    setUploading(true)
    setProgress(0)
    
    // Simulate parsing and uploading
    for (let i = 0; i <= 100; i += 20) {
      setProgress(i)
      await new Promise(r => setTimeout(r, 400))
    }
    
    setUploading(false)
    setFile(null)
    toast.success("Bulk Upload Complete", {
      description: `Successfully imported records from ${file.name}.`,
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Customers', 'Vehicles', 'Inventory'].map((type) => (
          <Card 
            key={type} 
            className="bg-slate-900 border-white/10 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            <CardHeader className="pb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-sm font-semibold text-white">Bulk {type}</CardTitle>
              <CardDescription className="text-xs text-slate-500">CSV or JSON format</CardDescription>
            </CardHeader>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Card>
        ))}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".csv,.json" 
        onChange={handleFileChange}
      />

      {file && (
        <Card className="bg-slate-900 border-primary/30 border animate-in slide-in-from-bottom-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {file.name.endsWith('.json') ? <FileJson className="h-8 w-8 text-amber-500" /> : <FileSpreadsheet className="h-8 w-8 text-emerald-500" />}
                <div>
                  <h4 className="font-medium text-white text-sm">{file.name}</h4>
                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB ready for import</p>
                </div>
              </div>
              <Button 
                onClick={simulateUpload} 
                disabled={uploading}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {uploading ? "Importing..." : "Start Import"}
              </Button>
            </div>
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Processing records...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5 bg-white/5" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-amber-200">Import Guidelines</p>
          <ul className="text-xs text-amber-500/80 list-disc list-inside space-y-1">
            <li>Customer numbers must be unique within your organization.</li>
            <li>Vehicle VINs should be 17 characters (if provided).</li>
            <li>Inventory categories must match existing system categories.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
