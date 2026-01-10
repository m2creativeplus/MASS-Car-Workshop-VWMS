"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Car, 
  Shield, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Zap,
  Award,
  Eye,
  Wifi,
  WifiOff,
  Smartphone,
  Camera,
  Mic,
  TrendingUp,
  Building2,
  Globe,
  Server,
  Lock,
  BarChart3,
  AlertTriangle,
  X,
  Menu,
  FileCheck,
  Database,
  Layers
} from "lucide-react"
import { useState } from "react"

// Problem Stats
const PROBLEMS = [
  { icon: AlertTriangle, title: "Trust Fragility", description: "Customers doubt quotes; shops lose credibility." },
  { icon: BarChart3, title: "Revenue Leakage", description: "15-20% of parts and labor costs go unrecorded." },
  { icon: Eye, title: "Operational Opacity", description: "You cannot scale what you cannot measure." },
]

// Pillars
const PILLARS = [
  { 
    number: "01", 
    title: "Evidence-Based Workflows", 
    subtitle: "Not Marketing Promises",
    description: "We don't sell 'customer satisfaction.' We sell Operational Truth. Through Gemini-powered Digital Vehicle Inspections (DVI), every repair is backed by photo evidence, timestamps, and technician logs. Trust is the byproduct of an auditable system.",
    icon: FileCheck
  },
  { 
    number: "02", 
    title: "Offline-First, Intelligence-Always", 
    subtitle: "Built for Real Conditions",
    description: "From the Port of Berbera to rural service nodes, MASS OSS functions without a constant 5G heartbeat. Our architecture uses local sync nodes that upload to the Convex cloud once connectivity is restored, ensuring the job card never stops.",
    icon: WifiOff
  },
  { 
    number: "03", 
    title: "Integrated Financial Sovereignty", 
    subtitle: "Local Payment Rails",
    description: "No Western credit card processors. MASS OSS is hard-wired into the local economy with native Zaad and e-Dahab mobile money integrations, allowing for instant, transparent payment reconciliation at the bay.",
    icon: Smartphone
  },
]

// Features
const FEATURES = [
  { 
    icon: Camera, 
    title: "Gemini Vision Part Scanner", 
    description: "Identify parts and cross-reference national market pricing instantly via camera.",
    color: "from-purple-500 to-pink-500"
  },
  { 
    icon: Mic, 
    title: "Somali Voice-Job Logger", 
    description: "Mechanics log complex repairs using colloquial Somali voice notes—transcribed and structured into job cards by AI.",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    icon: TrendingUp, 
    title: "The Market Pulse", 
    description: "Live scraping of social media and Google Maps to provide real-time benchmarks for vehicle valuations and repair costs in Hargeisa.",
    color: "from-emerald-500 to-teal-500"
  },
  { 
    icon: Building2, 
    title: "MASS Authority Bridge", 
    description: "Direct integration for vehicle registration and safety compliance reporting for government stakeholders.",
    color: "from-orange-500 to-red-500"
  },
]

// Impact Stats
const IMPACT_STATS = [
  { value: "70%", label: "Reduction in Part Theft", description: "Through real-time inventory 'shadowing'" },
  { value: "45%", label: "Increase in Trust-Scores", description: "Leading to first-of-their-kind fleet contracts" },
  { value: "100%", label: "Data Sovereignty", description: "Own the most accurate vehicle health database" },
]

