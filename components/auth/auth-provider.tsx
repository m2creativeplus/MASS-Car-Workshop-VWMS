"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  email: string
  role: "admin" | "staff" | "technician" | "customer"
  firstName: string
  lastName: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  hasPermission: (module: string, action: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users data
const demoUsers: Record<string, User> = {
  "admin@masscar.com": {
    id: 1,
    email: "admin@masscar.com",
    role: "admin",
    firstName: "System",
    lastName: "Administrator",
    phone: "+252-61-234-5678",
  },
  "staff@masscar.com": {
    id: 2,
    email: "staff@masscar.com",
    role: "staff",
    firstName: "Workshop",
    lastName: "Staff",
    phone: "+252-61-234-5679",
  },
  "tech@masscar.com": {
    id: 3,
    email: "tech@masscar.com",
    role: "technician",
    firstName: "Senior",
    lastName: "Technician",
    phone: "+252-61-234-5680",
  },
  "customer@masscar.com": {
    id: 4,
    email: "customer@masscar.com",
    role: "customer",
    firstName: "Demo",
    lastName: "Customer",
    phone: "+252-61-234-5681",
  },
}

// Role permissions mapping
const rolePermissions: Record<string, Record<string, Record<string, boolean>>> = {
  admin: {
    dashboard: { read: true, write: true, delete: true, manage: true },
    customers: { read: true, write: true, delete: true, manage: true },
    vehicles: { read: true, write: true, delete: true, manage: true },
    appointments: { read: true, write: true, delete: true, manage: true },
    technicians: { read: true, write: true, delete: true, manage: true },
    suppliers: { read: true, write: true, delete: true, manage: true },
    inspections: { read: true, write: true, delete: true, manage: true },
    estimates: { read: true, write: true, delete: true, manage: true },
    inventory: { read: true, write: true, delete: true, manage: true },
    reports: { read: true, write: true, delete: false, manage: true },
    "ai-tools": { read: true, write: true, delete: false, manage: true },
  },
  staff: {
    dashboard: { read: true, write: false, delete: false, manage: false },
    customers: { read: true, write: true, delete: false, manage: false },
    vehicles: { read: true, write: true, delete: false, manage: false },
    appointments: { read: true, write: true, delete: false, manage: true },
    technicians: { read: true, write: false, delete: false, manage: false },
    suppliers: { read: true, write: true, delete: false, manage: false },
    inspections: { read: true, write: true, delete: false, manage: false },
    estimates: { read: true, write: true, delete: false, manage: true },
    inventory: { read: true, write: true, delete: false, manage: false },
    reports: { read: true, write: false, delete: false, manage: false },
    "ai-tools": { read: true, write: true, delete: false, manage: false },
  },
  technician: {
    dashboard: { read: true, write: false, delete: false, manage: false },
    customers: { read: true, write: false, delete: false, manage: false },
    vehicles: { read: true, write: true, delete: false, manage: false },
    appointments: { read: true, write: true, delete: false, manage: false },
    technicians: { read: true, write: false, delete: false, manage: false },
    suppliers: { read: true, write: false, delete: false, manage: false },
    inspections: { read: true, write: true, delete: false, manage: true },
    estimates: { read: true, write: true, delete: false, manage: false },
    inventory: { read: true, write: false, delete: false, manage: false },
    reports: { read: true, write: false, delete: false, manage: false },
    "ai-tools": { read: true, write: true, delete: false, manage: false },
  },
  customer: {
    dashboard: { read: true, write: false, delete: false, manage: false },
    vehicles: { read: true, write: false, delete: false, manage: false },
    appointments: { read: true, write: true, delete: false, manage: false },
    inspections: { read: true, write: false, delete: false, manage: false },
    estimates: { read: true, write: false, delete: false, manage: false },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("mass_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check demo credentials
    if (password === "123456" && demoUsers[email]) {
      const userData = demoUsers[email]
      setUser(userData)
      localStorage.setItem("mass_user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mass_user")
  }

  const hasPermission = (module: string, action: string): boolean => {
    if (!user) return false

    const userPermissions = rolePermissions[user.role]
    if (!userPermissions) return false

    const modulePermissions = userPermissions[module]
    if (!modulePermissions) return false

    return modulePermissions[action] || false
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, hasPermission }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
