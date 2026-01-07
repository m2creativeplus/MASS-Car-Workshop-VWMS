"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Car, 
  Wrench, 
  Phone, 
  ArrowRight,
  Gauge,
  Battery,
  Droplets,
  Settings2,
  Cog,
  Thermometer,
  Zap,
  Shield,
  Clock,
  CheckCircle2,
  ArrowLeft
} from "lucide-react"
import { cn } from "@/lib/utils"

const SERVICES = [
  { 
    icon: Wrench, 
    title: "Engine Repair & Rebuild", 
    description: "Complete engine diagnostics, repair, and rebuild services. We handle everything from minor fixes to complete engine overhauls for all vehicle makes.",
    features: ["Full engine diagnostics", "Cylinder head repair", "Engine rebuild", "Performance tuning"],
    color: "from-orange-500 to-red-500",
    price: "From $150"
  },
  { 
    icon: Droplets, 
    title: "Oil Change Service", 
    description: "Premium oil change with multi-point inspection. We use only quality oils and filters to keep your engine running smoothly.",
    features: ["Synthetic oil options", "Filter replacement", "Fluid top-off", "Multi-point inspection"],
    color: "from-blue-500 to-cyan-500",
    price: "From $35"
  },
  { 
    icon: Gauge, 
    title: "Computer Diagnostics", 
    description: "Advanced computer diagnostics using state-of-the-art equipment to identify issues quickly and accurately.",
    features: ["OBD-II scanning", "Error code analysis", "Sensor testing", "Performance data"],
    color: "from-purple-500 to-pink-500",
    price: "From $50"
  },
  { 
    icon: Battery, 
    title: "Battery & Electrical", 
    description: "Battery testing, replacement, and complete electrical system diagnostics and repair.",
    features: ["Battery testing", "Alternator check", "Starter repair", "Wiring diagnostics"],
    color: "from-emerald-500 to-teal-500",
    price: "From $25"
  },
  { 
    icon: Settings2, 
    title: "Brake Service", 
    description: "Complete brake inspection, pad replacement, rotor resurfacing, and brake system repairs.",
    features: ["Brake inspection", "Pad replacement", "Rotor service", "Brake fluid flush"],
    color: "from-amber-500 to-orange-500",
    price: "From $80"
  },
  { 
    icon: Cog, 
    title: "Transmission Service", 
    description: "Transmission fluid change, filter replacement, and complete transmission repair and rebuild.",
    features: ["Fluid change", "Filter replacement", "Clutch repair", "Rebuild service"],
    color: "from-rose-500 to-red-500",
    price: "From $100"
  },
  { 
    icon: Thermometer, 
    title: "Cooling System", 
    description: "Radiator repair, coolant flush, thermostat replacement, and cooling system diagnostics.",
    features: ["Radiator service", "Coolant flush", "Thermostat replace", "Hose inspection"],
    color: "from-cyan-500 to-blue-500",
    price: "From $60"
  },
  { 
    icon: Zap, 
    title: "AC & Heating", 
    description: "Air conditioning recharge, heating system repair, and climate control diagnostics.",
    features: ["AC recharge", "Compressor repair", "Heater core", "Climate control"],
    color: "from-indigo-500 to-purple-500",
    price: "From $75"
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Car className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white">MASS Workshop</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">Hargeisa, Somaliland</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
              <Link href="/services" className="text-white font-medium">Services</Link>
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
            </div>
            <Link href="/book">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                Book Service
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">Our Services</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Complete Auto Care
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Under One Roof
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            From routine maintenance to major repairs, our certified mechanics provide professional service for all vehicle makes and models.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title} className="bg-slate-900 border-white/10 overflow-hidden group hover:border-orange-500/50 transition-all">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className={cn(
                        "w-full md:w-48 h-32 md:h-auto bg-gradient-to-br flex items-center justify-center shrink-0",
                        service.color
                      )}>
                        <Icon className="w-16 h-16 text-white" />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                          <Badge className="bg-slate-800 text-orange-400 border-0">{service.price}</Badge>
                        </div>
                        <p className="text-slate-400 mb-4">{service.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose MASS Workshop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Mechanics</h3>
              <p className="text-slate-400">Our technicians are trained and certified to work on all vehicle makes and models.</p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-slate-400">We respect your time. Most services are completed same-day or next-day.</p>
            </div>
            <div>
              <CheckCircle2 className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-slate-400">We stand behind our work with a satisfaction guarantee on all services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-slate-400 mb-8">Book your appointment today or call us for a free consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 gap-2">
                Book Appointment <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
              <Phone className="w-5 h-5" /> +252 63 4 123456
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
          <p>© 2026 MASS Workshop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
