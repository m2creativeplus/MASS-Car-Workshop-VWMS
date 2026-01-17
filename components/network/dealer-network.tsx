"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Phone,
  Globe,
  Star,
  Search,
  Building2,
  Wrench,
  Car,
  Truck,
  ExternalLink,
  Filter,
  CheckCircle2,
  Navigation
} from "lucide-react";

// Import dealer data
import dealerData from "@/data/horn-of-africa-dealers.json";

interface Dealer {
  id: string;
  name: string;
  type: string;
  brands?: string[];
  url?: string;
  location?: { city: string; country: string };
  services?: string[];
  verified?: boolean;
  featured?: boolean;
}

/**
 * Horn of Africa Dealer Network
 * 
 * Features: Dealer directory, filtering, contact
 * Source: M2 Dev Library - horn-of-africa.json
 */
export function DealerNetwork() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<"all" | "somaliland" | "somalia" | "djibouti">("all");

  // Flatten dealers from all countries
  const allDealers: Dealer[] = [
    ...(dealerData.somaliland?.dealers || []).map((d: any) => ({ ...d, country: "Somaliland" })),
    ...(dealerData.somalia?.dealers || []).map((d: any) => ({ ...d, country: "Somalia" })),
    ...(dealerData.djibouti?.dealers || []).map((d: any) => ({ ...d, country: "Djibouti" })),
  ];

  const filteredDealers = allDealers.filter(dealer => {
    const matchesSearch = dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.brands?.some((b: string) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCountry = selectedCountry === "all" || 
      dealer.location?.country.toLowerCase() === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const popularBrands = dealerData.somaliland?.marketData?.popularBrands || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6 text-orange-500" />
            Dealer Network
          </h1>
          <p className="text-muted-foreground">
            Verified automotive dealers in the Horn of Africa
          </p>
        </div>
        <Badge className="bg-blue-100 text-blue-700">
          {allDealers.length} Dealers
        </Badge>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">$240M</p>
            <p className="text-xs text-muted-foreground">Somalia Imports 2023</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">$621M</p>
            <p className="text-xs text-muted-foreground">Djibouti Imports 2023</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">57%</p>
            <p className="text-xs text-muted-foreground">Growth Q1 2024</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">#139</p>
            <p className="text-xs text-muted-foreground">Global Import Rank</p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Brands */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {popularBrands.map((brand: string) => (
          <Badge 
            key={brand} 
            variant="outline" 
            className="cursor-pointer hover:bg-orange-100"
            onClick={() => setSearchQuery(brand)}
          >
            {brand}
          </Badge>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search dealers or brands..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "somaliland", "somalia", "djibouti"] as const).map(country => (
            <Button
              key={country}
              variant={selectedCountry === country ? "default" : "outline"}
              onClick={() => setSelectedCountry(country)}
              className="capitalize"
            >
              {country === "all" ? "All" : country}
            </Button>
          ))}
        </div>
      </div>

      {/* Dealer Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredDealers.map(dealer => (
          <Card 
            key={dealer.id} 
            className={`overflow-hidden ${dealer.featured ? "ring-2 ring-orange-500" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    {dealer.name}
                    {dealer.verified && (
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    )}
                    {dealer.featured && (
                      <Badge className="bg-orange-500">Featured</Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{dealer.type}</p>
                </div>
                <Badge variant="outline" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {dealer.location?.city || "N/A"}
                </Badge>
              </div>

              {/* Brands */}
              {dealer.brands && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {dealer.brands.map((brand: string) => (
                    <Badge key={brand} variant="secondary" className="text-xs">
                      {brand}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Services */}
              {dealer.services && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {dealer.services.slice(0, 3).map((service: string) => (
                    <span key={service} className="text-xs text-muted-foreground flex items-center gap-1">
                      <Wrench className="h-3 w-3" />
                      {service}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                {dealer.url && (
                  <Button size="sm" variant="outline" className="gap-1" asChild>
                    <a href={dealer.url} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-3 w-3" />
                      Website
                    </a>
                  </Button>
                )}
                <Button size="sm" className="gap-1 bg-orange-500 hover:bg-orange-600">
                  <Phone className="h-3 w-3" />
                  Contact
                </Button>
                <Button size="sm" variant="ghost" className="gap-1">
                  <Navigation className="h-3 w-3" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDealers.length === 0 && (
        <Card className="p-8 text-center text-muted-foreground">
          <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No dealers found matching your search.</p>
        </Card>
      )}

      {/* Import Sources */}
      <Card className="bg-slate-50 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Import Facilitators
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Japan</h4>
              <div className="space-y-1">
                {["BE FORWARD", "SBT Japan", "Carapis"].map(name => (
                  <Badge key={name} variant="outline" className="block w-fit">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">UAE</h4>
              <div className="space-y-1">
                {["Dubai Used Cars", "Al-Futtaim"].map(name => (
                  <Badge key={name} variant="outline" className="block w-fit">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Ports</h4>
              <div className="space-y-1">
                {["Berbera", "Mogadishu", "Djibouti"].map(name => (
                  <Badge key={name} variant="outline" className="block w-fit">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
