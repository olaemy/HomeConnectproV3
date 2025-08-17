"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { LandingPage } from "@/components/landing-page"

export default function HomePage() {
  const { user, isLoading, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      // If user is logged in, redirect them to the app's discover page
      router.replace("/discover")
    }
  }, [user, isLoading, router])

  const handleStartMatching = async () => {
    // This would typically go to a login/signup page.
    // For now, we'll simulate a login and redirect.
    await login("test@example.com", "password")
  }

  // Show a loading state while checking auth or if user is being redirected
  if (isLoading || user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If not loading and no user, show the landing page
  return (
    <div className="bg-background text-foreground min-h-screen">
      <LandingPage onStartMatching={handleStartMatching} />
    </div>
  )
}
