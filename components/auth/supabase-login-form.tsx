"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Car, AlertCircle, Shield, Users, Wrench, User } from "lucide-react"
import { useSupabaseAuth } from "./supabase-auth-provider"

const demoUsers = [
  {
    role: "Admin",
    email: "admin@masscar.com",
    password: "123456",
    icon: Shield,
    color: "bg-red-500 hover:bg-red-600",
    description: "Full system access - All modules, user management, reports",
    permissions: ["All Modules", "User Management", "System Settings", "Advanced Reports"],
  },
  {
    role: "Staff",
    email: "staff@masscar.com",
    password: "123456",
    icon: Users,
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Operational access - Customer management, appointments, estimates",
    permissions: ["Customer Management", "Appointments", "Estimates", "Basic Reports"],
  },
  {
    role: "Technician",
    email: "tech@masscar.com",
    password: "123456",
    icon: Wrench,
    color: "bg-green-500 hover:bg-green-600",
    description: "Technical focus - Inspections, diagnostics, work orders",
    permissions: ["Vehicle Inspections", "Diagnostics", "Work Orders", "Parts Lookup"],
  },
  {
    role: "Customer",
    email: "customer@masscar.com",
    password: "123456",
    icon: User,
    color: "bg-purple-500 hover:bg-purple-600",
    description: "Self-service portal - View own vehicles, appointments, estimates",
    permissions: ["Own Vehicles", "Own Appointments", "View Estimates", "Service History"],
  },
]

export function SupabaseLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { login } = useSupabaseAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    setError(null)

    const result = await login(email, password)
    if (!result.success) {
      setError(result.error || "Login failed")
    }

    setIsLoading(false)
  }

  const handleDemoLogin = async (demoUser: (typeof demoUsers)[0]) => {
    setSelectedDemo(demoUser.role)
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    setIsLoading(true)
    setError(null)

    const result = await login(demoUser.email, demoUser.password)
    if (!result.success) {
      setError(result.error || "Demo login failed")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
              <Car className="w-9 h-9 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white">MASS Car Workshop</h1>
              <p className="text-lg text-slate-300">Vehicle Workshop Management System</p>
              <p className="text-sm text-slate-400">Hargeisa, Somaliland • AutoLeap Alternative</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="demo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="demo">Demo Login (Quick Test)</TabsTrigger>
            <TabsTrigger value="manual">Manual Login</TabsTrigger>
          </TabsList>

          {/* Demo Login Tab */}
          <TabsContent value="demo">
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-white">Test Different User Roles</CardTitle>
                <CardDescription className="text-center text-slate-300">
                  Click any role below to instantly login and explore the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {demoUsers.map((user) => {
                    const Icon = user.icon
                    const isSelected = selectedDemo === user.role

                    return (
                      <Card
                        key={user.role}
                        className={`cursor-pointer transition-all border-slate-600 bg-slate-700/50 hover:bg-slate-700 ${
                          isSelected ? "ring-2 ring-orange-500" : ""
                        }`}
                        onClick={() => handleDemoLogin(user)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${user.color}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-white">{user.role}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {user.email}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-300 mb-3">{user.description}</p>
                              <div className="space-y-1">
                                <p className="text-xs font-medium text-slate-400">Access Includes:</p>
                                <div className="flex flex-wrap gap-1">
                                  {user.permissions.slice(0, 2).map((permission) => (
                                    <Badge key={permission} variant="secondary" className="text-xs">
                                      {permission}
                                    </Badge>
                                  ))}
                                  {user.permissions.length > 2 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{user.permissions.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {isLoading && (
                  <div className="text-center mt-6">
                    <div className="inline-flex items-center space-x-2 text-slate-300">
                      <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in as {selectedDemo}...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manual Login Tab */}
          <TabsContent value="manual">
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-white">Manual Login</CardTitle>
                <CardDescription className="text-center text-slate-300">
                  Enter credentials manually for testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-200">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                {/* Quick Fill Buttons */}
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <p className="text-xs text-slate-400 text-center mb-2">Quick Fill:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {demoUsers.slice(0, 4).map((user) => (
                      <Button
                        key={user.role}
                        variant="outline"
                        size="sm"
                        className="text-xs border-slate-600 text-slate-300 hover:text-white"
                        onClick={() => {
                          setEmail(user.email)
                          setPassword(user.password)
                        }}
                      >
                        {user.role}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-400">
          <p>🚀 Complete AutoLeap Alternative • Built for Somaliland Workshops</p>
          <p className="mt-1">
            All demo accounts use password: <code className="bg-slate-800 px-2 py-1 rounded">123456</code>
          </p>
        </div>
      </div>
    </div>
  )
}
