"use client"

import { useEffect, useState } from "react"

export function Vehicle3DAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Main Vehicle Container */}
      <div className="relative w-[320px] h-[200px] animate-float">
        
        {/* Car Body - Sleek SUV Shape */}
        <svg viewBox="0 0 320 180" className="w-full h-full" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
          {/* Car Shadow */}
          <ellipse cx="160" cy="175" rx="120" ry="8" fill="rgba(0,0,0,0.3)" className="animate-pulse" />
          
          {/* Car Body Main */}
          <path 
            d="M40 110 L60 70 L120 50 L200 50 L260 70 L280 110 L280 130 L40 130 Z" 
            fill="url(#carGradient)" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="1"
          />
          
          {/* Roof */}
          <path 
            d="M80 70 L100 40 L180 40 L220 70 Z" 
            fill="url(#roofGradient)"
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="1"
          />
          
          {/* Windows */}
          <path 
            d="M85 68 L102 45 L145 45 L145 68 Z" 
            fill="url(#windowGradient)"
            opacity="0.9"
          />
          <path 
            d="M150 45 L178 45 L210 68 L150 68 Z" 
            fill="url(#windowGradient)"
            opacity="0.9"
          />
          
          {/* Hood Details */}
          <line x1="80" y1="75" x2="240" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="160" y1="55" x2="160" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
          
          {/* Headlights */}
          <ellipse cx="55" cy="105" rx="8" ry="12" fill="#fff" opacity="0.9" className="animate-headlight" />
          <ellipse cx="265" cy="105" rx="8" ry="12" fill="#fff" opacity="0.9" className="animate-headlight" />
          
          {/* Taillights */}
          <rect x="275" y="100" width="5" height="20" rx="2" fill="#ff4444" opacity="0.8" />
          <rect x="40" y="100" width="5" height="20" rx="2" fill="#ff4444" opacity="0.8" />
          
          {/* Grille */}
          <rect x="135" y="100" width="50" height="15" rx="3" fill="rgba(0,0,0,0.5)" />
          <line x1="145" y1="102" x2="145" y2="113" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="155" y1="102" x2="155" y2="113" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="165" y1="102" x2="165" y2="113" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="175" y1="102" x2="175" y2="113" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="carGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="50%" stopColor="#2d3748" />
              <stop offset="100%" stopColor="#1a202c" />
            </linearGradient>
            <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="100%" stopColor="#2d3748" />
            </linearGradient>
            <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#63b3ed" />
              <stop offset="100%" stopColor="#3182ce" />
            </linearGradient>
            <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d3748" />
              <stop offset="100%" stopColor="#1a202c" />
            </linearGradient>
          </defs>
        </svg>

        {/* Wheels with Spinning Animation */}
        <div className="absolute bottom-0 left-[55px] w-[45px] h-[45px]">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-gray-600 animate-spin-slow flex items-center justify-center">
            <div className="w-[20px] h-[20px] rounded-full bg-gray-500 flex items-center justify-center">
              <div className="w-[8px] h-[8px] rounded-full bg-gray-400" />
            </div>
            {/* Wheel Spokes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[2px] h-full bg-gray-600" />
              <div className="absolute w-full h-[2px] bg-gray-600" />
              <div className="absolute w-[2px] h-full bg-gray-600 rotate-45" />
              <div className="absolute w-full h-[2px] bg-gray-600 rotate-45" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 right-[55px] w-[45px] h-[45px]">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-gray-600 animate-spin-slow flex items-center justify-center">
            <div className="w-[20px] h-[20px] rounded-full bg-gray-500 flex items-center justify-center">
              <div className="w-[8px] h-[8px] rounded-full bg-gray-400" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[2px] h-full bg-gray-600" />
              <div className="absolute w-full h-[2px] bg-gray-600" />
              <div className="absolute w-[2px] h-full bg-gray-600 rotate-45" />
              <div className="absolute w-full h-[2px] bg-gray-600 rotate-45" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mechanical Gears */}
      <div className="absolute top-8 left-8 opacity-40">
        <svg width="60" height="60" viewBox="0 0 60 60" className="animate-spin-slow">
          <path
            d="M30 5 L33 12 L40 10 L38 18 L45 22 L40 28 L45 35 L38 38 L40 46 L33 44 L30 52 L27 44 L20 46 L22 38 L15 35 L20 28 L15 22 L22 18 L20 10 L27 12 Z"
            fill="rgba(249,115,22,0.6)"
            stroke="rgba(249,115,22,0.8)"
            strokeWidth="1"
          />
          <circle cx="30" cy="30" r="10" fill="rgba(30,30,40,1)" />
          <circle cx="30" cy="30" r="4" fill="rgba(249,115,22,0.4)" />
        </svg>
      </div>

      <div className="absolute top-16 right-12 opacity-30">
        <svg width="40" height="40" viewBox="0 0 60 60" className="animate-spin-reverse">
          <path
            d="M30 5 L33 12 L40 10 L38 18 L45 22 L40 28 L45 35 L38 38 L40 46 L33 44 L30 52 L27 44 L20 46 L22 38 L15 35 L20 28 L15 22 L22 18 L20 10 L27 12 Z"
            fill="rgba(249,115,22,0.5)"
            stroke="rgba(249,115,22,0.7)"
            strokeWidth="1"
          />
          <circle cx="30" cy="30" r="10" fill="rgba(30,30,40,1)" />
          <circle cx="30" cy="30" r="4" fill="rgba(249,115,22,0.3)" />
        </svg>
      </div>

      <div className="absolute bottom-16 left-16 opacity-25">
        <svg width="50" height="50" viewBox="0 0 60 60" className="animate-spin-slow" style={{ animationDelay: '-2s' }}>
          <path
            d="M30 5 L33 12 L40 10 L38 18 L45 22 L40 28 L45 35 L38 38 L40 46 L33 44 L30 52 L27 44 L20 46 L22 38 L15 35 L20 28 L15 22 L22 18 L20 10 L27 12 Z"
            fill="rgba(249,115,22,0.5)"
            stroke="rgba(249,115,22,0.7)"
            strokeWidth="1"
          />
          <circle cx="30" cy="30" r="10" fill="rgba(30,30,40,1)" />
          <circle cx="30" cy="30" r="4" fill="rgba(249,115,22,0.3)" />
        </svg>
      </div>

      {/* Floating Wrench */}
      <div className="absolute top-20 left-1/4 animate-float-delayed opacity-50">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(249,115,22,0.8)" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </div>

      {/* Floating Screwdriver */}
      <div className="absolute bottom-24 right-1/4 animate-float opacity-40" style={{ animationDelay: '-1s' }}>
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="rgba(249,115,22,0.7)" strokeWidth="1.5">
          <path d="M4 22V4c0-.93 1.15-1.38 1.8-.7L12 10l4 4 4.2-4.2c.68-.68.23-1.8-.7-1.8H4" />
        </svg>
      </div>

      {/* Floating Piston */}
      <div className="absolute top-1/3 right-8 animate-bounce-slow opacity-35">
        <svg width="30" height="45" viewBox="0 0 30 45" fill="rgba(249,115,22,0.6)">
          <rect x="5" y="0" width="20" height="8" rx="2" fill="rgba(249,115,22,0.8)" />
          <rect x="10" y="8" width="10" height="25" fill="rgba(249,115,22,0.6)" />
          <circle cx="15" cy="40" r="5" fill="rgba(249,115,22,0.5)" />
        </svg>
      </div>

      {/* Spark Effects */}
      <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-orange-400 rounded-full animate-spark opacity-60" />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-spark-delayed opacity-50" />
      <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-orange-300 rounded-full animate-spark opacity-40" style={{ animationDelay: '-0.5s' }} />
    </div>
  )
}

export default Vehicle3DAnimation
