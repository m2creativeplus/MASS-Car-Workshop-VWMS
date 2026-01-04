"use client"

import { useState } from "react"
import { useConvexAuth } from "./convex-auth-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Car, AlertCircle, User, Shield, Wrench, UserCircle, Crown, Zap, BarChart3, Clock, Bot, ChevronRight, Eye, EyeOff } from "lucide-react"
import { Vehicle3DAnimation } from "./vehicle-3d-animation"
import Link from "next/link"

export function ConvexLoginForm() {
  const { login, isLoading } = useConvexAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleLoginSuccess = (email: string) => {
    if (email.toLowerCase().includes("customer")) {
      router.push("/client")
    } else {
      router.push("/dashboard")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const result = await login(email, password)
    if (!result.success) {
      setError(result.error || "Login failed")
    } else {
      handleLoginSuccess(email)
    }
  }

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword("123456")
    setError(null)

    const result = await login(demoEmail, "123456")
    if (!result.success) {
      setError(result.error || "Login failed")
    } else {
      handleLoginSuccess(demoEmail)
    }
  }

  const demoAccounts = [
    { email: "owner@masscar.com", role: "Owner", icon: Crown, color: "text-amber-400 bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20" },
    { email: "admin@masscar.com", role: "Admin", icon: Shield, color: "text-red-400 bg-red-500/10 border-red-500/30 hover:bg-red-500/20" },
    { email: "staff@masscar.com", role: "Staff", icon: User, color: "text-blue-400 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20" },
    { email: "tech@masscar.com", role: "Technician", icon: Wrench, color: "text-green-400 bg-green-500/10 border-green-500/30 hover:bg-green-500/20" },
    { email: "customer@masscar.com", role: "Customer", icon: UserCircle, color: "text-purple-400 bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20" },
  ]

  const features = [
    { icon: Zap, label: "Real-time Updates", description: "Live sync across all devices" },
    { icon: BarChart3, label: "Advanced Analytics", description: "Powerful business insights" },
    { icon: Clock, label: "Time Tracking", description: "Automatic labor tracking" },
    { icon: Bot, label: "AI-Powered", description: "Smart diagnostics & estimates" },
  ]

  const stats = [
    { value: "500+", label: "Active Workshops" },
    { value: "50K+", label: "Vehicles Serviced" },
    { value: "99.9%", label: "Uptime" },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Premium Dark with Animation */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-slide-from-left">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.1),transparent_50%)]" />
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col w-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MASS Workshop</h1>
              <p className="text-xs text-slate-400 font-medium">Vehicle Management System</p>
            </div>
          </div>

          {/* Headline */}
          <div className="mt-16 max-w-lg">
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Streamline Your{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent animate-gradient-text">
                Workshop Operations
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Enterprise-grade automotive management trusted by leading workshops across East Africa.
            </p>
          </div>

          {/* 3D Vehicle Animation */}
          <div className="flex-1 flex items-center justify-center -mt-8">
            <Vehicle3DAnimation />
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.label}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{feature.label}</p>
                    <p className="text-xs text-slate-500">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-8 mt-8 pt-8 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white dark:bg-slate-900 p-8 animate-slide-from-right">
        <div className="w-full max-w-md">
          {/* Mobile Logo - Only visible on mobile */}
          <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">MASS Workshop</h1>
              <p className="text-xs text-slate-500">Vehicle Management System</p>
            </div>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
            <p className="text-slate-500 mt-1">Sign in to access your dashboard</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-600 dark:text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {/* Quick Demo Buttons */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Quick Demo</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="flex flex-wrap gap-2">
              {demoAccounts.map((account) => {
                const Icon = account.icon
                return (
                  <Button
                    key={account.email}
                    variant="outline"
                    size="sm"
                    className={`flex-1 min-w-[80px] border ${account.color} transition-all duration-200`}
                    onClick={() => handleDemoLogin(account.email)}
                    disabled={isLoading}
                  >
                    <Icon className="w-3.5 h-3.5 mr-1.5" />
                    {account.role}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs font-medium text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@masscar.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:ring-orange-500/20"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:ring-orange-500/20 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-orange-500/25 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-400">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-orange-500 hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
