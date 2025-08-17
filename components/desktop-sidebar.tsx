"use client"

import Link from "next/link"
import { Heart, Home, Plus, MessageCircle, User, Settings, Building } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DesktopSidebarProps {
  activeTab: string
}

export function DesktopSidebar({ activeTab }: DesktopSidebarProps) {
  const navigation = [
    { id: "home", href: "/discover", label: "Discover", icon: Home },
    { id: "add", href: "/add", label: "Add Listing", icon: Plus },
    { id: "properties", href: "/my-properties", label: "My Properties", icon: Building },
    { id: "recs", href: "/recommendations", label: "Recommendations", icon: Heart },
    { id: "chats", href: "/chats", label: "Messages", icon: MessageCircle },
    { id: "profile", href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-purple-600 mr-2" />
          <span className="text-xl font-bold">RoomMatch</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => (
            <Link key={item.id} href={item.href}>
              <Button variant={activeTab === item.id ? "default" : "ghost"} className="w-full justify-start">
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>
    </div>
  )
}
