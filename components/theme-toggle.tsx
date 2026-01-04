"use client"

import * as React from "react"
import { Palette, Moon, Sun, Check } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const brands = [
  { id: "golden", label: "Golden Future", color: "bg-[#B68A35]" },
  { id: "silver", label: "Silver Service", color: "bg-[#C6C6C6]" },
  { id: "green", label: "Somaliland Green", color: "bg-[#00843D]" },
  { id: "red", label: "Somaliland Red", color: "bg-[#EF3340]" },
]

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = React.useState(false)

  // Sync dark mode class manually as we use data-theme for brand
  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('mass-dark-mode') === 'true'
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem('mass-dark-mode', String(newDark))
    if (newDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Brand Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
            <Palette className="h-4 w-4 text-slate-400" />
            <span className="sr-only">Toggle brand theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800 text-slate-200">
          <DropdownMenuLabel className="text-xs font-semibold text-slate-400 px-2 py-1.5 uppercase tracking-wider">Brand Personality</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-800" />
          {brands.map((brand) => (
            <DropdownMenuItem 
              key={brand.id} 
              onClick={() => setTheme(brand.id)}
              className="flex items-center gap-3 cursor-pointer hover:bg-white/5 focus:bg-white/5"
            >
              <div className={cn("w-3 h-3 rounded-full border border-white/20", brand.color)} />
              <span className="flex-1">{brand.label}</span>
              {theme === brand.id && <Check className="h-4 w-4 text-emerald-500" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dark Mode Toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleDarkMode}
        className="w-8 h-8 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-500" />
        ) : (
          <Moon className="h-4 w-4 text-slate-400" />
        )}
        <span className="sr-only">Toggle dark mode</span>
      </Button>
    </div>
  )
}
