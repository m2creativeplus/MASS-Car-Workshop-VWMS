"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  Battery,
  Leaf,
  MapPin,
  ExternalLink,
  Search,
  Filter,
  Star,
  DollarSign,
  Globe,
  Car,
  ChevronRight,
  TrendingUp
} from "lucide-react";

interface EVVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  range: number;
  price: number;
  image: string;
  batterySize: string;
  chargeTime: string;
  available: boolean;
}

interface ChargingStation {
  id: string;
  name: string;
  location: string;
  type: "fast" | "standard";
  connectors: string[];
  available: boolean;
  distance?: string;
}

const EV_VEHICLES: EVVehicle[] = [
  {
    id: "ev1",
    make: "BYD",
    model: "Atto 3",
    year: 2024,
    range: 420,
    price: 32000,
    image: "https://source.unsplash.com/400x300/?electric,car,byd",
    batterySize: "60.48 kWh",
    chargeTime: "50 min (80%)",
    available: true,
  },
  {
    id: "ev2",
    make: "MG",
    model: "ZS EV",
    year: 2024,
    range: 320,
    price: 28000,
    image: "https://source.unsplash.com/400x300/?electric,suv",
    batterySize: "50.3 kWh",
    chargeTime: "40 min (80%)",
    available: true,
  },
  {
    id: "ev3",
    make: "Nissan",
    model: "Leaf",
    year: 2024,
    range: 270,
    price: 25000,
    image: "https://source.unsplash.com/400x300/?nissan,leaf",
    batterySize: "40 kWh",
    chargeTime: "45 min (80%)",
    available: true,
  },
  {
    id: "ev4",
    make: "Hyundai",
    model: "Kona Electric",
    year: 2024,
    range: 484,
    price: 38000,
    image: "https://source.unsplash.com/400x300/?hyundai,electric",
    batterySize: "64 kWh",
    chargeTime: "47 min (80%)",
    available: false,
  },
  {
    id: "ev5",
    make: "Chery",
    model: "Omoda E5",
    year: 2024,
    range: 430,
    price: 26000,
    image: "https://source.unsplash.com/400x300/?chinese,electric,car",
    batterySize: "61 kWh",
    chargeTime: "35 min (80%)",
    available: true,
  },
  {
    id: "ev6",
    make: "GWM",
    model: "ORA 03",
    year: 2024,
    range: 310,
    price: 22000,
    image: "https://source.unsplash.com/400x300/?compact,electric",
    batterySize: "48 kWh",
    chargeTime: "40 min (80%)",
    available: true,
  },
];

const CHARGING_STATIONS: ChargingStation[] = [
  {
    id: "cs1",
    name: "MASS EV Hub - Hargeisa",
    location: "Main Street, Hargeisa",
    type: "fast",
    connectors: ["CCS2", "CHAdeMO"],
    available: true,
    distance: "0.5 km",
  },
  {
    id: "cs2",
    name: "Mansoor Hotel Charging",
    location: "Hotel District, Hargeisa",
    type: "standard",
    connectors: ["Type 2"],
    available: true,
    distance: "1.2 km",
  },
  {
    id: "cs3",
    name: "Berbera Port Station",
    location: "Port Area, Berbera",
    type: "fast",
    connectors: ["CCS2", "Type 2"],
    available: false,
    distance: "150 km",
  },
];

/**
 * EV Marketplace
 * 
 * Features: Browse EVs, charging stations, incentives
 * Source: M2 Dev Library - EV24.africa integration
 */
export function EVMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "under30" | "over30">("all");

  const filteredVehicles = EV_VEHICLES.filter(v => {
    const matchesSearch = `${v.make} ${v.model}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "under30" && v.price < 30000) ||
      (priceFilter === "over30" && v.price >= 30000);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-500" />
            EV Marketplace
          </h1>
          <p className="text-muted-foreground">
            Electric vehicles for East Africa • Powered by EV24.africa
          </p>
        </div>
        <Badge className="bg-green-100 text-green-700 gap-1">
          <Leaf className="h-3 w-3" />
          Zero Emissions
        </Badge>
      </div>

      {/* Government Incentives Banner */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8" />
              <div>
                <h3 className="font-bold">EV Incentives Available!</h3>
                <p className="text-sm opacity-90">VAT & Customs duty exemption on electric vehicles</p>
              </div>
            </div>
            <Button variant="secondary" className="text-green-700">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="vehicles" className="w-full">
        <TabsList>
          <TabsTrigger value="vehicles" className="gap-2">
            <Car className="h-4 w-4" />
            Vehicles
          </TabsTrigger>
          <TabsTrigger value="charging" className="gap-2">
            <Battery className="h-4 w-4" />
            Charging
          </TabsTrigger>
        </TabsList>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles" className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search make or model..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={priceFilter === "all" ? "default" : "outline"}
                onClick={() => setPriceFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={priceFilter === "under30" ? "default" : "outline"}
                onClick={() => setPriceFilter("under30")}
              >
                Under $30k
              </Button>
              <Button 
                variant={priceFilter === "over30" ? "default" : "outline"}
                onClick={() => setPriceFilter("over30")}
              >
                $30k+
              </Button>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVehicles.map(vehicle => (
              <Card key={vehicle.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={vehicle.image} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!vehicle.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary">Coming Soon</Badge>
                    </div>
                  )}
                  <Badge className="absolute top-2 left-2 bg-green-500">
                    <Zap className="h-3 w-3 mr-1" />
                    EV
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-sm text-muted-foreground">{vehicle.year}</p>
                    </div>
                    <p className="font-bold text-green-600">${vehicle.price.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Battery className="h-3 w-3" />
                      {vehicle.range} km range
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {vehicle.chargeTime}
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-600" disabled={!vehicle.available}>
                    {vehicle.available ? "Request Quote" : "Notify Me"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* EV24 Link */}
          <Card className="bg-slate-50 dark:bg-slate-900">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-green-500" />
                <div>
                  <h4 className="font-bold">Browse 50+ More Models</h4>
                  <p className="text-sm text-muted-foreground">Visit EV24.africa for the full catalog</p>
                </div>
              </div>
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://ev24.africa" target="_blank" rel="noopener noreferrer">
                  Visit EV24
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Charging Tab */}
        <TabsContent value="charging" className="space-y-4">
          <div className="grid gap-4">
            {CHARGING_STATIONS.map(station => (
              <Card key={station.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        station.type === "fast" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                      }`}>
                        <Zap className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold flex items-center gap-2">
                          {station.name}
                          {station.available ? (
                            <Badge className="bg-green-100 text-green-700">Available</Badge>
                          ) : (
                            <Badge variant="secondary">Busy</Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {station.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {station.type === "fast" ? "Fast Charging" : "Standard"}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{station.distance}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {station.connectors.map(c => (
                      <Badge key={c} variant="outline">{c}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
