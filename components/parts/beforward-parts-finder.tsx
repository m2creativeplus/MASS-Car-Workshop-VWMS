"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, ExternalLink, ShoppingCart, Info } from "lucide-react"
import { generatePartsSearchUrl, MAKE_IDS, MODEL_IDS } from "@/lib/beforward-integration"

export function BeforwardPartsFinder() {
  const [keyword, setKeyword] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  
  const handleKeywordSearch = () => {
    if (!keyword) return
    const url = generatePartsSearchUrl({ q: keyword })
    window.open(url, '_blank')
  }

  const handleVehicleSearch = () => {
    if (!make) return
    const url = generatePartsSearchUrl({ make, model })
    window.open(url, '_blank')
  }

  // Common parts categories for quick links
  const quickCategories = [
    { name: "Engine & Components", keyword: "Engine" },
    { name: "Transmission & Drivetrain", keyword: "Transmission" },
    { name: "Brakes & Suspension", keyword: "Brake" },
    { name: "Body Parts & Mirrors", keyword: "Body" },
    { name: "Lights & Electrical", keyword: "Light" },
    { name: "Filters & Maintenance", keyword: "Filter" },
  ]

  return (
    <Card className="w-full border-t-4 border-t-red-600 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-red-600" />
            <CardTitle className="text-xl">BE FORWARD Auto Parts</CardTitle>
          </div>
          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-medium border border-red-200">
            JDM Imports
          </span>
        </div>
        <CardDescription>
          Search over 3.5 million used auto parts directly from Japan. 
          Quality parts for Toyota, Nissan, Honda & more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="keyword" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="keyword">By Keyword / Part #</TabsTrigger>
            <TabsTrigger value="vehicle">By Vehicle</TabsTrigger>
          </TabsList>
          
          <TabsContent value="keyword" className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="e.g. 1NZ Engine, Voxy Headlight, 90915-10003"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleKeywordSearch()}
                />
              </div>
              <Button onClick={handleKeywordSearch} className="bg-red-600 hover:bg-red-700 text-white">
                Search <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="vehicle" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Make</Label>
                <Select value={make} onValueChange={setMake}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Make" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(MAKE_IDS).map((m) => (
                      <SelectItem key={m} value={m} className="capitalize">{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Model (Optional)</Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(MODEL_IDS).map((m) => (
                      <SelectItem key={m} value={m} className="capitalize">{m.replace('_', ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleVehicleSearch} className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={!make}>
              Find Parts for Vehicle <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <p className="text-xs text-muted-foreground font-medium mb-3 uppercase tracking-wider">Quick Categories</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {quickCategories.map((cat) => (
              <Button 
                key={cat.keyword} 
                variant="outline" 
                size="sm" 
                className="justify-start text-xs h-9"
                onClick={() => {
                  const url = generatePartsSearchUrl({ q: cat.keyword, make, model })
                  window.open(url, '_blank')
                }}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-2 rounded">
          <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <p>
            Results will open in a new tab on BE FORWARD's website. 
            Use our Partner ID <strong>1546281</strong> if prompted for discounts.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
