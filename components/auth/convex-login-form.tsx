"use client"

import { useState } from "react"
import { useConvexAuth } from "./convex-auth-provider"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Car, AlertCircle, User, Shield, Wrench, UserCircle, Crown, Eye, EyeOff, ArrowLeft } from "lucide-react"

// Google Icon Component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// Facebook Icon Component
const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

export function ConvexLoginForm() {
  const { login, isLoading } = useConvexAuth()
  const router = useRouter()
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    if (isRegisterMode && !agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy")
      return
    }

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

  const [socialMessage, setSocialMessage] = useState<string | null>(null)

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement OAuth with Convex Auth
    setSocialMessage(`${provider} login coming soon! Please use email or demo accounts below.`)
    // Clear message after 3 seconds
    setTimeout(() => setSocialMessage(null), 3000)
  }

  const demoAccounts = [
    { email: "owner@masscar.com", role: "Owner", icon: Crown, color: "text-amber-500" },
    { email: "admin@masscar.com", role: "Admin", icon: Shield, color: "text-red-500" },
    { email: "staff@masscar.com", role: "Staff", icon: User, color: "text-blue-500" },
    { email: "tech@masscar.com", role: "Technician", icon: Wrench, color: "text-green-500" },
    { email: "customer@masscar.com", role: "Customer", icon: UserCircle, color: "text-purple-500" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Back to Home */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Car className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">
              {isRegisterMode ? "Create your account" : "Welcome back"}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {isRegisterMode ? "Fill in the details below to get started" : "Sign in to your MASS Workshop account"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {socialMessage && (
            <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {socialMessage}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white h-11"
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
            >
              <GoogleIcon />
              <span className="ml-2">Google</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white h-11"
              onClick={() => handleSocialLogin("Facebook")}
              disabled={isLoading}
            >
              <FacebookIcon />
              <span className="ml-2">Facebook</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-800/50 px-2 text-slate-400">or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields (Registration Only) */}
            {isRegisterMode && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-200">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-orange-500/20"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-200">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-orange-500/20"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-orange-500/20"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-orange-500/20 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {isRegisterMode && (
                <p className="text-xs text-slate-500">Must be at least 8 characters</p>
              )}
            </div>

            {/* Terms Checkbox (Registration Only) */}
            {isRegisterMode && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="border-slate-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <label htmlFor="terms" className="text-sm text-slate-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-orange-400 hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-orange-400 hover:underline">Privacy Policy</Link>
                </label>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-lg shadow-orange-500/25 h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isRegisterMode ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                isRegisterMode ? "Create Account" : "Sign In"
              )}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <p className="text-center text-sm text-slate-400">
            {isRegisterMode ? "Already have an account? " : "Don't have an account? "}
            <button 
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-orange-400 hover:underline font-medium"
            >
              {isRegisterMode ? "Sign in" : "Create one"}
            </button>
          </p>

          {/* Demo Accounts Section */}
          {!isRegisterMode && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800/50 px-2 text-slate-400">Quick Demo Access</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {demoAccounts.slice(0, 3).map((account) => {
                  const Icon = account.icon
                  return (
                    <Button
                      key={account.email}
                      variant="outline"
                      size="sm"
                      className="border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      onClick={() => handleDemoLogin(account.email)}
                      disabled={isLoading}
                    >
                      <Icon className={`mr-1 h-3 w-3 ${account.color}`} />
                      {account.role}
                    </Button>
                  )
                })}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.slice(3).map((account) => {
                  const Icon = account.icon
                  return (
                    <Button
                      key={account.email}
                      variant="outline"
                      size="sm"
                      className="border-slate-600 bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 hover:text-white"
                      onClick={() => handleDemoLogin(account.email)}
                      disabled={isLoading}
                    >
                      <Icon className={`mr-1 h-3 w-3 ${account.color}`} />
                      {account.role}
                    </Button>
                  )
                })}
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-center text-xs text-slate-500 space-y-1">
          <p>Demo Password: <code className="px-1 py-0.5 bg-slate-700 rounded text-slate-300">123456</code></p>
          <p>© 2026 MASS Workshop • Powered by Convex</p>
        </CardFooter>
      </Card>
    </div>
  )
}
