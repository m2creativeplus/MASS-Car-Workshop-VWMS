"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Car, Ship, ShieldCheck, ExternalLink, Filter, TrendingUp, Calendar } from "lucide-react"
import { generateVehicleSearchUrl, getPopularImportModels } from "@/lib/beforward-integration"

export function JapanVehicleImport() {
  const [selectedMake, setSelectedMake] = useState("")
  const [minYear, setMinYear] = useState("2015")
  const [maxPrice, setMaxPrice] = useState("5000")
  
  const popularModels = getPopularImportModels()

  const handleSearch = (make?: string, model?: string) => {
    const url = generateVehicleSearchUrl({
      make: make || selectedMake,
      model,
      year_from: minYear,
      price_to: maxPrice
    })
    window.open(url, '_blank')
  }

  // Calculate estimated landing cost (simplified)
  const calculateLandedCost = (fobPrice: number) => {
    // These are simplified estimates for Somaliland context
    const shipping = 1200
    const taxRate = 0.45 // 45% simplified duty
    const clearing = 300
    
    // Total = (FOB + Shipping) * (1 + Tax) + Clearing
    const cif = fobPrice + shipping
    const total = (cif * (1 + taxRate)) + clearing
    return Math.round(total)
  }

  return (
    <div className="space-y-6">
      {/* Hero / Search Section */}
      <Card className="bg-gradient-to-r from-blue-900 to-slate-900 text-white border-0">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-400">Direct From Japan</Badge>
              <h2 className="text-3xl font-bold">Import Quality Used Cars</h2>
              <p className="text-blue-200">
                Access 200,000+ vehicles with BE FORWARD tracking. 
                We handle the clearing and registration process for you.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
                <div className="space-y-1">
                  <Label className="text-blue-200 text-xs">Make</Label>
                  <Select value={selectedMake} onValueChange={setSelectedMake}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Any Make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="nissan">Nissan</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="suzuki">Suzuki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-blue-200 text-xs">Min Year</Label>
                  <Select value={minYear} onValueChange={setMinYear}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2010">2010</SelectItem>
                      <SelectItem value="2015">2015</SelectItem>
                      <SelectItem value="2018">2018</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-blue-200 text-xs">Max Price (USD)</Label>
                  <Select value={maxPrice} onValueChange={setMaxPrice}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3000">$3,000</SelectItem>
                      <SelectItem value="5000">$5,000</SelectItem>
                      <SelectItem value="8000">$8,000</SelectItem>
                      <SelectItem value="15000">$15,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={() => handleSearch()} className="w-full bg-blue-500 hover:bg-blue-600 font-semibold">
                    Search Stock
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block w-[200px] text-center">
               <div className="relative">
                 <Ship className="h-24 w-24 text-blue-400 mx-auto opacity-80" />
                 <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                   LIVE
                 </div>
               </div>
               <p className="text-sm font-medium mt-2">Next Shipment: 15 Days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Models Grid */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Popular in Somaliland
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularModels.map((model) => (
            <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-40 bg-muted relative group-hover:opacity-90 transition-opacity">
                {/* Placeholder for car image - ideally utilize BE FORWARD image URLs carefully */}
                <div className="flex items-center justify-center h-full text-muted-foreground bg-gray-200">
                  <Car className="h-12 w-12 opacity-20" />
                </div>
                <Badge className="absolute top-2 right-2 bg-black/50 hover:bg-black/70">
                  {model.make}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="font-bold text-lg mb-1">{model.name}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 2015-2018</span>
                  <span>From $3,500 FOB</span>
                </div>
                <div className="space-y-2 text-xs bg-slate-50 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Est. Landed Cost:</span>
                    <span className="font-bold text-slate-900 border-b border-dashed border-slate-400 cursor-help" title="Includes Shipping, Tax & Clearing">
                      ${calculateLandedCost(3500).toLocaleString()}*
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-muted/20 border-t">
                <Button variant="outline" className="w-full" onClick={() => handleSearch(model.make, model.id)}>
                  View Available Stock <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic">
          * Estimated landed cost includes estimated shipping, taxes, and clearing fees. Actual costs may vary.
        </p>
      </div>

      {/* Import Request CTA */}
      <Card className="border-l-4 border-l-green-600">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
             <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
               <ShieldCheck className="h-6 w-6 text-green-600" />
             </div>
             <div>
               <h3 className="font-bold text-lg">Detailed Import Request?</h3>
               <p className="text-muted-foreground">
                 Looking for a specific trim, color, or condition? 
                 Submit a request and our sourcing team will find it for you.
               </p>
             </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                Start Import Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Vehicle Import Request</DialogTitle>
                <DialogDescription>
                  Tell us exactly what you're looking for. We'll search auctions and dealers in Japan.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Make</Label>
                    <Input placeholder="e.g. Toyota" />
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input placeholder="e.g. Land Cruiser Prado" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Year Range</Label>
                    <Input placeholder="e.g. 2018-2022" />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Budget (USD)</Label>
                    <Input placeholder="e.g. 25000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Specific Requirements</Label>
                  <Input placeholder="e.g. Sunroof, Leather Seats, Low Mileage, Pearl White" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <Input placeholder="+252 ..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
