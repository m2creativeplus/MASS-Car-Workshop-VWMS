"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Image as ImageIcon,
  Upload,
  Search,
  Grid3X3,
  List,
  Folder,
  File,
  Trash2,
  Download,
  Copy,
  MoreHorizontal,
  Plus,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample Media Files
const MEDIA_FILES = [
  { id: 1, name: "hero-banner.jpg", type: "image", size: "2.4 MB", url: "/uploads/hero-banner.jpg", uploadedAt: "2026-01-07" },
  { id: 2, name: "logo-dark.png", type: "image", size: "124 KB", url: "/uploads/logo-dark.png", uploadedAt: "2026-01-05" },
  { id: 3, name: "logo-light.png", type: "image", size: "118 KB", url: "/uploads/logo-light.png", uploadedAt: "2026-01-05" },
  { id: 4, name: "service-promo.mp4", type: "video", size: "15.2 MB", url: "/uploads/service-promo.mp4", uploadedAt: "2026-01-03" },
  { id: 5, name: "terms-of-service.pdf", type: "document", size: "456 KB", url: "/uploads/terms.pdf", uploadedAt: "2026-01-01" },
  { id: 6, name: "brake-inspection.jpg", type: "image", size: "1.8 MB", url: "/uploads/brake.jpg", uploadedAt: "2025-12-28" },
  { id: 7, name: "oil-change-guide.pdf", type: "document", size: "2.1 MB", url: "/uploads/oil-guide.pdf", uploadedAt: "2025-12-25" },
  { id: 8, name: "workshop-tour.mp4", type: "video", size: "45.6 MB", url: "/uploads/tour.mp4", uploadedAt: "2025-12-20" },
]

const FOLDERS = [
  { id: 1, name: "Images", count: 12 },
  { id: 2, name: "Documents", count: 5 },
  { id: 3, name: "Videos", count: 3 },
  { id: 4, name: "Inspection Photos", count: 156 },
]

export function MediaLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFiles = MEDIA_FILES.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFileSelection = (id: number) => {
    setSelectedFiles(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-500" />
              Media Library
            </CardTitle>
            <CardDescription>
              Manage images, videos, and documents
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Folder className="w-4 h-4" /> New Folder
            </Button>
            <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
              <Upload className="w-4 h-4" /> Upload
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Search files..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            <div className="flex border rounded-lg overflow-hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className={cn(
                  "rounded-none",
                  viewMode === "grid" && "bg-slate-100 dark:bg-slate-800"
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className={cn(
                  "rounded-none",
                  viewMode === "list" && "bg-slate-100 dark:bg-slate-800"
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Folders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FOLDERS.map((folder) => (
            <button
              key={folder.id}
              className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-colors text-left"
            >
              <Folder className="w-8 h-8 text-amber-500" />
              <div>
                <p className="font-medium">{folder.name}</p>
                <p className="text-xs text-slate-500">{folder.count} files</p>
              </div>
            </button>
          ))}
        </div>

        {/* Files Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => toggleFileSelection(file.id)}
                className={cn(
                  "group relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all",
                  selectedFiles.includes(file.id)
                    ? "border-orange-500 ring-2 ring-orange-500/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                )}
              >
                {/* Thumbnail */}
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {file.type === "image" ? (
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                  ) : file.type === "video" ? (
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-8 border-l-slate-400 border-y-4 border-y-transparent ml-1" />
                    </div>
                  ) : (
                    <File className="w-12 h-12 text-slate-300" />
                  )}
                </div>
                {/* Info */}
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{file.name}</p>
                  <p className="text-xs text-slate-500">{file.size}</p>
                </div>
                {/* Hover Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => toggleFileSelection(file.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
                  selectedFiles.includes(file.id)
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {file.type === "image" ? (
                      <ImageIcon className="w-5 h-5 text-slate-400" />
                    ) : file.type === "video" ? (
                      <div className="w-4 h-4 bg-red-500 rounded" />
                    ) : (
                      <File className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-slate-500">{file.size} • {file.uploadedAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs capitalize">{file.type}</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selection Actions Bar */}
        {selectedFiles.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4">
            <span className="text-sm">{selectedFiles.length} selected</span>
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
