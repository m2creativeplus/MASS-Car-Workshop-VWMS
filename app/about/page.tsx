"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight,
  Eye,
  Shield,
  Target,
  TrendingUp,
  Building2,
  Globe,
  CheckCircle2,
  Layers,
  Users,
  Car,
  Wrench,
  Truck,
  Building,
  CircleDot
} from "lucide-react"

// What drives us
const PRINCIPLES = [
  { 
    title: "Operational Truth",
    description: "When workshops can see what work is in progress, who is responsible, what parts are moving, and what money is actually earned—everything changes."
  },
  { 
    title: "Trust by Design",
    description: "Trust is not a marketing promise; it is a system outcome. Time-stamped actions, inspection photos, audit logs, and role-based visibility."
  },
  { 
    title: "Context-Aware",
    description: "Workflows, terminology, pricing intelligence, and inspection logic evolve from real workshop behavior and local vehicle markets."
  },
]

// Who it's for
const AUDIENCES = [
  {
    icon: Wrench,
    title: "Independent Workshops",
    description: "From single-bay garages to multi-lift operations. Bring visibility to every job card, every part, every payment.",
    count: "200+"
  },
  {
    icon: Car,
    title: "Body & Paint Shops",
    description: "Collision centers, paint booths, PDR specialists. Track estimates, insurance claims, and frame work with precision.",
    count: "50+"
  },
  {
    icon: Truck,
    title: "Fleet Operators",
    description: "NGOs, government fleets, transport companies. Single dashboard for all vehicle maintenance across your fleet.",
    count: "30+"
  },
  {
    icon: Building,
    title: "Dealer Networks",
    description: "Multi-location operations with centralized oversight. Network-wide visibility with location-specific controls.",
    count: "10+"
  },
  {
    icon: Building2,
    title: "Government & Institutions",
    description: "Transport ministries, regulatory bodies, road safety authorities. Compliance-ready reporting and oversight.",
    count: "5+"
  },
  {
    icon: Users,
    title: "Service Chains",
    description: "Quick lubes, tire shops, AC specialists. Standardized workflows across every location.",
    count: "25+"
  },
]

// Design philosophy
const PHILOSOPHY = [
  {
    title: "Operational-First, Not Feature-First",
    description: "We don't build features for checklists. We build systems that reflect how work actually flows. Every module answers: What is happening now? What happened before? What is likely to happen next?"
  },
  {
    title: "Visual, Evidence-Based Workflows",
    description: "From Kanban job tracking to Digital Vehicle Inspections, we prioritize visual clarity, photo evidence, status transparency, and one-glance understanding. This is decision UX."
  },
  {
    title: "Community-Driven, Context-Aware",
    description: "Built with operators, not above them. The system adapts to the operator—not the other way around. Localized for ZAAD, eDahab, and Somaliland market realities."
  },
]

// What we're not
const NOT_COPYING = [
  {
    title: "We Don't Sell 'Customer Experience'",
    description: "We sell Operational Truth. Customer experience follows naturally when your operations are transparent and trustworthy."
  },
  {
    title: "We're Not 'Just Shop Management'",
    description: "MASS OSS is infrastructure + intelligence. We're building the data backbone for Somaliland's mobility sector."
  },
  {
    title: "We Don't Sell Features",
    description: "We sell clarity, trust, and insight. Every module must solve a trust gap or revenue leak—not just look busy."
  },
]

