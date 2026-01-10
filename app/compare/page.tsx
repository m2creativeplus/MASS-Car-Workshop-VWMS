"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight,
  CheckCircle2,
  XCircle,
  Layers,
  Minus
} from "lucide-react"

// Comparison data
const COMPARISON = [
  {
    category: "Core Philosophy",
    features: [
      { feature: "Target Market", mass: "Emerging Markets (Somaliland)", tekmetric: "US/Western Markets", winner: "different" },
      { feature: "Primary Focus", mass: "Operational Truth & Trust", tekmetric: "Customer Experience", winner: "mass" },
      { feature: "Pricing Model", mass: "$19-49/mo (local economy)", tekmetric: "$199-499/mo", winner: "mass" },
      { feature: "Payment Processing", mass: "ZAAD, eDahab, Mobile Money", tekmetric: "Credit Cards, ACH", winner: "different" },
    ]
  },
  {
    category: "Workshop Management",
    features: [
      { feature: "Appointment Scheduling", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Work Order Management", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Digital Vehicle Inspection", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Estimates & Invoicing", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Inventory Management", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Customer CRM", mass: true, tekmetric: true, winner: "tie" },
    ]
  },
  {
    category: "Body Shop & Paint",
    features: [
      { feature: "Collision Estimates", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Frame Repair Tracking", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Paint Job Costing", mass: true, tekmetric: false, winner: "mass" },
      { feature: "50+ Body Shop Roles", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Insurance Claim Integration", mass: true, tekmetric: true, winner: "tie" },
    ]
  },
  {
    category: "AI & Intelligence",
    features: [
      { feature: "AI Part Recognition", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Voice-to-Job Card (Somali)", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Market Pricing Intelligence", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Predictive Maintenance", mass: true, tekmetric: true, winner: "tie" },
    ]
  },
  {
    category: "User & Access",
    features: [
      { feature: "User Roles", mass: "50+ granular roles", tekmetric: "5-10 basic roles", winner: "mass" },
      { feature: "Multi-Location Support", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Customer Portal", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Vendor Portal", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Government/Fleet Portal", mass: true, tekmetric: false, winner: "mass" },
    ]
  },
  {
    category: "Local Market",
    features: [
      { feature: "Somali Language Support", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Arabic Language Support", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Japan Import Integration", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Local Vehicle Database", mass: true, tekmetric: false, winner: "mass" },
      { feature: "Affiliate/Referral System", mass: true, tekmetric: false, winner: "mass" },
    ]
  },
  {
    category: "Technical",
    features: [
      { feature: "Real-Time Sync", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Mobile App", mass: "PWA", tekmetric: "Native iOS/Android", winner: "tekmetric" },
      { feature: "API Access", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Data Export", mass: true, tekmetric: true, winner: "tie" },
      { feature: "Data Sovereignty (Own Your Data)", mass: true, tekmetric: false, winner: "mass" },
    ]
  },
]

const FeatureCell = ({ value, winner }: { value: any, winner: string }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <div className={`flex items-center gap-2 ${winner === 'mass' ? 'text-green-400' : 'text-slate-300'}`}>
        <CheckCircle2 className="w-5 h-5" />
        <span>Yes</span>
      </div>
    ) : (
      <div className="flex items-center gap-2 text-slate-500">
        <XCircle className="w-5 h-5" />
        <span>No</span>
      </div>
    )
  }
  return <span className={winner === 'mass' ? 'text-green-400 font-medium' : 'text-slate-300'}>{value}</span>
}

export default function ComparePage() {
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
                <span className="text-[10px] uppercase text-orange-400 tracking-wider">Comparison</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-slate-400 hover:text-white text-sm">Home</Link>
              <Link href="/about" className="text-slate-400 hover:text-white text-sm">About</Link>
              <Link href="/features" className="text-slate-400 hover:text-white text-sm">Features</Link>
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
            Honest Comparison
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">MASS OSS vs</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Tekmetric
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
            Tekmetric is excellent for US shops. But we built MASS OSS for a different reality.
          </p>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            This isn't about being "better"—it's about being <span className="text-orange-400">right for the context</span>.
          </p>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* MASS Card */}
            <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  MASS OSS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300">
                  <strong className="text-white">Best for:</strong> Somaliland & emerging markets
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Philosophy:</strong> Operational truth over feature lists
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Pricing:</strong> $19-49/month
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Unique:</strong> 50+ roles, body shop, paint shop, local payments
                </p>
              </CardContent>
            </Card>

            {/* Tekmetric Card */}
            <Card className="bg-slate-900 border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-xl font-bold">
                    T
                  </div>
                  Tekmetric
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300">
                  <strong className="text-white">Best for:</strong> US-based auto repair shops
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Philosophy:</strong> Customer experience first
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Pricing:</strong> $199-499/month
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Unique:</strong> Native mobile apps, CARFAX integration
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Tables */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {COMPARISON.map((section) => (
            <Card key={section.category} className="bg-slate-900 border-white/10 overflow-hidden">
              <CardHeader className="bg-slate-800/50">
                <CardTitle className="text-orange-500">{section.category}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-slate-400 font-medium">Feature</th>
                      <th className="text-left p-4 text-orange-400 font-medium">MASS OSS</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Tekmetric</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.features.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? 'bg-slate-800/30' : ''}>
                        <td className="p-4 text-white">{row.feature}</td>
                        <td className="p-4">
                          <FeatureCell value={row.mass} winner={row.winner} />
                        </td>
                        <td className="p-4">
                          <FeatureCell value={row.tekmetric} winner={row.winner === 'tekmetric' ? 'mass' : ''} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom Line */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Bottom Line
          </h2>
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-4 p-4 bg-slate-900 rounded-lg border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
              <p className="text-slate-300">
                <strong className="text-white">Choose Tekmetric</strong> if you're a US-based shop wanting polished mobile apps and CARFAX/ALLDATA integrations.
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/30">
              <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
              <p className="text-slate-300">
                <strong className="text-white">Choose MASS OSS</strong> if you're in Somaliland/East Africa, need mobile money payments, want body/paint shop support, or need government-grade compliance reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            See MASS OSS in Action
          </h2>
          <p className="text-slate-400 mb-8">
            Try the demo or talk to our team about your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 gap-2">
                Try Free Demo <ArrowRight className="w-5 h-5" />
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
            <div className="text-sm text-slate-400">
              Honest comparisons. No FUD.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
