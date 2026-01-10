"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight,
  Camera,
  Mic,
  TrendingUp,
  Building2,
  Layers,
  CheckCircle2,
  Calendar,
  Wrench,
  Car,
  FileText,
  ClipboardCheck,
  Package,
  Users,
  DollarSign,
  BarChart3,
  Bell,
  Globe,
  Shield,
  Smartphone,
  Zap,
  Database,
  Lock,
  Cloud,
  PieChart,
  Truck,
  Settings
} from "lucide-react"

// Core Modules
const CORE_MODULES = [
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "Smart scheduling with SMS/WhatsApp reminders. No-show tracking and rescheduling automation.",
    tag: "Core"
  },
  {
    icon: Wrench,
    title: "Work Orders",
    description: "Kanban-style job tracking from check-in to delivery. Real-time status visibility for every job.",
    tag: "Core"
  },
  {
    icon: Car,
    title: "Vehicle Management",
    description: "Complete vehicle history, service records, and predictive maintenance alerts.",
    tag: "Core"
  },
  {
    icon: Users,
    title: "Customer CRM",
    description: "Customer profiles, communication history, and relationship management.",
    tag: "Core"
  },
  {
    icon: ClipboardCheck,
    title: "Digital Vehicle Inspection",
    description: "Photo evidence, condition ratings, and automated estimate generation from inspections.",
    tag: "Core"
  },
  {
    icon: FileText,
    title: "Estimates & Invoicing",
    description: "Professional quotes, digital approvals, and instant invoicing with payment tracking.",
    tag: "Core"
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Real-time stock levels, reorder alerts, and purchase order automation.",
    tag: "Core"
  },
  {
    icon: DollarSign,
    title: "Point of Sale",
    description: "Counter sales, parts retail, and integrated payment processing.",
    tag: "Core"
  },
]

// AI Features
const AI_FEATURES = [
  {
    icon: Camera,
    title: "Gemini Vision Part Scanner",
    description: "Point your camera at any part. AI identifies it, finds cross-references, and shows local market pricing instantly.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Mic,
    title: "Somali Voice-Job Logger",
    description: "Mechanics speak in colloquial Somali. AI transcribes and structures into professional job cards automatically.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: TrendingUp,
    title: "Market Pulse Intelligence",
    description: "Live data from social media and marketplaces provides real-time benchmarks for vehicle valuations and repair costs.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Building2,
    title: "Authority Bridge API",
    description: "Direct integration for vehicle registration, safety compliance, and government reporting.",
    color: "from-amber-500 to-orange-500"
  },
]

// Payment Integration
const PAYMENTS = [
  { name: "ZAAD", description: "Instant mobile money acceptance" },
  { name: "eDahab", description: "Alternative mobile payment rail" },
  { name: "Cash", description: "Traditional cash with digital tracking" },
  { name: "Bank Transfer", description: "For fleet and institutional billing" },
]

// Technical Features
const TECHNICAL = [
  { icon: Cloud, title: "Cloud-First", description: "Convex-powered real-time sync across all devices" },
  { icon: Lock, title: "Enterprise Security", description: "Role-based access control with 50+ granular permissions" },
  { icon: Database, title: "Data Sovereignty", description: "You own your data. Export anytime, no lock-in." },
  { icon: Globe, title: "Multi-Language", description: "English, Somali, Arabic interfaces" },
]

// Department Modules
const DEPARTMENTS = [
  {
    title: "Mechanical",
    modules: ["Engine Diagnostics", "Brake Systems", "Suspension Work", "AC/Heating", "Transmission"]
  },
  {
    title: "Body Shop",
    modules: ["Collision Estimates", "Insurance Claims", "Frame Repair", "PDR Tracking"]
  },
  {
    title: "Paint Shop",
    modules: ["Color Matching", "Job Costing", "Booth Scheduling", "Material Tracking"]
  },
  {
    title: "Admin",
    modules: ["Payroll Integration", "Time Tracking", "Reports", "Multi-Location"]
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Layers className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white">MASS OSS</span>
                <span className="text-[10px] uppercase text-orange-400 tracking-wider">Features</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-slate-400 hover:text-white text-sm">Home</Link>
              <Link href="/about" className="text-slate-400 hover:text-white text-sm">About</Link>
              <Link href="/features" className="text-white text-sm font-medium">Features</Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2 mb-6">
            65+ Dashboard Modules
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Everything You Need to Run</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              A Modern Workshop
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            From appointment booking to AI-powered diagnostics. Built for Somaliland's mobility ecosystem.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white gap-2">
                Try Demo <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Core Platform</h2>
            <p className="text-3xl md:text-4xl font-bold text-white">
              Workshop Management Essentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_MODULES.map((module) => {
              const Icon = module.icon
              return (
                <Card key={module.title} className="bg-slate-900 border-white/10 hover:border-orange-500/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{module.title}</h3>
                    <p className="text-slate-400 text-sm">{module.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2 mb-4">
              <Zap className="w-4 h-4 mr-2" /> AI-Powered
            </Badge>
            <p className="text-3xl md:text-4xl font-bold text-white">
              Intelligence Built In
            </p>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Not bolted-on AI marketing. Real intelligence that solves real problems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AI_FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="bg-slate-900 border-white/10 overflow-hidden">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400 text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Payment Rails */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Local Payment Rails</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Built for Somaliland's Economy
              </h3>
              <p className="text-slate-400 text-lg mb-8">
                No Western credit card processors. MASS OSS is hard-wired into the local economy with native mobile money integrations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {PAYMENTS.map((payment) => (
                  <div key={payment.name} className="p-4 bg-slate-900 rounded-xl border border-white/10">
                    <div className="font-bold text-white mb-1">{payment.name}</div>
                    <div className="text-sm text-slate-400">{payment.description}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {TECHNICAL.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start gap-4 p-4 bg-slate-900 rounded-xl border border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-slate-400">{item.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Department Modules */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Department-Specific</h2>
            <p className="text-3xl md:text-4xl font-bold text-white">
              Tools for Every Team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEPARTMENTS.map((dept) => (
              <Card key={dept.title} className="bg-slate-900 border-white/10">
                <CardHeader>
                  <CardTitle className="text-orange-500">{dept.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {dept.modules.map((module) => (
                      <li key={module} className="flex items-center gap-2 text-slate-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {module}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Access */}
      <section className="py-20 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-y border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm uppercase tracking-widest text-orange-500 mb-4">Enterprise-Grade Security</h2>
          <p className="text-3xl md:text-4xl font-bold text-white mb-6">
            50+ User Roles & Permissions
          </p>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto mb-8">
            From Shop Owner to Apprentice Technician, from Body Shop Manager to Paint Mixer. 
            Every role has precisely the access they need—nothing more, nothing less.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["OWNER", "GENERAL_MANAGER", "SERVICE_ADVISOR", "MASTER_TECH", "BODY_TECH", "PAINTER", "PARTS_MANAGER", "CASHIER"].map((role) => (
              <Badge key={role} variant="outline" className="text-orange-400 border-orange-400/30">
                {role}
              </Badge>
            ))}
            <Badge variant="outline" className="text-slate-400 border-slate-400/30">
              +42 more
            </Badge>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Workshop?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join the operators who have already made the shift from paper to pulse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 gap-2">
                Start Free Demo <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8">
                Talk to Sales
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
              <span className="font-bold text-white">MASS OSS</span>
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
