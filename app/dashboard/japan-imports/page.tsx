"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JapanVehicleImport } from "@/components/vehicles/japan-vehicle-import"
import { BeforwardPartsFinder } from "@/components/parts/beforward-parts-finder"
import { Ship, ShoppingCart, Globe } from "lucide-react"

export default function JapanImportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-blue-900 flex items-center gap-2">
            <Globe className="h-8 w-8 text-blue-600" />
            Japan Imports Portal
          </h2>
          <p className="text-muted-foreground">
            Direct access to BE FORWARD Japan's inventory of vehicles and parts.
          </p>
        </div>
      </div>

      <Tabs defaultValue="vehicles" className="space-y-4">
        <TabsList className="bg-muted/50 border">
          <TabsTrigger value="vehicles" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 py-2 px-6">
            <Ship className="h-4 w-4 mr-2" />
            Import Vehicles
          </TabsTrigger>
          <TabsTrigger value="parts" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700 py-2 px-6">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Find Used Parts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vehicles" className="space-y-4">
          <JapanVehicleImport />
        </TabsContent>
        
        <TabsContent value="parts" className="space-y-4">
          <BeforwardPartsFinder />
        </TabsContent>
      </Tabs>
    </div>
  )
}
