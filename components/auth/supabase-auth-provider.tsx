"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase, type UserProfile } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface AuthUser {
  id: string
  email: string
  role: "admin" | "staff" | "technician" | "customer"
  firstName: string
  lastName: string
  phone?: string
  isActive: boolean
}

interface AuthContextType {
  user: AuthUser | null
  supabaseUser: SupabaseUser | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  register: (
    email: string,
    password: string,
    userData: Partial<UserProfile>,
  ) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
  hasPermission: (module: string, action: string) => boolean
  authError: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

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

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          await loadUserProfile(session.user)
        }
      } catch (error) {
        console.error("[Auth] Failed to get initial session:", error)
        setAuthError("Failed to establish session")
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (session?.user) {
          await loadUserProfile(session.user)
        } else {
          setUser(null)
          setSupabaseUser(null)
        }
      } catch (error) {
        console.error("[Auth] Auth state change error:", error)
      } finally {
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", supabaseUser.id)
        .single()

      if (error?.code === "PGRST116") {
        console.warn("[Auth] User profile not found, creating default profile")
        const defaultProfile: UserProfile = {
          id: "",
          user_id: supabaseUser.id,
          first_name: supabaseUser.user_metadata?.first_name || "",
          last_name: supabaseUser.user_metadata?.last_name || "",
          role: supabaseUser.user_metadata?.role || "customer",
          is_active: true,
          phone: supabaseUser.user_metadata?.phone,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        const authUser: AuthUser = {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          role: defaultProfile.role,
          firstName: defaultProfile.first_name,
          lastName: defaultProfile.last_name,
          phone: defaultProfile.phone,
          isActive: true,
        }

        setUser(authUser)
        setSupabaseUser(supabaseUser)
        return
      }

      if (error) {
        console.error("[Auth] Error loading user profile:", error)
        setAuthError("Failed to load user profile")
        return
      }

      if (profile) {
        const authUser: AuthUser = {
          id: profile.user_id,
          email: supabaseUser.email!,
          role: profile.role,
          firstName: profile.first_name,
          lastName: profile.last_name,
          phone: profile.phone,
          isActive: profile.is_active,
        }

        setUser(authUser)
        setSupabaseUser(supabaseUser)
      }
    } catch (error) {
      console.error("[Auth] Error in loadUserProfile:", error)
      setAuthError("Failed to load profile")
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      setAuthError(null)

      if (!email || !password) {
        return { success: false, error: "Email and password are required" }
      }

      // ========== DEMO MODE ==========
      // Check if this is a demo login (for development/testing without real Supabase)
      const demoUsers: Record<string, AuthUser> = {
        "admin@masscar.com": {
          id: "demo-admin-001",
          email: "admin@masscar.com",
          role: "admin",
          firstName: "Admin",
          lastName: "User",
          isActive: true,
        },
        "staff@masscar.com": {
          id: "demo-staff-001",
          email: "staff@masscar.com",
          role: "staff",
          firstName: "Staff",
          lastName: "Member",
          isActive: true,
        },
        "tech@masscar.com": {
          id: "demo-tech-001",
          email: "tech@masscar.com",
          role: "technician",
          firstName: "Tech",
          lastName: "Worker",
          isActive: true,
        },
        "customer@masscar.com": {
          id: "demo-customer-001",
          email: "customer@masscar.com",
          role: "customer",
          firstName: "Customer",
          lastName: "User",
          isActive: true,
        },
      }

      // If it's a demo email with password "123456", use demo mode
      if (demoUsers[email] && password === "123456") {
        console.log("[Auth] Demo mode login:", email)
        setUser(demoUsers[email])
        return { success: true }
      }

      // ========== REAL SUPABASE AUTH ==========
      // Try real Supabase auth for non-demo users
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          console.error("[Auth] Supabase login error:", error)
          // If Supabase fails for demo emails, still allow demo login
          if (demoUsers[email] && error.message.includes("Failed to fetch")) {
            console.log("[Auth] Supabase connection failed, using demo mode")
            setUser(demoUsers[email])
            return { success: true }
          }
          let errorMessage = error.message
          if (error.message.includes("Invalid login credentials")) {
            errorMessage = "Invalid email or password"
          } else if (error.message.includes("Failed to fetch")) {
            errorMessage = "Connection failed - using demo mode for testing"
            // Fallback to demo mode for any demo email
            if (demoUsers[email]) {
              setUser(demoUsers[email])
              return { success: true }
            }
          }
          return { success: false, error: errorMessage }
        }

        if (data.user) {
          await loadUserProfile(data.user)
        }

        return { success: true }
      } catch (fetchError) {
        // Network error - use demo mode if demo email
        console.error("[Auth] Network error:", fetchError)
        if (demoUsers[email]) {
          console.log("[Auth] Using demo fallback due to network error")
          setUser(demoUsers[email])
          return { success: true }
        }
        return { success: false, error: "Connection failed - please check your internet" }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      console.error("[Auth] Unexpected login error:", error)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    userData: Partial<UserProfile>,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      setAuthError(null)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role || "customer",
            phone: userData.phone,
          },
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
        },
      })

      if (error) {
        console.error("[Auth] Registration error:", error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      console.error("[Auth] Unexpected registration error:", error)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      // Clear local state first (works for demo mode)
      setUser(null)
      setSupabaseUser(null)
      setAuthError(null)
      
      // Try to sign out from Supabase (ignore errors for demo mode)
      try {
        await supabase.auth.signOut()
      } catch (e) {
        // Ignore Supabase errors - demo mode doesn't need real signout
        console.log("[Auth] Demo mode logout - Supabase signout skipped")
      }
    } catch (error) {
      console.error("[Auth] Error during logout:", error)
      // Still clear local state even on error
      setUser(null)
      setSupabaseUser(null)
    }
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
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        login,
        logout,
        register,
        isLoading,
        hasPermission,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useSupabaseAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider")
  }
  return context
}
