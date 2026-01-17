"use client";

import { useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Palette,
  RotateCcw,
  Download,
  Share2,
  Eye,
  Box,
  Layers,
  Sparkles,
  Car
} from "lucide-react";

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  type: "solid" | "metallic" | "matte";
}

interface WheelOption {
  id: string;
  name: string;
  image: string;
  size: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { id: "pearl-white", name: "Pearl White", hex: "#F5F5F5", type: "metallic" },
  { id: "midnight-black", name: "Midnight Black", hex: "#1A1A1A", type: "metallic" },
  { id: "tokyo-red", name: "Tokyo Red", hex: "#C41E3A", type: "solid" },
  { id: "ocean-blue", name: "Ocean Blue", hex: "#1E4B8E", type: "metallic" },
  { id: "forest-green", name: "Forest Green", hex: "#228B22", type: "matte" },
  { id: "desert-sand", name: "Desert Sand", hex: "#C2B280", type: "solid" },
  { id: "royal-purple", name: "Royal Purple", hex: "#6B3FA0", type: "metallic" },
  { id: "racing-orange", name: "Racing Orange", hex: "#FF4D24", type: "solid" },
];

const WHEEL_OPTIONS: WheelOption[] = [
  { id: "stock", name: "Stock Alloy", image: "/wheels/stock.png", size: "17\"" },
  { id: "sport", name: "Sport Alloy", image: "/wheels/sport.png", size: "18\"" },
  { id: "premium", name: "Premium Chrome", image: "/wheels/premium.png", size: "19\"" },
  { id: "offroad", name: "Off-Road Steel", image: "/wheels/offroad.png", size: "16\"" },
];

const WRAP_OPTIONS = [
  { id: "carbon", name: "Carbon Fiber", pattern: "repeating lines" },
  { id: "camo", name: "Desert Camo", pattern: "camouflage" },
  { id: "chrome", name: "Chrome Wrap", pattern: "reflective" },
  { id: "matte-black", name: "Matte Black", pattern: "solid" },
];

/**
 * 3D Vehicle Configurator
 * 
 * Features: Color picker, wheel options, wrap preview
 * Source: M2 Dev Library - React Three Fiber, Three.js
 */
export function VehicleConfigurator() {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedWheel, setSelectedWheel] = useState(WHEEL_OPTIONS[0]);
  const [selectedWrap, setSelectedWrap] = useState<string | null>(null);
  const [viewAngle, setViewAngle] = useState(0);

  // Simplified 3D view (placeholder for React Three Fiber)
  const VehiclePreview = () => (
    <div 
      className="relative aspect-[16/10] rounded-xl overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${selectedColor.hex}22 0%, #1a1a1a 100%)` 
      }}
    >
      {/* Placeholder vehicle silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-3/4 h-1/2 rounded-3xl shadow-2xl transition-all duration-500"
          style={{ 
            backgroundColor: selectedColor.hex,
            transform: `rotateY(${viewAngle}deg) perspective(1000px)`,
            boxShadow: `0 20px 60px ${selectedColor.hex}40`
          }}
        >
          <div className="absolute inset-x-8 top-4 h-1/3 bg-black/30 rounded-t-xl" />
          {/* Windows */}
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-black rounded-full border-4 border-gray-400" />
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-black rounded-full border-4 border-gray-400" />
        </div>
      </div>
      
      {/* Color badge */}
      <Badge 
        className="absolute top-4 left-4"
        style={{ backgroundColor: selectedColor.hex, color: selectedColor.hex === "#F5F5F5" ? "#000" : "#FFF" }}
      >
        {selectedColor.name}
      </Badge>
      
      {/* 3D badge */}
      <Badge className="absolute top-4 right-4 bg-orange-500">
        <Sparkles className="h-3 w-3 mr-1" />
        3D Preview
      </Badge>
      
      {/* Rotate controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => setViewAngle(v => v - 45)}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => setViewAngle(v => v + 45)}
        >
          <RotateCcw className="h-4 w-4 scale-x-[-1]" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Box className="h-6 w-6 text-orange-500" />
            Vehicle Configurator
          </h1>
          <p className="text-muted-foreground">
            Customize colors, wheels, and wraps in 3D
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Download className="h-4 w-4 mr-2" />
            Save Config
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Preview */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <VehiclePreview />
            
            {/* Quick view angles */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 90, 180, 270].map(angle => (
                <Button
                  key={angle}
                  size="sm"
                  variant={viewAngle === angle ? "default" : "outline"}
                  onClick={() => setViewAngle(angle)}
                >
                  {angle === 0 ? "Front" : angle === 90 ? "Side" : angle === 180 ? "Rear" : "Side 2"}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Customize
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="color" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="color">Color</TabsTrigger>
                <TabsTrigger value="wheels">Wheels</TabsTrigger>
                <TabsTrigger value="wrap">Wrap</TabsTrigger>
              </TabsList>
              
              {/* Colors */}
              <TabsContent value="color" className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_OPTIONS.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`aspect-square rounded-lg border-2 transition-all ${
                        selectedColor.id === color.id 
                          ? "border-orange-500 scale-110" 
                          : "border-transparent hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  {selectedColor.name} • {selectedColor.type}
                </div>
              </TabsContent>
              
              {/* Wheels */}
              <TabsContent value="wheels" className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {WHEEL_OPTIONS.map(wheel => (
                    <button
                      key={wheel.id}
                      onClick={() => setSelectedWheel(wheel)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedWheel.id === wheel.id 
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full mb-2" />
                      <div className="text-xs font-medium">{wheel.name}</div>
                      <div className="text-xs text-muted-foreground">{wheel.size}</div>
                    </button>
                  ))}
                </div>
              </TabsContent>
              
              {/* Wraps */}
              <TabsContent value="wrap" className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {WRAP_OPTIONS.map(wrap => (
                    <button
                      key={wrap.id}
                      onClick={() => setSelectedWrap(wrap.id === selectedWrap ? null : wrap.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedWrap === wrap.id 
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Layers className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <div className="text-xs font-medium">{wrap.name}</div>
                    </button>
                  ))}
                </div>
                {selectedWrap && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedWrap(null)}
                  >
                    Remove Wrap
                  </Button>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Summary */}
      <Card className="bg-slate-50 dark:bg-slate-900">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="text-sm">{selectedColor.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Wheels: {selectedWheel.name} ({selectedWheel.size})
              </div>
              {selectedWrap && (
                <div className="text-sm text-muted-foreground">
                  Wrap: {WRAP_OPTIONS.find(w => w.id === selectedWrap)?.name}
                </div>
              )}
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Car className="h-4 w-4 mr-2" />
              Request Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
