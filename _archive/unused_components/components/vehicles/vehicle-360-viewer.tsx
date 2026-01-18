"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Play, 
  Pause,
  ChevronLeft,
  ChevronRight,
  Camera,
  Smartphone
} from "lucide-react";

interface Vehicle360ViewerProps {
  images: string[];
  autoRotate?: boolean;
  initialFrame?: number;
}

/**
 * 360° Vehicle Viewer
 * Interactive spin viewer for vehicle photography
 * 
 * Source: M2 Dev Library - Pannellum, Photo Sphere Viewer
 */
export function Vehicle360Viewer({ 
  images, 
  autoRotate = false,
  initialFrame = 0 
}: Vehicle360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(initialFrame);
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalFrames = images.length || 36;

  // Auto-rotate effect
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % totalFrames);
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, totalFrames, images.length]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 10) {
      const direction = diff > 0 ? 1 : -1;
      setCurrentFrame(prev => (prev + direction + totalFrames) % totalFrames);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 10) {
      const direction = diff > 0 ? 1 : -1;
      setCurrentFrame(prev => (prev + direction + totalFrames) % totalFrames);
      setStartX(e.touches[0].clientX);
    }
  };

  const currentImage = images[currentFrame] || 
    `https://source.unsplash.com/800x500/?car,${currentFrame}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5 text-orange-500" />
              360° Vehicle View
            </CardTitle>
            <CardDescription>
              Drag to rotate or use controls
            </CardDescription>
          </div>
          <Badge variant="outline" className="gap-1">
            <Camera className="h-3 w-3" />
            {totalFrames} frames
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Viewer Area */}
        <div 
          ref={containerRef}
          className="relative aspect-[16/9] bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 cursor-grab active:cursor-grabbing select-none overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <img
            src={currentImage}
            alt={`Vehicle view ${currentFrame + 1}`}
            className="w-full h-full object-contain transition-transform duration-100"
            style={{ transform: `scale(${zoom})` }}
            draggable={false}
          />
          
          {/* Drag hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
            <Smartphone className="h-3 w-3" />
            Drag to rotate
          </div>
          
          {/* Navigation arrows */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
            onClick={() => setCurrentFrame(prev => (prev - 1 + totalFrames) % totalFrames)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
            onClick={() => setCurrentFrame(prev => (prev + 1) % totalFrames)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Controls */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <Button
              size="icon"
              variant="outline"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            {/* Frame slider */}
            <div className="flex-1">
              <Slider
                value={[currentFrame]}
                max={totalFrames - 1}
                step={1}
                onValueChange={([value]) => {
                  setCurrentFrame(value);
                  setIsPlaying(false);
                }}
              />
            </div>
            
            {/* Zoom */}
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs w-12 text-center">{Math.round(zoom * 100)}%</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setZoom(z => Math.min(3, z + 0.25))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Fullscreen */}
            <Button
              size="icon"
              variant="outline"
              onClick={() => containerRef.current?.requestFullscreen()}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Frame indicator */}
          <div className="flex justify-center gap-1 mt-4">
            {Array.from({ length: Math.min(totalFrames, 12) }).map((_, i) => {
              const frameIndex = Math.floor(i * totalFrames / 12);
              return (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentFrame >= frameIndex && currentFrame < frameIndex + Math.ceil(totalFrames / 12)
                      ? "bg-orange-500"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentFrame(frameIndex)}
                />
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Demo component with placeholder images
export function Vehicle360ViewerDemo() {
  // Generate placeholder images for demo
  const demoImages = Array.from({ length: 24 }, (_, i) => 
    `https://source.unsplash.com/800x500/?toyota,car,${i}`
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Vehicle360Viewer images={demoImages} autoRotate />
    </div>
  );
}
