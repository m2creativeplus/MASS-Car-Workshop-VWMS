"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Wrench, 
  Car, 
  Shield, 
  Clock, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  Play,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Gauge,
  Paintbrush,
  Cog,
  Battery,
  Thermometer,
  LifeBuoy
} from "lucide-react";

// Navigation Component
function PublicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF4D24] flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white font-['Oxanium'] tracking-wider">
              MASS<span className="text-[#FF4D24]">OSS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-[#FF4D24] transition-colors font-medium">
              Home
            </Link>
            <Link href="/services" className="text-gray-400 hover:text-[#FF4D24] transition-colors font-medium">
              Services
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-[#FF4D24] transition-colors font-medium">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-[#FF4D24] transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-white hover:text-[#FF4D24] transition-colors font-medium"
            >
              Login
            </Link>
            <Link 
              href="/portal" 
              className="px-6 py-3 bg-[#FF4D24] hover:bg-[#FF6B47] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-[#FF4D24]/20"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" className="block text-white hover:text-[#FF4D24] py-2">Home</Link>
            <Link href="/services" className="block text-gray-400 hover:text-[#FF4D24] py-2">Services</Link>
            <Link href="/about" className="block text-gray-400 hover:text-[#FF4D24] py-2">About Us</Link>
            <Link href="/contact" className="block text-gray-400 hover:text-[#FF4D24] py-2">Contact</Link>
            <Link href="/login" className="block text-gray-400 hover:text-[#FF4D24] py-2">Login</Link>
            <Link 
              href="/portal" 
              className="block w-full text-center px-6 py-3 bg-[#FF4D24] text-white font-semibold rounded-lg"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <p className="text-[#FF4D24] font-semibold text-sm uppercase tracking-widest mb-4">
            Premium Automotive Excellence
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 font-['Oxanium']">
            PROFESSIONAL<br />
            <span className="text-[#FF4D24]">CAR REPAIR</span><br />
            AND MAINTENANCE
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-xl">
            Experience world-class automotive service with MASS OSS certified workshops. 
            International standards, local expertise.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/portal" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D24] hover:bg-[#FF6B47] text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-[#FF4D24]/30"
            >
              Get an Appointment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 hover:border-[#FF4D24] text-white font-bold rounded-lg transition-all duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[#FF4D24] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}

// Trust Marquee Section
function TrustMarquee() {
  const brands = ["TOYOTA", "NISSAN", "HONDA", "MITSUBISHI", "SUZUKI", "ISUZU", "BOSCH", "MOBIL"];
  
  return (
    <section className="bg-[#0E0E0E] py-8 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-12 flex-wrap opacity-50">
          {brands.map((brand, i) => (
            <span key={i} className="text-gray-500 font-bold text-lg tracking-widest font-['Oxanium']">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Process Section
function ServicesProcess() {
  const steps = [
    { num: "01", title: "Inspection", desc: "Complete 50-point vehicle inspection", icon: Gauge },
    { num: "02", title: "Diagnostic", desc: "AI-powered fault detection & analysis", icon: Cog },
    { num: "03", title: "Repair", desc: "Expert repair with genuine parts", icon: Wrench },
  ];

  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#FF4D24] font-semibold text-sm uppercase tracking-widest mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Oxanium']">
            OUR <span className="text-[#FF4D24]">PROCESS</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/10 hover:border-[#FF4D24]/50 transition-all duration-300">
                <span className="text-6xl font-bold text-[#FF4D24]/20 absolute top-4 right-4 font-['Oxanium']">
                  {step.num}
                </span>
                <step.icon className="w-12 h-12 text-[#FF4D24] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3 font-['Oxanium']">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-[#FF4D24]">
                  <ChevronRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Grid Section
function ServicesGrid() {
  const services = [
    { icon: Cog, title: "Engine Repair", desc: "Complete engine diagnostics, rebuilds, and maintenance" },
    { icon: Paintbrush, title: "Auto Painting", desc: "Professional spray painting and bodywork finishing" },
    { icon: Gauge, title: "Diagnostics", desc: "Computer-based fault detection and scanning" },
    { icon: Battery, title: "Electrical", desc: "Battery, alternator, and wiring repair" },
    { icon: Thermometer, title: "AC Service", desc: "Climate control repair and regas services" },
    { icon: LifeBuoy, title: "Tire Service", desc: "Wheel alignment, balancing, and tire fitting" },
  ];

  return (
    <section className="bg-[#0E0E0E] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#FF4D24] font-semibold text-sm uppercase tracking-widest mb-4">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Oxanium']">
            OUR <span className="text-[#FF4D24]">SERVICES</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="group bg-[#1A1A1A] rounded-xl p-6 border border-white/10 hover:border-[#FF4D24] transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-lg bg-[#FF4D24]/10 flex items-center justify-center mb-4 group-hover:bg-[#FF4D24] transition-all duration-300">
                <service.icon className="w-7 h-7 text-[#FF4D24] group-hover:text-white transition-all" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-['Oxanium']">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{service.desc}</p>
              <Link href="/services" className="text-[#FF4D24] text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "500+", label: "Happy Customers" },
    { value: "50+", label: "Expert Mechanics" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <section className="bg-[#FF4D24] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-5xl font-bold text-white font-['Oxanium'] mb-2">{stat.value}</p>
              <p className="text-white/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUs() {
  const reasons = [
    { icon: Award, title: "900+ Five Star Reviews", desc: "Trusted by hundreds of satisfied customers" },
    { icon: Users, title: "Professional Team", desc: "Certified mechanics with years of experience" },
    { icon: Clock, title: "Fast Turnaround", desc: "Most repairs completed same-day" },
    { icon: Shield, title: "Quality Guaranteed", desc: "All work backed by our service warranty" },
  ];

  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#FF4D24] font-semibold text-sm uppercase tracking-widest mb-4">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-['Oxanium'] mb-8">
              WE ARE <span className="text-[#FF4D24]">TRUSTED</span><br />BY THOUSANDS
            </h2>
            <div className="space-y-6">
              {reasons.map((reason, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FF4D24]/10 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-6 h-6 text-[#FF4D24]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{reason.title}</h4>
                    <p className="text-gray-400 text-sm">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div 
              className="rounded-2xl overflow-hidden aspect-square bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-[#FF4D24] rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#FF4D24]"></div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-bold">Join 500+ Happy Customers</p>
                  <p className="text-white/80 text-sm">Book your service today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="bg-[#0E0E0E] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-['Oxanium'] mb-6">
          READY TO GET YOUR<br />
          <span className="text-[#FF4D24]">CAR SERVICED?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Experience international-standard automotive service. Book your appointment today 
          and join thousands of satisfied customers.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/portal" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF4D24] hover:bg-[#FF6B47] text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-[#FF4D24]/30"
          >
            Book Appointment
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="tel:+252000000" 
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 hover:border-[#FF4D24] text-white font-bold rounded-lg transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            Call Us Now
          </Link>
        </div>
      </div>
    </section>
  );
}

// Footer
function PublicFooter() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FF4D24] flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-['Oxanium'] tracking-wider">
                MASS<span className="text-[#FF4D24]">OSS</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Premium automotive workshop management. International standards, local excellence.
            </p>
            <div className="flex gap-4">
              {["facebook", "twitter", "instagram"].map(social => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#FF4D24] flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-xs uppercase">{social.slice(0,2)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 font-['Oxanium']">QUICK LINKS</h4>
            <ul className="space-y-3">
              {["Home", "Services", "About Us", "Contact", "Blog"].map(link => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-gray-400 hover:text-[#FF4D24] transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4 font-['Oxanium']">SERVICES</h4>
            <ul className="space-y-3">
              {["Engine Repair", "Auto Painting", "Diagnostics", "AC Service", "Tire Service"].map(service => (
                <li key={service}>
                  <Link href="/services" className="text-gray-400 hover:text-[#FF4D24] transition-colors text-sm">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 font-['Oxanium']">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF4D24] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Hargeisa, Somaliland</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FF4D24] flex-shrink-0" />
                <span className="text-gray-400 text-sm">+252 63 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FF4D24] flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@mass-oss.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 MASS OSS. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-[#FF4D24] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-[#FF4D24] text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function PublicHomePage() {
  return (
    <div className="mechanic-theme min-h-screen">
      <PublicNavbar />
      <HeroSection />
      <TrustMarquee />
      <ServicesProcess />
      <ServicesGrid />
      <StatsSection />
      <WhyChooseUs />
      <CTASection />
      <PublicFooter />
    </div>
  );
}
