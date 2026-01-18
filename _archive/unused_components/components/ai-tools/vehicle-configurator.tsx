"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Palette,
  RotateCcw,
  Download,
  Share2,
  Box,
  Layers,
  Sparkles,
  Car,
  Sun,
  Moon,
  CloudRain,
  Aperture
} from "lucide-react";

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  type: "solid" | "metallic" | "matte" | "pearlescent";
  price?: number;
}

interface WheelOption {
  id: string;
  name: string;
  style: "Spoke" | "Mesh" | "Aero" | "Off-road";
  size: "18" | "19" | "20" | "21";
  finish: "Silver" | "Black" | "Chrome" | "Bronze";
}

interface WrapOption {
  id: string;
  brand: "3M" | "Avery Dennison" | "Inozetek";
  name: string;
  finish: "Gloss" | "Satin" | "Matte" | "Color Flip";
  hex: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  { id: "pearl-white", name: "Alpine White", hex: "#F5F5F5", type: "pearlescent" },
  { id: "midnight-black", name: "Obsidian Black", hex: "#1A1A1A", type: "metallic" },
  { id: "guards-red", name: "Guards Red", hex: "#CC0000", type: "solid" },
  { id: "miami-blue", name: "Miami Blue", hex: "#00B2E1", type: "solid" },
  { id: "british-green", name: "Racing Green", hex: "#004225", type: "metallic" },
  { id: "nardogrey", name: "Nardo Grey", hex: "#6C7A89", type: "solid" },
  { id: "viola-metal", name: "Viola Metallic", hex: "#4B0082", type: "metallic" },
  { id: "solar-orange", name: "Solar Orange", hex: "#FF5900", type: "metallic" },
];

const WHEEL_OPTIONS: WheelOption[] = [
  { id: "stock-18", name: "Factory Standard", style: "Spoke", size: "18", finish: "Silver" },
  { id: "bbs-lm", name: "LM Forged", style: "Mesh", size: "19", finish: "Silver" },
  { id: "rotiform-blk", name: "Aero Disk", style: "Aero", size: "19", finish: "Black" },
  { id: "rays-te37", name: "Track Spec", style: "Spoke", size: "18", finish: "Bronze" },
  { id: "vossen-hf", name: "HF-5 Hybrid", style: "Spoke", size: "20", finish: "Black" },
  { id: "hre-p101", name: "P101 Monoblock", style: "Spoke", size: "21", finish: "Chrome" },
];

const WRAP_OPTIONS: WrapOption[] = [
  { id: "3m-2080-m12", brand: "3M", name: "Matte Black", finish: "Matte", hex: "#1a1a1a" },
  { id: "avery-swf", brand: "Avery Dennison", name: "Satin Hope Green", finish: "Satin", hex: "#2E5946" },
  { id: "ino-mid", brand: "Inozetek", name: "Midnight Purple", finish: "Gloss", hex: "#380036" },
  { id: "3m-psy", brand: "3M", name: "Psychedelic Flip", finish: "Color Flip", hex: "#8A2BE2" },
];

/**
 * 3D Vehicle Configurator Ultimate
 * Features: High-fidelity simulation options suitable for Enterprise clients
 */
