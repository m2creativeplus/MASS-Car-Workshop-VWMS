"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Image as ImageIcon, 
  Wand2, 
  Download, 
  Trash2,
  CheckCircle2,
  Loader2,
  Sparkles,
  Layers,
  MonitorPlay,
  Share2,
  Maximize2
} from "lucide-react";

interface SmartScene {
  id: string;
  name: string;
  category: "Studio" | "Showroom" | "Outdoor" | "Creative";
  thumbnail: string;
  description: string;
}

interface ProcessedImage {
  id: string;
  original: string;
  processed?: string;
  status: "pending" | "processing" | "done" | "error";
  sceneId: string;
  progress: number;
}

const SMART_SCENES: SmartScene[] = [
  { 
    id: "studio-white", 
    name: "Pure Studio", 
    category: "Studio",
    thumbnail: "bg-white",
    description: "Clean white infinity cove for marketplace listings" 
  },
  { 
    id: "studio-grey", 
    name: "Nardo Grey", 
    category: "Studio", 
    thumbnail: "bg-slate-200",
    description: "Modern grey studio with soft overhead lighting"
  },
  { 
    id: "showroom-lux", 
    name: "Luxury Showroom", 
    category: "Showroom", 
    thumbnail: "bg-slate-900 border-b-4 border-slate-800",
    description: "High-end dark showroom with spotlights" 
  },
  { 
    id: "scenic-alp", 
    name: "Alpine Road", 
    category: "Outdoor", 
    thumbnail: "bg-green-100",
    description: "Mountain road with natural daylight"
  },
];

export function VehiclePhotoStudio() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [activeScene, setActiveScene] = useState<string>("studio-white");
  const [isQueueRunning, setIsQueueRunning] = useState(false);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ProcessedImage[] = Array.from(files).map((file, i) => ({
      id: `task-${Date.now()}-${i}`,
      original: URL.createObjectURL(file),
      status: "pending",
      sceneId: activeScene,
      progress: 0
    }));

    setImages(prev => [...prev, ...newImages]);
  }, [activeScene]);

  const runQueue = async () => {
    setIsQueueRunning(true);
    
    // Process images sequentially
    for (let i = 0; i < images.length; i++) {
      if (images[i].status === "pending") {
        await processSingleImage(images[i].id);
      }
    }
    
    setIsQueueRunning(false);
  };

  const processSingleImage = async (id: string) => {
    // 1. Start Processing
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, status: "processing", progress: 10 } : img
    ));

    // Simulate AI steps with realistic delays
    const steps = [
      { progress: 30, delay: 800 }, // Segment Car
      { progress: 60, delay: 1000 }, // Generate Shadow
      { progress: 90, delay: 800 }, // Composite Scene
      { progress: 100, delay: 500 } // Finalize
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.delay));
      setImages(prev => prev.map(img => 
        img.id === id ? { ...img, progress: step.progress } : img
      ));
    }

    // Complete
    setImages(prev => prev.map(img => 
      img.id === id ? { 
        ...img, 
        status: "done", 
        // In a real app, this would be the URL returned by the API
        // For demo, we just use the original but would overlay the scene
        processed: img.original 
      } : img
    ));
  };

  const clearQueue = () => {
    setImages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6">
      {/* Top Bar: Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-4">
           <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
             <Wand2 className="h-6 w-6" />
           </div>
           <div>
             <h2 className="font-bold text-lg">Virtual Studio Pro</h2>
             <p className="text-xs text-muted-foreground">AI Scene Generation & Shadow Synthesis</p>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md text-sm">
             <Layers className="h-4 w-4 text-slate-500" />
             <span className="font-medium">{images.length} Assets</span>
           </div>
           <Button 
             onClick={runQueue} 
             disabled={isQueueRunning || images.length === 0}
             className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
           >
             {isQueueRunning ? (
               <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing Queue...</>
             ) : (
               <><MonitorPlay className="h-4 w-4 mr-2" /> Start Batch Process</>
             )}
           </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Left: Queue & Preview */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
          {/* Main Preview Area */}
          <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-700 shadow-2xl flex items-center justify-center group">
             {images.length === 0 ? (
               <div className="text-center p-12">
                  <div className="h-24 w-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="h-10 w-10 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Drop Vehicle Photos Here</h3>
                  <p className="text-slate-400 max-w-sm mx-auto mb-8">
                    Upload high-res images. Our AI will automatically remove backgrounds and place them in your selected studio scene.
                  </p>
                  <label className="cursor-pointer">
                    <Input type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} />
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 font-semibold" asChild>
                      <span>Select Files</span>
                    </Button>
                  </label>
               </div>
             ) : (
               <div className="relative w-full h-full p-4 overflow-y-auto">
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {images.map((img) => (
                     <div key={img.id} className="relative group/card bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                        <div className="aspect-[4/3] relative">
                          <img src={img.processed || img.original} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all flex items-end p-3">
                             <div className="flex gap-2 w-full">
                               <Button size="sm" variant="secondary" className="h-8 flex-1 text-xs">Preview</Button>
                               <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => setImages(prev => prev.filter(i => i.id !== img.id))}>
                                 <Trash2 className="h-3 w-3" />
                               </Button>
                             </div>
                          </div>
                        </div>
                        
                        {/* Status Bar */}
                        <div className="p-3 bg-slate-800 border-t border-slate-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-slate-300 truncate max-w-[100px]">{img.id}</span>
                            <Badge variant={img.status === 'done' ? 'default' : 'secondary'} className="text-[10px] h-5">
                              {img.status}
                            </Badge>
                          </div>
                          {img.status === 'processing' && (
                            <div className="space-y-1">
                               <Progress value={img.progress} className="h-1" />
                               <span className="text-[10px] text-slate-500 text-right block">{img.progress}%</span>
                            </div>
                          )}
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Right: Scene Selector */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
           <Card className="h-full flex flex-col border-0 shadow-lg">
             <CardHeader className="pb-4">
               <CardTitle className="text-lg">Scene Selection</CardTitle>
               <CardDescription>Choose the environment for your vehicle</CardDescription>
             </CardHeader>
             <CardContent className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-6">
                  {['Studio', 'Showroom', 'Outdoor'].map((cat) => (
                    <div key={cat}>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{cat} Scenes</h4>
                      <div className="grid gap-3">
                        {SMART_SCENES.filter(s => s.category === cat).map((scene) => (
                          <div 
                            key={scene.id}
                            onClick={() => setActiveScene(scene.id)}
                            className={`
                              group cursor-pointer rounded-xl border-2 p-1 transition-all
                              ${activeScene === scene.id ? 'border-blue-600 bg-blue-50' : 'border-transparent hover:border-slate-200 hover:bg-slate-50'}
                            `}
                          >
                            <div className="flex gap-3">
                              <div className={`h-16 w-24 rounded-lg shadow-sm border ${scene.thumbnail} flex-shrink-0`} />
                              <div className="py-1">
                                <h5 className={`font-semibold text-sm ${activeScene === scene.id ? 'text-blue-700' : 'text-slate-700'}`}>
                                  {scene.name}
                                </h5>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                  {scene.description}
                                </p>
                              </div>
                              {activeScene === scene.id && (
                                <div className="ml-auto flex items-center pr-2">
                                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
             </CardContent>
             
             <div className="p-4 border-t bg-slate-50">
               <Button variant="outline" className="w-full" onClick={clearQueue}>
                 <Trash2 className="h-4 w-4 mr-2" />
                 Clear Queue
               </Button>
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

