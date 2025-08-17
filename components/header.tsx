"use client"

import { Heart, Megaphone, Clock } from "lucide-react"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { HeaderSafeModeToggle } from "@/components/safety/header-safe-mode-toggle"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { UserDropdownMenu } from "@/components/user-dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"

export function Header() {
  const { user, isLoading } = useAuth()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        {isDesktop ? (
          <div className="flex-1" />
        ) : (
          <div className="mr-4 flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-purple-600" />
              <span className="font-bold">RoomMatch</span>
            </a>
          </div>
        )}

        <div className="flex items-center justify-end space-x-2 lg:flex-1">
          {isLoading ? (
            <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
          ) : user ? (
            <>
              <HeaderSafeModeToggle />
              <Link href="/announcements">
                <Button variant="ghost" size="sm" className="relative">
                  <Megaphone size={20} />
                </Button>
              </Link>
              <Link href="/my-reminders">
                <Button variant="ghost" size="sm" className="relative">
                  <Clock size={20} />
                </Button>
              </Link>
              <NotificationDropdown hasNotifications={true} />
              <UserDropdownMenu />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
