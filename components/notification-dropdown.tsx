"use client"

import { useState } from "react"
import { Bell, Heart, MessageCircle, UserPlus, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface NotificationDropdownProps {
  hasNotifications: boolean
}

export function NotificationDropdown({ hasNotifications }: NotificationDropdownProps) {
  const [notifications] = useState([
    {
      id: "1",
      type: "match",
      title: "New Match!",
      message: "You and Sarah Chen liked each other",
      time: "2 minutes ago",
      icon: Heart,
      unread: true,
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      message: "Marcus sent you a message",
      time: "1 hour ago",
      icon: MessageCircle,
      unread: true,
    },
    {
      id: "3",
      type: "verification",
      title: "Verification Complete",
      message: "Your identity has been verified",
      time: "2 hours ago",
      icon: Shield,
      unread: false,
    },
    {
      id: "4",
      type: "like",
      title: "Someone liked you!",
      message: "Check out your new admirers",
      time: "3 hours ago",
      icon: UserPlus,
      unread: false,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={20} />
          {hasNotifications && unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          {unreadCount > 0 && <Badge variant="secondary">{unreadCount} new</Badge>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications yet</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
              <div className="flex items-start space-x-3 w-full">
                <div
                  className={`p-2 rounded-full ${
                    notification.type === "match"
                      ? "bg-pink-100 text-pink-600"
                      : notification.type === "message"
                        ? "bg-blue-100 text-blue-600"
                        : notification.type === "verification"
                          ? "bg-green-100 text-green-600"
                          : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <notification.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{notification.title}</p>
                    {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full ml-2" />}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-blue-600 cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
