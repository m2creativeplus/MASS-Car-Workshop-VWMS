"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Car, 
  Phone, 
  Users,
  Award,
  Target,
  Heart,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from "lucide-react"

const TEAM = [
  { name: "Ahmed Hassan", role: "Founder & Lead Mechanic", experience: "15+ years" },
  { name: "Mohamed Abdi", role: "Senior Technician", experience: "10+ years" },
  { name: "Fatima Omar", role: "Service Manager", experience: "8+ years" },
  { name: "Ali Jama", role: "Diagnostics Expert", experience: "7+ years" },
]

const VALUES = [
  { icon: Target, title: "Quality First", description: "We never compromise on the quality of our work or the parts we use." },
  { icon: Heart, title: "Customer Care", description: "Your satisfaction is our priority. We treat every customer like family." },
  { icon: Award, title: "Excellence", description: "We continuously improve our skills and stay updated with latest technology." },
]

export default function AboutPage() {
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
              <Link href="/services" className="text-slate-400 hover:text-white transition-colors">Services</Link>
              <Link href="/about" className="text-white font-medium">About</Link>
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
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">About Us</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Trusted Partner
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              For Auto Care
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Since 2014, MASS Workshop has been Hargeisa's premier destination for quality auto repair and maintenance services.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-400">
                <p>
                  MASS Workshop was founded in 2014 with a simple mission: to provide honest, reliable, and affordable auto repair services to the people of Somaliland.
                </p>
                <p>
                  What started as a small garage with just two mechanics has grown into one of the most trusted auto repair centers in Hargeisa. Today, we serve hundreds of customers every month and employ a team of certified technicians.
                </p>
                <p>
                  We believe in transparency, quality work, and treating every customer like family. Our state-of-the-art facility is equipped with modern diagnostic tools to handle everything from routine maintenance to complex repairs.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-500">10+</p>
                  <p className="text-sm text-slate-400">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-500">5000+</p>
                  <p className="text-sm text-slate-400">Vehicles Serviced</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-500">50+</p>
                  <p className="text-sm text-slate-400">Expert Staff</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-3xl p-8 border border-white/10">
              <div className="aspect-video bg-slate-800/50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Car className="w-24 h-24 text-orange-500 mx-auto mb-4" />
                  <p className="text-slate-400">Our Workshop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">These principles guide everything we do at MASS Workshop.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.title} className="bg-slate-900 border-white/10 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-slate-400">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">Our Team</Badge>
            <h2 className="text-3xl font-bold mb-4">Meet Our Experts</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our team of certified mechanics brings decades of combined experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <Card key={member.name} className="bg-slate-900 border-white/10">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-orange-400 text-sm">{member.role}</p>
                  <p className="text-slate-500 text-sm mt-1">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-slate-400 mb-8">Book your appointment today and see why thousands trust MASS Workshop.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 gap-2">
                Book Appointment <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
                <Phone className="w-5 h-5" /> Contact Us
              </Button>
            </Link>
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
