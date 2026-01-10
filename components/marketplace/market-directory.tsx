"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Phone, 
  MapPin, 
  ExternalLink,
  Car,
  Wrench,
  Package,
  Globe,
  MessageCircle
} from "lucide-react"

// Import the collected data
import marketData from "@/data/somaliland-automotive-directory.json"

interface Dealer {
  id: string
  name: string
  type: string
  brands?: string[]
  location: { city: string; address?: string }
  contact?: {
    phone_primary?: string
    website?: string
    facebook?: string
    whatsapp?: string
  }
  services?: string[]
}

interface PartsShop {
  id: string
  name: string
  location: { city: string }
  contact?: { phone_primary?: string }
  specialization?: string
}

interface Garage {
  id: string
  name: string
  location: { city: string }
  services?: string[]
}

export function MarketDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dealers")

  const dealers = marketData.car_dealers as Dealer[]
  const partsShops = marketData.spare_parts_shops as PartsShop[]
  const garages = marketData.garages_workshops as Garage[]

  const filteredDealers = dealers.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredParts = partsShops.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredGarages = garages.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openWhatsApp = (phone: string) => {
    const cleaned = phone.replace(/\s/g, "").replace(/^\+/, "")
    window.open(`https://wa.me/${cleaned}`, "_blank")
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="h-6 w-6 text-[#1B5E20]" />
            Somaliland Market Directory
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {dealers.length} Dealers • {partsShops.length} Parts Shops • {garages.length} Garages
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search businesses..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white dark:bg-slate-900 border">
          <TabsTrigger value="dealers" className="gap-2">
            <Car className="h-4 w-4" /> Dealers ({filteredDealers.length})
          </TabsTrigger>
          <TabsTrigger value="parts" className="gap-2">
            <Package className="h-4 w-4" /> Parts ({filteredParts.length})
          </TabsTrigger>
          <TabsTrigger value="garages" className="gap-2">
            <Wrench className="h-4 w-4" /> Garages ({filteredGarages.length})
          </TabsTrigger>
        </TabsList>

        {/* Dealers Tab */}
        <TabsContent value="dealers" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDealers.map((dealer) => (
              <Card key={dealer.id} className="hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{dealer.name}</CardTitle>
                    <Badge className="bg-[#1B5E20] hover:bg-[#1B5E20]/90">{dealer.type.split(" ")[0]}</Badge>
                  </div>
                  {dealer.brands && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {dealer.brands.map((brand) => (
                        <Badge key={brand} variant="secondary" className="text-xs">{brand}</Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-[#CFA93F]" />
                    <span>{dealer.location.address || dealer.location.city}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {dealer.contact?.phone_primary && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 gap-1"
                        onClick={() => window.open(`tel:${dealer.contact?.phone_primary}`)}
                      >
                        <Phone className="h-3 w-3" /> Call
                      </Button>
                    )}
                    {dealer.contact?.phone_primary && (
                      <Button 
                        size="sm" 
                        className="flex-1 gap-1 bg-[#25D366] hover:bg-[#25D366]/90"
                        onClick={() => openWhatsApp(dealer.contact?.phone_primary || "")}
                      >
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </Button>
                    )}
                    {dealer.contact?.website && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => window.open(`https://${dealer.contact?.website}`, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Parts Tab */}
        <TabsContent value="parts" className="mt-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Shop Name</th>
                  <th className="px-4 py-3 text-left font-semibold">City</th>
                  <th className="px-4 py-3 text-left font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left font-semibold">Specialization</th>
                  <th className="px-4 py-3 text-center font-semibold">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredParts.map((shop) => (
                  <tr key={shop.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3 font-medium">{shop.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{shop.location.city}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{shop.contact?.phone_primary || "-"}</td>
                    <td className="px-4 py-3 text-slate-600">{shop.specialization || "-"}</td>
                    <td className="px-4 py-3 text-center">
                      {shop.contact?.phone_primary && (
                        <Button 
                          size="sm" 
                          className="bg-[#25D366] hover:bg-[#25D366]/90"
                          onClick={() => openWhatsApp(shop.contact?.phone_primary || "")}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Garages Tab */}
        <TabsContent value="garages" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredGarages.map((garage) => (
              <Card key={garage.id} className="border-slate-200 dark:border-slate-800">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-[#CFA93F]/20 flex items-center justify-center">
                      <Wrench className="h-5 w-5 text-[#CFA93F]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{garage.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" /> {garage.location.city}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 text-center border">
          <div className="text-2xl font-bold text-[#1B5E20]">289</div>
          <div className="text-xs text-slate-500">Kulmie Listings</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 text-center border">
          <div className="text-2xl font-bold text-[#CFA93F]">8</div>
          <div className="text-xs text-slate-500">Dubai Exporters</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 text-center border">
          <div className="text-2xl font-bold text-blue-500">4</div>
          <div className="text-xs text-slate-500">Japan Exporters</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 text-center border">
          <div className="text-2xl font-bold text-orange-500">7</div>
          <div className="text-xs text-slate-500">Digital Directories</div>
        </div>
      </div>
    </div>
  )
}
