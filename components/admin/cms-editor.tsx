"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Save, RefreshCw } from "lucide-react"

export function CMSEditor() {
  const [activePage, setActivePage] = useState("home")
  
  // Dummy data if CMS content isn't seeded yet
  const cmsContent = [
    { section: "hero", title: "Premium Auto Repair Service", subtitle: "Excellence in every wrench turn." },
    { section: "services", title: "Our Specialized Services", subtitle: "From engines to brakes, we do it all." },
  ]

  const handleSave = () => {
    toast.success("CMS Content Updated", {
      description: `Successfully updated the ${activePage} page configurations.`
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Editor Side */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Content Structure</h3>
          <Button variant="outline" size="sm" onClick={handleSave} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
        </div>
        
        {cmsContent.map((item) => (
          <Card key={item.section} className="bg-slate-900 border-white/10 group hover:border-primary/30 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium uppercase text-slate-400 tracking-wider">
                {item.section} section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${item.section}-title`} className="text-xs text-slate-500">Heading Text</Label>
                <Input 
                  id={`${item.section}-title`} 
                  defaultValue={item.title} 
                  className="bg-black/20 border-white/5 focus-visible:ring-primary h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${item.section}-subtitle`} className="text-xs text-slate-500">Subtext / Description</Label>
                <Textarea 
                  id={`${item.section}-subtitle`} 
                  defaultValue={item.subtitle} 
                  className="bg-black/20 border-white/5 focus-visible:ring-primary min-h-[80px] text-sm"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Side */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center justify-between">
          Live Preview
          <RefreshCw className="h-4 w-4 text-slate-500" />
        </h3>
        <div className="aspect-video bg-white rounded-xl overflow-hidden shadow-2xl relative border-4 border-slate-800">
           <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486006396113-c7b3df9747f1?auto=format&fit=crop&q=80')" }}>
             <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-8 text-center">
                <div className="h-1 w-12 bg-primary mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">{cmsContent[0].title}</h2>
                <p className="text-sm text-slate-300 max-w-md">{cmsContent[0].subtitle}</p>
                <Button className="mt-6 bg-primary h-9 text-xs">Book Service</Button>
             </div>
           </div>
           {/* Device Frame Indicator */}
           <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-400/50 rounded-full" />
        </div>
        <p className="text-xs text-slate-500 text-center italic">Responsive desktop preview of your landing page.</p>
      </div>
    </div>
  )
}