// Commitment
const COMMITMENTS = [
  "Continuous improvement based on operator feedback",
  "Operational clarity over feature complexity",
  "Empowerment through insight, not dependency",
  "Building systems that last—not trends",
  "100% data sovereignty—your data stays yours"
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Layers className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight">MASS OSS</span>
                <span className="text-[10px] uppercase font-semibold text-orange-400 tracking-wider">Mobility & Automotive</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">Home</Link>
              <Link href="/about" className="text-white text-sm font-medium">About</Link>
              <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm">Features</Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2 mb-6">
              About MASS OSS
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-white">Built From the Ground Up for</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Real-World Mobility Operations
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              MASS OSS is more than a shop management platform. It is an <span className="text-white font-medium">operating system for mobility services</span>—designed for environments where trust is fragile, workflows are informal, and operational visibility is critical.
            </p>

            <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">
              Built with firsthand understanding of how automotive services actually operate in Somaliland and emerging markets, MASS OSS empowers workshops, fleets, and institutions to work with clarity, accountability, and confidence—every single day.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-y border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Our Mission</h2>
          <p className="text-3xl md:text-4xl font-bold text-white max-w-4xl mx-auto leading-relaxed">
            "To help mobility service operators thrive by giving them <span className="text-orange-400">operational truth</span>, <span className="text-orange-400">trusted workflows</span>, and <span className="text-orange-400">intelligence</span>—not just software."
          </p>
          <p className="text-slate-400 mt-8 text-lg max-w-2xl mx-auto">
            We believe workshops don't fail because of lack of effort. They fail because systems fail to reflect reality. MASS OSS exists to fix that.
          </p>
        </div>
      </section>

      {/* Why We Were Created */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Why MASS OSS Was Created</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Invisibility of Work
              </h3>
              <div className="bg-slate-900/50 border-l-4 border-orange-500 p-6 mb-6 rounded-r-lg">
                <p className="text-xl text-slate-300 italic">
                  "The work is happening, but nobody can see it clearly."
                </p>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                Across workshops and fleets, operations relied on paper job cards, memory-based tracking, cash drawers with no real reporting, verbal promises instead of evidence, and fragmented tools that didn't talk to each other.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Existing platforms—mostly built for Western markets—assumed stable infrastructure, individual device usage, formal accounting habits, and high-trust processes. That assumption broke down in local realities.
              </p>
            </div>
            <div className="space-y-4">
              {PRINCIPLES.map((principle, i) => (
                <Card key={i} className="bg-slate-900 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{principle.title}</h4>
                        <p className="text-slate-400 text-sm">{principle.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Who It's For</h2>
            <p className="text-3xl md:text-5xl font-bold text-white mb-4">
              Built for 300-450 Operators
            </p>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Across Hargeisa, Burao, Berbera, and beyond—from single-bay garages to government fleets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUDIENCES.map((audience) => {
              const Icon = audience.icon
              return (
                <Card key={audience.title} className="bg-slate-900 border-white/10 hover:border-orange-500/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                        {audience.count} in SL
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{audience.title}</h3>
                    <p className="text-slate-400 text-sm">{audience.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Design & Technology Philosophy</h2>
            <p className="text-3xl md:text-5xl font-bold text-white">
              How We Think Differently
            </p>
          </div>

          <div className="space-y-6">
            {PHILOSOPHY.map((item, i) => (
              <Card key={i} className="bg-slate-900 border-white/10">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                      <span className="text-2xl font-bold text-white">0{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-slate-400 text-lg leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Deliberately Ignore */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">The MASS OSS Difference</h2>
            <p className="text-3xl md:text-5xl font-bold text-white mb-4">
              What We Deliberately Don't Do
            </p>
            <p className="text-slate-400 text-lg">
              vs. Tekmetric, Mitchell1, Shop-Ware
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NOT_COPYING.map((item, i) => (
              <Card key={i} className="bg-slate-900 border-white/10">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Workshops */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Beyond Workshops</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                A Growing Ecosystem
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                While workshops are the foundation, MASS OSS is designed to scale into a complete mobility infrastructure for Somaliland and beyond.
              </p>
              <div className="space-y-4">
                {[
                  "Fleet management dashboards",
                  "Market pricing intelligence",
                  "Compliance-ready reporting",
                  "Government transport insights",
                  "Institutional oversight tools"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CircleDot className="w-5 h-5 text-orange-500" />
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold text-white mb-6">Our Commitment</h4>
                  <div className="space-y-4">
                    {COMMITMENTS.map((commitment, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="text-slate-300">{commitment}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* One Line */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm uppercase tracking-widest text-white/70 mb-4">MASS OSS in One Line</h2>
          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
            "The operating system for mobility services in emerging markets—turning informal operations into trusted, intelligent systems."
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to See the Difference?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join the operators who have already made the shift from paper to pulse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 gap-2">
                Explore the Platform <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 gap-2">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white">MASS OSS</span>
                <p className="text-xs text-slate-500">Powered by M2 Creative</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/features" className="hover:text-white">Features</Link>
              <Link href="/login" className="hover:text-white">Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
