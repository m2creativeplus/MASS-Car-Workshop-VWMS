import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Camera, Rotate3d, ShieldCheck, Zap, Globe, Star } from "lucide-react";
import Image from "next/image";

export default function SpyneCloneLanding() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">MASS.ai</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/solutions" className="text-slate-600 hover:text-blue-600 transition-colors">Solutions</Link>
            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="/resources" className="text-slate-600 hover:text-blue-600 transition-colors">Resources</Link>
            <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">Enterprise</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold text-slate-600">Log In</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg shadow-blue-600/20">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-1.5 text-sm rounded-full font-medium border-0">
                🚀 New: AI Studio 2.0 is live
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl mb-6">
                Transform Car Photography <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">with Automatic AI</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
                Empower your dealership with Vini AI. Create studio-quality car images, 360° spins, and video tours instantly. No studio required.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-300">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Image / Dashboard Preview */}
            <div className="mt-20 relative mx-auto max-w-5xl rounded-2xl border bg-slate-50 p-2 shadow-2xl lg:rounded-3xl">
               <div className="aspect-[16/9] overflow-hidden rounded-xl bg-slate-900 relative group cursor-pointer">
                 {/* Simulate a 3D viewer or dashboard interface */}
                 <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                    <Rotate3d className="h-24 w-24 text-blue-500/50 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                      <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10">
                         <div className="flex items-center gap-3">
                           <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                           <span className="text-white font-mono text-sm">AI Processing: Active</span>
                         </div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[800px] w-[800px] rounded-full bg-blue-50/50 blur-3xl opacity-50" />
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y bg-slate-50/50">
          <div className="container text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by 5,000+ Dealerships Globally</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Placeholders for logos */}
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="h-8 w-32 bg-slate-300 rounded animate-pulse" />
               ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                The Complete Digital Merchandising Suite
              </h2>
              <p className="text-lg text-slate-600">
                Everything you need to sell cars faster online. One platform, infinite possibilities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative rounded-2xl border p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="mb-6 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Camera className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Virtual Studio</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Turn poor smartphone photos into showroom masterpieces. AI removes backgrounds and adds soft shadows instantly.
                </p>
                <Link href="/dashboard/photo-studio" className="inline-flex items-center text-blue-600 font-semibold hover:gap-2 transition-all">
                  Try Studio AI <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="group relative rounded-2xl border p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                <div className="mb-6 h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Rotate3d className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">360° Car Spin</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Interactive 360° views that keep buyers engaged. Add hotspots to highlight features and imperfections.
                </p>
                <Link href="/dashboard/vehicles" className="inline-flex items-center text-purple-600 font-semibold hover:gap-2 transition-all">
                  See Demo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 3 */}
              <div className="group relative rounded-2xl border p-8 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
                <div className="mb-6 h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Auto-Inspection</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  AI detects dents, scratches, and damage automatically. Generate transparent condition reports for buyers.
                </p>
                <Link href="/dashboard/diagnostics" className="inline-flex items-center text-orange-600 font-semibold hover:gap-2 transition-all">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section (The "Why Us" Clone) */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Stop spending thousands on <br/>
                  <span className="text-blue-400">physical turntables</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mt-1">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">100x Faster Turnaround</h4>
                      <p className="text-slate-400">Process 50 cars in the time it takes to shoot one manually.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mt-1">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Global Standardization</h4>
                      <p className="text-slate-400">Ensure every car across 20 locations looks exactly the same.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mt-1">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">40% Higher Conversion</h4>
                      <p className="text-slate-400">Interactive listings keep buyers on your page 3x longer.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Graphic */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="space-y-4">
                     <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="font-mono text-sm text-slate-400">PROCESSING_QUEUE</span>
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">RUNNING</Badge>
                     </div>
                     {[1, 2, 3].map((i) => (
                       <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="h-10 w-16 bg-slate-700 rounded overflow-hidden relative">
                             {/* Placeholder for car thumb */}
                             <div className="absolute inset-0 bg-gradient-to-tr from-slate-600 to-slate-500" />
                          </div>
                          <div className="flex-1">
                             <div className="h-2 w-24 bg-slate-600 rounded mb-2" />
                             <div className="h-2 w-16 bg-slate-700 rounded" />
                          </div>
                          <CheckCircle2 className="h-5 w-5 text-blue-400" />
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to transform your inventory?</h2>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-10 text-lg bg-white text-blue-600 hover:bg-blue-50 shadow-xl border-0">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-blue-200">No credit card required • 14-day free trial</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 py-16 border-t">
        <div className="container grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
               <Camera className="h-6 w-6 text-blue-600" />
               <span className="font-bold text-lg">MASS.ai</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The world's leading AI photography platform for automotive dealerships and marketplaces.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/dashboard/photo-studio" className="hover:text-blue-600">Virtual Studio</Link></li>
              <li><Link href="/dashboard/configurator" className="hover:text-blue-600">360° Spin</Link></li>
              <li><Link href="/dashboard/diagnostics" className="hover:text-blue-600">Inspection AI</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-blue-600">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Blog</Link></li>
              <li><Link href="/dashboard/contact" className="hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="h-8 w-8 bg-slate-200 rounded-full hover:bg-blue-100 cursor-pointer transition-colors" />
              <div className="h-8 w-8 bg-slate-200 rounded-full hover:bg-blue-100 cursor-pointer transition-colors" />
              <div className="h-8 w-8 bg-slate-200 rounded-full hover:bg-blue-100 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        <div className="container mt-16 pt-8 border-t text-center text-sm text-slate-400">
          © 2026 MASS Open Source System. Cloned from Spyne.ai concepts.
        </div>
      </footer>
    </div>
  );
}