export function VehicleConfigurator() {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedWheel, setSelectedWheel] = useState(WHEEL_OPTIONS[0]);
  const [selectedWrap, setSelectedWrap] = useState<WrapOption | null>(null);
  const [windowTint, setWindowTint] = useState([35]);
  const [environment, setEnvironment] = useState<"studio" | "sunset" | "night">("studio");
  const [viewAngle, setViewAngle] = useState(45);

  const activeFinish = selectedWrap ? selectedWrap.hex : selectedColor.hex;

  // Simulated High-Fidelity Preview
  const VehiclePreview = () => (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden group">
      {/* Dynamic Background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          environment === "studio" ? "bg-gradient-to-b from-slate-200 to-slate-400 opacity-100" :
          environment === "sunset" ? "bg-gradient-to-br from-orange-100 to-purple-200 opacity-100" :
          "bg-slate-900 opacity-100"
        }`} 
      />
      
      {/* 3D Car Placeholder Simulation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="relative w-[60%] aspect-[2/1] transition-all duration-700 ease-out"
          style={{ 
            transform: `rotateY(${viewAngle}deg) scale(1.1)`,
            filter: `drop-shadow(0 40px 30px rgba(0,0,0,0.4))`
          }}
        >
          {/* Car Body Base */}
          <div 
            className="absolute inset-x-0 bottom-0 top-[30%] rounded-3xl transition-colors duration-500"
            style={{ 
              backgroundColor: activeFinish,
              boxShadow: environment === 'night' ? 'inset 0 0 50px rgba(0,0,0,0.8)' : 'inset 0 10px 20px rgba(255,255,255,0.3)'
            }}
          >
             {/* Dynamic Reflections */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
          </div>

          {/* Roof / Greenhouse */}
          <div className="absolute inset-x-[15%] top-0 bottom-[60%] bg-slate-800 rounded-t-full border-4 border-slate-700 overflow-hidden">
             {/* Window Tint Layer */}
             <div className="absolute inset-0 bg-black transition-opacity" style={{ opacity: windowTint[0] / 100 }} />
          </div>

          {/* Wheels */}
          <div className="absolute bottom-[-10%] left-[10%] w-[18%] aspect-square bg-slate-800 rounded-full border-[6px] border-slate-900 flex items-center justify-center shadow-2xl">
              <div className="w-[80%] h-[80%] rounded-full border-2 border-slate-500 flex items-center justify-center">
                 <span className="text-[10px] text-white font-bold">{selectedWheel.size}"</span>
              </div>
          </div>
          <div className="absolute bottom-[-10%] right-[10%] w-[18%] aspect-square bg-slate-800 rounded-full border-[6px] border-slate-900 flex items-center justify-center shadow-2xl">
              <div className="w-[80%] h-[80%] rounded-full border-2 border-slate-500 flex items-center justify-center">
                 <span className="text-[10px] text-white font-bold">{selectedWheel.size}"</span>
              </div>
          </div>
        </div>
      </div>
      
      {/* Environment Controls Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white/90 backdrop-blur rounded-lg p-2 shadow-lg z-10">
        <Button size="icon" variant={environment === 'studio' ? 'default' : 'ghost'} onClick={() => setEnvironment('studio')} className="h-8 w-8">
           <Sun className="h-4 w-4" />
        </Button>
        <Button size="icon" variant={environment === 'sunset' ? 'default' : 'ghost'} onClick={() => setEnvironment('sunset')} className="h-8 w-8">
           <CloudRain className="h-4 w-4" />
        </Button>
        <Button size="icon" variant={environment === 'night' ? 'default' : 'ghost'} onClick={() => setEnvironment('night')} className="h-8 w-8">
           <Moon className="h-4 w-4" />
        </Button>
      </div>

      {/* Info Badge */}
      <div className="absolute top-4 left-4">
        <Badge variant="outline" className="bg-white/90 backdrop-blur text-slate-900 border-0 shadow-lg gap-2 pl-2 pr-4 py-1.5 text-sm font-semibold">
           <span className="h-3 w-3 rounded-full" style={{ background: activeFinish }} />
           {selectedWrap ? `${selectedWrap.brand} ${selectedWrap.name}` : selectedColor.name}
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Box className="h-6 w-6 text-orange-500" />
            3D Configurator Ultimate
          </h1>
          <p className="text-muted-foreground">
            Enterprise-grade vehicle visualization provided by MASS.ai
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Config
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20">
            <Download className="h-4 w-4 mr-2" />
            Export 4K Render
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Main Preview */}
        <div className="lg:col-span-8 flex flex-col">
          <Card className="flex-1 overflow-hidden border-0 shadow-2xl bg-slate-900 rounded-xl relative">
             <VehiclePreview />
             
             {/* Bottom Controls (Rotation) */}
             <div className="absolute bottom-6 inset-x-0 flex justify-center gap-4 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md rounded-full p-2 flex gap-4 pointer-events-auto border border-white/20">
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full" onClick={() => setViewAngle(v => v - 45)}>
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full" onClick={() => setViewAngle(v => v + 45)}>
                    <RotateCcw className="h-5 w-5 scale-x-[-1]" />
                  </Button>
                </div>
             </div>
          </Card>
        </div>

        {/* Customization Panel */}
        <div className="lg:col-span-4 flex flex-col h-full"> 
          <Card className="flex-1 flex flex-col border-0 shadow-xl overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="h-5 w-5 text-blue-600" />
                Customization Studio
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              <Tabs defaultValue="paint" className="w-full">
                <div className="p-4 border-b sticky top-0 bg-white z-10">
                   <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="paint">Paint</TabsTrigger>
                    <TabsTrigger value="wheels">Wheels</TabsTrigger>
                    <TabsTrigger value="finish">Finishing</TabsTrigger>
                  </TabsList>
                </div>
                
                {/* PAINT */}
                <TabsContent value="paint" className="p-4 space-y-6 m-0">
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Manufacturer Paints</h4>
                    <div className="grid grid-cols-4 gap-3">
                      {COLOR_OPTIONS.map(color => (
                        <button
                          key={color.id}
                          onClick={() => { setSelectedColor(color); setSelectedWrap(null); }}
                          className={`aspect-square rounded-full border-4 transition-all shadow-sm ${
                            !selectedWrap && selectedColor.id === color.id 
                              ? "border-blue-600 scale-110 shadow-lg" 
                              : "border-slate-100 hover:border-slate-200"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Premium Wraps</h4>
                    <div className="grid grid-cols-2 gap-3">
                       {WRAP_OPTIONS.map(wrap => (
                         <div 
                           key={wrap.id}
                           onClick={() => setSelectedWrap(wrap)}
                           className={`
                             flex items-center gap-3 p-2 rounded-lg border-2 cursor-pointer transition-all
                             ${selectedWrap?.id === wrap.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}
                           `}
                         >
                            <div className="h-10 w-10 rounded-md shadow-sm border" style={{ background: wrap.hex }} />
                            <div className="flex-1 text-left">
                               <div className="text-xs font-bold text-slate-900">{wrap.brand}</div>
                               <div className="text-[10px] text-slate-500">{wrap.name}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* WHEELS */}
                <TabsContent value="wheels" className="p-4 space-y-4 m-0">
                   <div className="grid grid-cols-2 gap-3">
                      {WHEEL_OPTIONS.map(wheel => (
                        <div 
                          key={wheel.id}
                          onClick={() => setSelectedWheel(wheel)}
                          className={`
                            p-3 rounded-xl border-2 text-left cursor-pointer transition-all
                            ${selectedWheel.id === wheel.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}
                          `}
                        >
                           <div className="aspect-square bg-slate-100 rounded-full mb-3 flex items-center justify-center">
                              {/* Wheel Icon Placeholder */}
                              <Aperture className="h-8 w-8 text-slate-400" />
                           </div>
                           <div className="font-bold text-sm text-slate-900">{wheel.name}</div>
                           <div className="flex justify-between text-xs text-slate-500 mt-1">
                              <span>{wheel.size}" {wheel.finish}</span>
                              <span className="font-mono">{wheel.style}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </TabsContent>
                
                {/* FINISH */}
                <TabsContent value="finish" className="p-4 space-y-8 m-0">
                   <div className="space-y-4">
                      <div className="flex justify-between">
                         <label className="font-medium text-sm">Window Tint</label>
                         <span className="text-sm text-slate-500">{windowTint}% VLT</span>
                      </div>
                      <Slider 
                        value={windowTint} 
                        onValueChange={setWindowTint} 
                        max={100} 
                        min={5} 
                        step={5} 
                        className="py-4"
                      />
                      <p className="text-xs text-slate-400">Lower VLT % means darker tint.</p>
                   </div>
                   
                   <div className="p-4 bg-slate-50 rounded-lg border">
                      <h4 className="font-bold text-sm mb-2">Estimate Summary</h4>
                      <div className="space-y-2 text-sm">
                         <div className="flex justify-between">
                            <span className="text-slate-500">Paint/Wrap</span>
                            <span className="font-medium">{selectedWrap ? '$2,400' : 'Included'}</span>
                         </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500">Wheels ({selectedWheel.finish})</span>
                            <span className="font-medium">${selectedWheel.id.includes('stock') ? '0' : '1,800'}</span>
                         </div>
                         <div className="flex justify-between border-t pt-2 mt-2">
                            <span className="font-bold">Total Est.</span>
                            <span className="font-bold text-blue-600">
                               ${(selectedWrap ? 2400 : 0) + (selectedWheel.id.includes('stock') ? 0 : 1800)}
                            </span>
                         </div>
                      </div>
                   </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <div className="p-4 border-t bg-white sticky bottom-0"> 
               <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base shadow-lg">
                  <Car className="h-5 w-5 mr-2" />
                  Order Configuration
               </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
