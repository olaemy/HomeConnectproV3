"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "user" | "agent" | "admin"
export type AccountStatus = "active" | "suspended" | "removed"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  bio?: string
  age?: number
  location?: string
  preferences?: {
    budget?: [number, number]
    roommates?: number
    petFriendly?: boolean
    smoking?: boolean
  }
  isVerified: boolean
  trustScore: number
  accountStatus?: AccountStatus
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAccountRestricted: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAccountRestricted = user?.accountStatus === "suspended" || user?.accountStatus === "removed"

  useEffect(() => {
    // Simulate loading user data from a session
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call for login
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({
      id: "1",
      name: "Alex Johnson",
      email,
      role: "user",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Looking for a clean, friendly roommate in downtown area.",
      age: 25,
      location: "San Francisco, CA",
      preferences: {
        budget: [800, 1500],
        roommates: 1,
        petFriendly: true,
        smoking: false,
      },
      isVerified: true,
      trustScore: 85,
      accountStatus: "active",
    })
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAccountRestricted }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
