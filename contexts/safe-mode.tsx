"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface SafeModeContextType {
  safeMode: boolean
  setSafeMode: (enabled: boolean) => void
}

const SafeModeContext = createContext<SafeModeContextType | undefined>(undefined)

interface SafeModeProviderProps {
  children: ReactNode
}

export function SafeModeProvider({ children }: SafeModeProviderProps) {
  const [safeMode, setSafeModeState] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rm.safeMode")
      if (stored !== null) {
        setSafeModeState(JSON.parse(stored))
      }
    } catch (error) {
      console.warn("Failed to load safe mode from localStorage:", error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Persist to localStorage when state changes
  const setSafeMode = (enabled: boolean) => {
    setSafeModeState(enabled)
    try {
      localStorage.setItem("rm.safeMode", JSON.stringify(enabled))
    } catch (error) {
      console.warn("Failed to save safe mode to localStorage:", error)
    }
  }

  // Don't render children until initialized to prevent hydration mismatch
  if (!isInitialized) {
    return null
  }

  return <SafeModeContext.Provider value={{ safeMode, setSafeMode }}>{children}</SafeModeContext.Provider>
}

export function useSafeMode() {
  const context = useContext(SafeModeContext)
  if (context === undefined) {
    throw new Error("useSafeMode must be used within a SafeModeProvider")
  }
  return context
}

export function useSafeModeOptional() {
  const context = useContext(SafeModeContext)
  if (context === undefined) {
    return { safeMode: false, setSafeMode: () => {} }
  }
  return context
}
