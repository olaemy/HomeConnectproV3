"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Building, MessageCircle, User, Settings, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const agentNavItems = [
  { href: "/agent/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agent/properties", label: "Properties", icon: Building },
  { href: "/agent/messages", label: "Messages", icon: MessageCircle },
  { href: "/agent/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/agent/profile", label: "Profile", icon: User },
  { href: "/agent/settings", label: "Settings", icon: Settings },
]

export function AgentSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 flex-col hidden md:flex">
      <div className="mb-8">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent p-3">
          Agent Panel
        </h2>
        <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 ml-3" />
      </div>
      <nav className="flex flex-col space-y-2">
        {agentNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md hover:scale-102",
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Agent Status */}
      <div className="mt-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-600">Online</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">Ready to help clients find their perfect home</p>
      </div>
    </aside>
  )
}