// Anti-features
const ANTI_FEATURES = [
  { title: "No Cosmetic Fluff", description: "We don't focus on 'waiting room amenities.' We focus on the oily reality of the bay." },
  { title: "No Feature Checklists", description: "We don't add features to look busy. Every module must solve a trust gap or revenue leak." },
  { title: "No Anecdotal Management", description: "MASS OSS isn't about one man's shop. It is about creating a National Standard." },
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Layers className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight">MASS OSS</span>
                <span className="text-[10px] uppercase font-semibold text-orange-400 tracking-wider">National Mobility OS</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#pillars" className="text-slate-400 hover:text-white transition-colors text-sm">Pillars</Link>
              <Link href="#features" className="text-slate-400 hover:text-white transition-colors text-sm">Features</Link>
              <Link href="#impact" className="text-slate-400 hover:text-white transition-colors text-sm">Impact</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:text-orange-400">
                  Operator Login
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                  Partner with MASS
                </Button>
              </Link>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
          <div className="max-w-4xl">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2 mb-8">
              <Globe className="w-4 h-4 mr-2" />
              Built for 300-450 Somaliland Garages
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
              <span className="text-white">The Operating System for</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400">
                Mobility Services
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl font-light">
              Turning informal operations into trusted, intelligent systems.
            </p>

            <p className="text-lg text-slate-500 mb-12 max-w-2xl leading-relaxed">
              Workshops don't fail because of lack of effort. They fail because <span className="text-white">systems fail to reflect reality</span>. 
              MASS OSS brings <span className="text-orange-400">operational truth</span>—visibility into every job, every part, every payment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg gap-2 w-full sm:w-auto shadow-lg shadow-orange-500/25">
                  Explore the Platform
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg gap-2">
                  Compare to Tekmetric
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 text-sm">
              <div>
                <span className="text-2xl font-bold text-orange-500">50+</span>
                <span className="text-slate-400 ml-2">User Roles</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-orange-500">65+</span>
                <span className="text-slate-400 ml-2">Modules</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-orange-500">ZAAD</span>
                <span className="text-slate-400 ml-2">& eDahab Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">The Problem</h2>
            <p className="text-3xl md:text-5xl font-bold mb-6">
              The Invisibility of Work
            </p>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              The work is happening, but nobody can see it clearly. Existing platforms built for the West fail in East Africa because they assume high-trust environments and stable connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROBLEMS.map((problem) => {
              const Icon = problem.icon
              return (
                <Card key={problem.title} className="bg-red-500/5 border-red-500/20">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
                    <p className="text-slate-400">{problem.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Our Pillars</h2>
            <p className="text-3xl md:text-5xl font-bold">
              Operational Truth
            </p>
          </div>

          <div className="space-y-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <Card key={pillar.number} className="bg-slate-900 border-white/10 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 bg-gradient-to-br from-orange-500 to-red-600 p-8 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white/20">{pillar.number}</span>
                      </div>
                      <div className="p-8 flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <Icon className="w-8 h-8 text-orange-500" />
                          <div>
                            <h3 className="text-2xl font-bold text-white">{pillar.title}</h3>
                            <p className="text-orange-400">{pillar.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed">{pillar.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Feature Suite</h2>
            <p className="text-3xl md:text-5xl font-bold mb-4">
              Built for the Shifts of 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="bg-slate-900 border-white/10 hover:border-orange-500/30 transition-all group">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">National Impact Story</h2>
            <p className="text-3xl md:text-5xl font-bold mb-4">
              From Paper to Pulse
            </p>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              How a Hargeisa Network Scaled Beyond Physical Boundaries. A network of 15 verified suppliers and workshops transitioned from "Memory-Based" to "System-Led."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {IMPACT_STATS.map((stat) => (
              <Card key={stat.label} className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
                <CardContent className="p-8 text-center">
                  <p className="text-5xl font-bold text-orange-500 mb-2">{stat.value}</p>
                  <p className="text-xl font-semibold text-white mb-2">{stat.label}</p>
                  <p className="text-slate-400">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* THE ARCHITECTURAL DIFFERENCE */}
      <section className="py-24 bg-slate-900/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">The Architectural Difference</h2>
            <p className="text-3xl md:text-5xl font-bold mb-4">
              What We Deliberately Ignored
            </p>
            <p className="text-slate-400 text-lg">From "Standard" Shop Software</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ANTI_FEATURES.map((item) => (
              <Card key={item.title} className="bg-slate-900 border-white/10">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                      <X className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-slate-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Join the National Standard?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Partner with MASS Authority to bring operational truth to your network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 px-8 gap-2">
                    Explore Ecosystem <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 gap-2">
                    <Phone className="w-5 h-5" /> Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white">MASS OSS</span>
                <p className="text-xs text-slate-500">Professionalizing the Mobility Ecosystem</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>M2 Creative</span>
              <span>|</span>
              <span>Hargeisa</span>
              <span>|</span>
              <span>Berbera</span>
              <span>|</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
