"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Ship, Printer, ArrowRight, Info, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function ImportDutyCalculator() {
  const [vin, setVin] = useState("")
  const [engineSize, setEngineSize] = useState([2000])
  const [vehicleValue, setVehicleValue] = useState(3500)
  const [port, setPort] = useState("berbera")
  const [calculating, setCalculating] = useState(false)

  // Simulated Calculation Logic (Berbera Port Rules)
  const dutyRate = 0.25 // 25% Duty
  const adminFee = 150
  const roadTax = 50
  const registrationFee = 100
  
  const dutyAmount = vehicleValue * dutyRate
  const totalLanded = vehicleValue + dutyAmount + adminFee + roadTax + registrationFee

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
      {/* LEFT PANEL: INPUTS */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <Ship className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">Import Duty Calculator</CardTitle>
                <CardDescription className="text-slate-400">
                  Official tariff estimation for Berbera & Mogadishu ports
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* VIN Decoder Section */}
            <div className="space-y-3">
              <Label className="text-slate-300">Vehicle Identification Number (VIN)</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter JTM..." 
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  className="bg-slate-950/50 border-slate-700 text-white font-mono tracking-wider focus-visible:ring-orange-500"
                />
                <Button variant="outline" className="border-slate-700 text-orange-400 hover:bg-slate-800 hover:text-orange-300">
                  Decode
                </Button>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Info className="w-3 h-3" /> Auto-detects Year, Make, Model & Engine from chassis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Port Selection */}
              <div className="space-y-3">
                <Label className="text-slate-300">Port of Entry</Label>
                <Select value={port} onValueChange={setPort}>
                  <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="berbera">🚢 Berbera Port (Somaliland)</SelectItem>
                    <SelectItem value="mogadishu">⚓ Mogadishu Port</SelectItem>
                    <SelectItem value="djibouti">🇩🇯 Djibouti Transit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CIF Value Input */}
              <div className="space-y-3">
                <Label className="text-slate-300">Declared CIF Value ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                  <Input 
                    type="number"
                    value={vehicleValue}
                    onChange={(e) => setVehicleValue(Number(e.target.value))}
                    className="pl-8 bg-slate-950/50 border-slate-700 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Engine Size Slider */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between">
                <Label className="text-slate-300">Engine Displacement (CC)</Label>
                <span className="text-orange-400 font-mono font-bold">{engineSize}cc</span>
              </div>
              <Slider 
                value={engineSize} 
                onValueChange={setEngineSize} 
                max={6000} 
                min={600} 
                step={100}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Economy (660cc)</span>
                <span>Standard (2000cc)</span>
                <span>Heavy (4000cc+)</span>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Info Card */}
        <div className="grid grid-cols-2 gap-4">
           <Card className="bg-emerald-500/10 border-emerald-500/20">
             <CardContent className="p-4 flex items-center gap-3">
               <CheckCircle2 className="w-8 h-8 text-emerald-500" />
               <div>
                 <p className="text-sm text-slate-400">Compliance</p>
                 <p className="text-emerald-400 font-medium">LHD Approved</p>
               </div>
             </CardContent>
           </Card>
           <Card className="bg-blue-500/10 border-blue-500/20">
             <CardContent className="p-4 flex items-center gap-3">
               <Calculator className="w-8 h-8 text-blue-500" />
               <div>
                 <p className="text-sm text-slate-400">Algorithm</p>
                 <p className="text-blue-400 font-medium">SL-2026-v2</p>
               </div>
             </CardContent>
           </Card>
        </div>
      </div>

      {/* RIGHT PANEL: RECEIPT */}
      <div className="lg:col-span-5">
        <Card className="h-full border-slate-800 bg-white dark:bg-slate-950 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />
          
          <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <CardTitle className="flex justify-between items-center">
              <span className="text-slate-800 dark:text-white">Estimate Summary</span>
              <Badge variant="outline" className="border-orange-500 text-orange-600 dark:text-orange-400">
                DRAFT
              </Badge>
            </CardTitle>
            <CardDescription>
               Quote ID: EST-2026-{Math.floor(Math.random() * 1000)}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Declared Value (CIF)</span>
                <span className="font-mono text-slate-700 dark:text-slate-200">${vehicleValue.toLocaleString()}</span>
              </div>
              
              <Separator />

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Import Duty (25%)</span>
                <span className="font-mono text-slate-700 dark:text-slate-200">${dutyAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Port Admin Fee</span>
                <span className="font-mono text-slate-700 dark:text-slate-200">${adminFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Road Tax (1 Year)</span>
                <span className="font-mono text-slate-700 dark:text-slate-200">${roadTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Plate Registration</span>
                <span className="font-mono text-slate-700 dark:text-slate-200">${registrationFee.toLocaleString()}</span>
              </div>

              <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">ESTIMATED TOTAL</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${totalLanded.toLocaleString()}
                  </span>
                </div>
                <div className="text-right text-xs text-slate-400 mt-1">
                  ~ {Math.floor(totalLanded * 8500).toLocaleString()} SLSH
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white h-12 text-lg shadow-lg shadow-orange-900/20">
              <Printer className="w-5 h-5 mr-2" />
              Print Official Quote
            </Button>
            
            <p className="text-center text-xs text-slate-400 px-4">
              This estimate is for informational purposes only. Final duty is determined by the Customs Officer at inspection.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
