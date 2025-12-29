"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
      {/* Animated container */}
      <div className="flex flex-col items-center gap-8">
        {/* Spinning Logo/Wrench */}
        <div className="relative">
          {/* Outer ring - gold */}
          <motion.div
            className="absolute inset-0 h-24 w-24 rounded-full border-4 border-amber-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle ring - green */}
          <motion.div
            className="absolute inset-2 h-20 w-20 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner ring - orange */}
          <motion.div
            className="absolute inset-4 h-16 w-16 rounded-full border-4 border-t-orange-500 border-r-orange-500/50 border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/50" />
          </motion.div>
          
          {/* Placeholder for size */}
          <div className="h-24 w-24" />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            className="text-xl font-bold text-white tracking-wide"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            MASS Workshop
          </motion.h2>
          
          {/* Animated dots */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-emerald-500"
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            ))}
          </div>
          
          <p className="text-sm text-zinc-500 mt-2">
            Loading your workshop...
          </p>
        </div>
      </div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      </div>
    </div>
  )
}
