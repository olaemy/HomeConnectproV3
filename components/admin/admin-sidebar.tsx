"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Shield, AlertTriangle, Settings, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/safety", label: "Safety Reports", icon: Shield },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/alerts", label: "System Alerts", icon: AlertTriangle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-gradient-to-b from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-4 flex-col hidden md:flex">
      <div className="mb-8">
        <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent p-3">
          Admin Panel
        </h2>
        <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-16 ml-3" />
      </div>
      <nav className="flex flex-col space-y-2">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md hover:scale-102",
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* System Status */}
      <div className="mt-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-600">System Healthy</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">All services operational</p>
      </div>
    </aside>
  )
}
