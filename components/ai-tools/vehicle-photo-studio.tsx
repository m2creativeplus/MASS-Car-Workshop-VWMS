"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  RefreshCw
} from "lucide-react";

interface ProcessedImage {
  id: string;
  original: string;
  processed?: string;
  status: "pending" | "processing" | "done" | "error";
}

const BACKGROUND_TEMPLATES = [
  { id: "white", name: "Studio White", color: "#FFFFFF" },
  { id: "showroom", name: "Showroom", color: "#1A1A1A" },
  { id: "outdoor", name: "Outdoor Green", color: "#2D5016" },
  { id: "gradient", name: "Premium Gradient", color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
];

/**
 * Vehicle Photo Studio
 * Features: Background removal, AI enhancement, batch processing
 * 
 * Uses: rembg (open-source), Real-ESRGAN (upscaling)
 * Source: M2 Dev Library spyne-clone-blueprint.json
 */
export function VehiclePhotoStudio() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selectedBackground, setSelectedBackground] = useState("white");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ProcessedImage[] = Array.from(files).map((file, i) => ({
      id: `img-${Date.now()}-${i}`,
      original: URL.createObjectURL(file),
      status: "pending" as const,
    }));

    setImages(prev => [...prev, ...newImages]);
  }, []);

  const processImages = async () => {
    setIsProcessing(true);
    
    // Simulate processing (replace with actual rembg API call)
    for (const img of images) {
      if (img.status === "pending") {
        setImages(prev => prev.map(i => 
          i.id === img.id ? { ...i, status: "processing" } : i
        ));
        
        // Simulate API delay
        await new Promise(r => setTimeout(r, 1500));
        
        setImages(prev => prev.map(i => 
          i.id === img.id ? { ...i, status: "done", processed: i.original } : i
        ));
      }
    }
    
    setIsProcessing(false);
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(i => i.id !== id));
  };

  const downloadAll = () => {
    images.forEach(img => {
      if (img.processed) {
        const link = document.createElement('a');
        link.href = img.processed;
        link.download = `vehicle-${img.id}.png`;
        link.click();
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-orange-500" />
            Vehicle Photo Studio
          </h1>
          <p className="text-muted-foreground">
            AI-powered background removal and enhancement
          </p>
        </div>
        <Badge className="bg-green-100 text-green-700">Free • Open Source</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Photos
            </CardTitle>
            <CardDescription>
              Drag and drop or click to upload vehicle photos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-orange-500 transition-colors cursor-pointer">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="font-medium">Drop images here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports JPG, PNG, WEBP up to 10MB
                </p>
              </label>
            </div>

            {/* Image Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {images.map(img => (
                  <div key={img.id} className="relative group">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={img.processed || img.original} 
                        alt="Vehicle"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <Button size="icon" variant="ghost" className="text-white">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-white"
                        onClick={() => removeImage(img.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        img.status === "done" ? "bg-green-500" :
                        img.status === "processing" ? "bg-blue-500" :
                        img.status === "error" ? "bg-red-500" : "bg-gray-500"
                      }`}
                    >
                      {img.status === "processing" && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                      {img.status === "done" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {img.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Processing Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Background Selection */}
            <div className="space-y-3">
              <Label>Background</Label>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUND_TEMPLATES.map(bg => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBackground(bg.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedBackground === bg.id 
                        ? "border-orange-500" 
                        : "border-muted hover:border-orange-300"
                    }`}
                  >
                    <div 
                      className="w-full h-8 rounded mb-2"
                      style={{ background: bg.color }}
                    />
                    <span className="text-xs font-medium">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhancements */}
            <div className="space-y-3">
              <Label>AI Enhancements</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Remove background (rembg)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Auto color correction
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  4x AI Upscale (Real-ESRGAN)
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4">
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={processImages}
                disabled={isProcessing || images.length === 0}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Process All Photos
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={downloadAll}
                disabled={images.filter(i => i.status === "done").length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
