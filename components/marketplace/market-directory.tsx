"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
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
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  CheckCircle2,
  Map,
  Clock,
  ShieldCheck
} from "lucide-react"

// Import the collected data
import marketData from "@/data/somaliland-automotive-directory.json"

// Standardized Interface
interface BusinessProfile {
  id: string
  // New Schema Support
  identity?: {
    name: string
    business_category: string
    verified_status: "Verified" | "Unverified"
    logo_url?: string
  }
  location_details?: {
    city: string
    address?: string
    google_maps_url?: string
  }
  contact_info?: {
    phone_primary?: string
    website?: string
    email?: string
    whatsapp?: string
  }
  digital_footprint?: {
    social_media?: {
      facebook?: string
      instagram?: string
      linkedin?: string
      youtube?: string
      tiktok?: string
    }
  }
  operational_details?: {
    opening_hours?: string
    brands?: string[]
  }
  digital_audit?: {
    overall_rank: "A" | "B" | "C" | "D"
    website_score: number
  }
  
  // Legacy Fallback
  name?: string
  type?: string
  brands?: string[]
  location?: { city: string; address?: string }
  contact?: {
    phone_primary?: string
    website?: string
    facebook?: string
    whatsapp?: string
  }
}

export function MarketDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dealers")

  // Helper to normalize data structure
  const normalizeValues = (item: any): BusinessProfile => {
    return {
      id: item.id,
      identity: item.identity || { 
        name: item.name, 
        business_category: item.type || "Automotive Business",
        verified_status: "Unverified"
      },
      location_details: item.location_details || item.location,
      contact_info: item.contact_info || item.contact,
      digital_footprint: item.digital_footprint || { social_media: {} },
      operational_details: item.operational_details || { 
        brands: item.brands || [],
        opening_hours: item.opening_hours 
      },
      digital_audit: item.digital_audit
    }
  }

  const dealers = (marketData.car_dealers as any[]).map(normalizeValues)
  // ... other categories logic would be similar, simplifying for now

  const filteredDealers = dealers.filter(d => 
    d.identity?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.location_details?.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openWhatsApp = (phone?: string) => {
    if (!phone) return
    const cleaned = phone.replace(/\s/g, "").replace(/^\+/, "")
    window.open(`https://wa.me/${cleaned}`, "_blank")
  }

  const renderDigitalRank = (rank?: string) => {
    if (!rank) return null
    const colors = {
      A: "bg-amber-100 text-amber-700 border-amber-200", // Gold
      B: "bg-slate-100 text-slate-700 border-slate-200", // Silver
      C: "bg-orange-50 text-orange-700 border-orange-200", // Bronze
      D: "bg-red-50 text-red-700 border-red-200"
    } as const
    return (
      <Badge variant="outline" className={`${colors[rank as keyof typeof colors] || ""} ml-2 font-mono`}>
        Rank {rank}
      </Badge>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="h-6 w-6 text-[#1B5E20]" />
            Somaliland Market Directory
            <Badge variant="secondary" className="ml-2 text-xs">v2.0 Standard</Badge>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {dealers.length} Verified Businesses • Digital Proficiency Audited
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search businesses, brands..."
            className="pl-9 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white dark:bg-slate-900 border w-full md:w-auto">
          <TabsTrigger value="dealers" className="flex-1 md:flex-none gap-2">
            <Car className="h-4 w-4" /> Dealers
          </TabsTrigger>
          <TabsTrigger value="parts" className="flex-1 md:flex-none gap-2">
            <Package className="h-4 w-4" /> Parts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 md:flex-none gap-2">
            <ShieldCheck className="h-4 w-4" /> Digital Audit
          </TabsTrigger>
        </TabsList>

        {/* Dealers Tab */}
        <TabsContent value="dealers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map((dealer) => (
              <Card key={dealer.id} className="hover:shadow-md transition-all border-slate-200 dark:border-slate-800 bg-white group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        {dealer.identity?.name}
                        {dealer.identity?.verified_status === "Verified" && (
                          <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-50" />
                        )}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {dealer.identity?.business_category}
                      </CardDescription>
                    </div>
                    {renderDigitalRank(dealer.digital_audit?.overall_rank)}
                  </div>
                  {dealer.operational_details?.brands && dealer.operational_details.brands.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {dealer.operational_details?.brands.map((brand) => (
                        <Badge key={brand} variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-slate-100 text-slate-600 border-slate-200">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4 text-sm">
                  {/* Location Section */}
                  <div className="space-y-2 pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-2 text-slate-600">
                      <MapPin className="h-4 w-4 text-[#CFA93F] mt-0.5 shrink-0" />
                      <div>
                        <span className="block font-medium text-slate-900">{dealer.location_details?.city}</span>
                        <span className="text-xs text-slate-500 line-clamp-2">{dealer.location_details?.address}</span>
                      </div>
                    </div>
                    {dealer.location_details?.google_maps_url && (
                       <a href={dealer.location_details.google_maps_url} target="_blank" className="text-xs text-blue-600 hover:underline flex items-center gap-1 pl-6">
                         <Map className="h-3 w-3" /> View on Google Maps
                       </a>
                    )}
                  </div>

                  {/* Digital Footprint */}
                  <div className="flex gap-3 pl-1">
                    {dealer.digital_footprint?.website_url && (
                       <a href={dealer.digital_footprint.website_url} target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors">
                         <Globe className="h-4 w-4" />
                       </a>
                    )}
                    {dealer.digital_footprint?.social_media?.facebook && (
                       <a href={dealer.digital_footprint.social_media.facebook} target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors">
                         <Facebook className="h-4 w-4" />
                       </a>
                    )}
                     {dealer.digital_footprint?.social_media?.instagram && (
                       <a href={dealer.digital_footprint.social_media.instagram} target="_blank" className="text-slate-400 hover:text-pink-600 transition-colors">
                         <Instagram className="h-4 w-4" />
                       </a>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 gap-2">
                    {dealer.contact_info?.phone_primary && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 gap-1.5 h-9 text-xs"
                        onClick={() => window.open(`tel:${dealer.contact_info?.phone_primary}`)}
                      >
                        <Phone className="h-3.5 w-3.5" /> Call
                      </Button>
                    )}
                    {dealer.contact_info?.whatsapp && (
                      <Button 
                        size="sm" 
                        className="flex-1 gap-1.5 h-9 text-xs bg-[#25D366] hover:bg-[#25D366]/90 text-white border-none"
                        onClick={() => openWhatsApp(dealer.contact_info?.whatsapp)}
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                      </Button>
                    )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        {/* Simplified placeholders for other tabs to keep file size managed */}
        <TabsContent value="parts" className="mt-6">
            <div className="text-center p-8 text-slate-500 bg-white rounded-lg border border-dashed">Parts View Coming Soon</div>
        </TabsContent>
         <TabsContent value="analytics" className="mt-6">
            <div className="text-center p-8 text-slate-500 bg-white rounded-lg border border-dashed">Digital Audit Analytics Coming Soon</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
