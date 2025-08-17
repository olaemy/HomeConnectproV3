"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { Header } from "@/components/header"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAuth } from "@/hooks/use-auth"
import { useEffect } from "react"

// Map URL paths to navigation tab IDs
const pathToTab: { [key: string]: string } = {
  "/discover": "home",
  "/add": "add",
  "/recommendations": "recs",
  "/chats": "chats",
  "/profile": "profile",
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { user, isLoading, isAccountRestricted } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/") // Redirect to landing page if not logged in
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (!isLoading && user && isAccountRestricted && pathname !== "/account-restricted") {
      router.push("/account-restricted")
    }
  }, [user, isLoading, isAccountRestricted, pathname, router])

  // Determine active tab from the current URL path
  const activeTab = Object.entries(pathToTab).find(([path]) => pathname.startsWith(path))?.[1] || "home"

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (isAccountRestricted && pathname === "/account-restricted") {
    return <>{children}</>
  }

  if (isDesktop) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900/50">
        <DesktopSidebar activeTab={activeTab} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
      // </CHANGE>
    )
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white dark:bg-gray-900 border-x border-gray-200 dark:border-gray-800 shadow-2xl">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
      <BottomNavigation activeTab={activeTab} />
    </div>
    // </CHANGE>
  )
}
