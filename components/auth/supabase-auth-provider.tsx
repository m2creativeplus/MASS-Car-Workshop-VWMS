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

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        await loadUserProfile(session.user)
      }

      setIsLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user)
      } else {
        setUser(null)
        setSupabaseUser(null)
      }
      setIsLoading(false)
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

      if (error) {
        console.error("Error loading user profile:", error)
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
      console.error("Error in loadUserProfile:", error)
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user) {
        await loadUserProfile(data.user)
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" }
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
        },
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSupabaseUser(null)
    } catch (error) {
      console.error("Error during logout:", error)
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
