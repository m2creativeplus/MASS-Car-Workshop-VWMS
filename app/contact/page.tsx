"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Car, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ArrowLeft
} from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
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
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-white font-medium">Contact</Link>
            </div>
            <Link href="/book">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
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
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">Contact Us</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get In Touch
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              We're Here to Help
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Have questions about our services? Need a quote? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-slate-900 border-white/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold">Send us a Message</h2>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-200">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-200">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="+252 63 4 123456" 
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="you@example.com" 
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-200">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help?" 
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-200">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your vehicle and what service you need..." 
                      rows={5}
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-900 border-white/10">
                  <CardContent className="p-6">
                    <Phone className="w-10 h-10 text-orange-500 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Phone</h3>
                    <p className="text-slate-400">+252 63 4 123456</p>
                    <p className="text-slate-400">+252 63 4 789012</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900 border-white/10">
                  <CardContent className="p-6">
                    <Mail className="w-10 h-10 text-orange-500 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <p className="text-slate-400">info@massworkshop.so</p>
                    <p className="text-slate-400">support@massworkshop.so</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900 border-white/10">
                  <CardContent className="p-6">
                    <MapPin className="w-10 h-10 text-orange-500 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Location</h3>
                    <p className="text-slate-400">26th June Road</p>
                    <p className="text-slate-400">Hargeisa, Somaliland</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900 border-white/10">
                  <CardContent className="p-6">
                    <Clock className="w-10 h-10 text-orange-500 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Hours</h3>
                    <p className="text-slate-400">Sat-Thu: 8AM - 6PM</p>
                    <p className="text-slate-400">Friday: Closed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Map Placeholder */}
              <Card className="bg-slate-900 border-white/10 overflow-hidden">
                <div className="h-64 bg-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                    <p className="text-slate-400">Map: 26th June Road, Hargeisa</p>
                    <p className="text-sm text-slate-500">Interactive map coming soon</p>
                  </div>
                </div>
              </Card>
            </div>
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
