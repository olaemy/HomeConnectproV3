"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Home, Calendar, Wrench, DollarSign, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Reminder {
  id: string
  type: "rent" | "maintenance" | "inspection" | "lease" | "custom"
  title: string
  description: string
  propertyUnit: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  isRead: boolean
}

const mockReminders: Reminder[] = [
  {
    id: "1",
    type: "rent",
    title: "Rent Payment Due",
    description: "Monthly rent payment for March 2024",
    propertyUnit: "Building A - Unit 4B",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    priority: "high",
    isRead: false,
  },
  {
    id: "2",
    type: "maintenance",
    title: "HVAC Filter Replacement",
    description: "Replace air filter in bedroom unit",
    propertyUnit: "Building B - Unit 2A",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    priority: "medium",
    isRead: false,
  },
  {
    id: "3",
    type: "inspection",
    title: "Property Inspection",
    description: "Annual property inspection with property manager",
    propertyUnit: "Building C - Unit 12C",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    priority: "medium",
    isRead: true,
  },
  {
    id: "4",
    type: "lease",
    title: "Lease Renewal Notice",
    description: "Submit lease renewal decision",
    propertyUnit: "Building D - Unit 8F",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    priority: "high",
    isRead: false,
  },
  {
    id: "5",
    type: "custom",
    title: "Utility Setup",
    description: "Contact utility company to transfer services",
    propertyUnit: "Building E - Unit A",
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    priority: "low",
    isRead: true,
  },
]

export default function MyRemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "rent":
        return <DollarSign size={16} className="text-green-600" />
      case "maintenance":
        return <Wrench size={16} className="text-blue-600" />
      case "inspection":
        return <AlertCircle size={16} className="text-orange-600" />
      case "lease":
        return <Home size={16} className="text-purple-600" />
      case "custom":
        return <Calendar size={16} className="text-gray-600" />
      default:
        return <Clock size={16} className="text-gray-600" />
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      rent: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      maintenance: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      inspection: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      lease: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      custom: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    }
    return colors[type as keyof typeof colors] || colors.custom
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      low: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    }
    return colors[priority as keyof typeof colors] || colors.low
  }

  const getCountdown = (dueDate: Date) => {
    const now = new Date()
    const diffTime = dueDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`
    return `in ${diffDays} days`
  }

  const getCountdownColor = (dueDate: Date) => {
    const now = new Date()
    const diffTime = dueDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "text-red-600 dark:text-red-400"
    if (diffDays === 0) return "text-orange-600 dark:text-orange-400"
    if (diffDays <= 3) return "text-yellow-600 dark:text-yellow-400"
    return "text-gray-600 dark:text-gray-400"
  }

  const markAsRead = (reminderId: string) => {
    setReminders((prev) =>
      prev.map((reminder) => (reminder.id === reminderId ? { ...reminder, isRead: true } : reminder)),
    )
  }

  const unreadCount = reminders.filter((r) => !r.isRead).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reminders</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {unreadCount > 0 ? `${unreadCount} unread reminder${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="container mx-auto px-4 py-6">
        {reminders.length === 0 ? (
          <div className="text-center py-12">
            <Clock size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No reminders</h3>
            <p className="text-gray-600 dark:text-gray-400">You're all caught up! New reminders will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {reminders
              .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
              .map((reminder) => (
                <Card
                  key={reminder.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    !reminder.isRead ? "ring-2 ring-blue-200 dark:ring-blue-800" : ""
                  }`}
                  onClick={() => markAsRead(reminder.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {/* Unread indicator */}
                        {!reminder.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />}

                        {/* Type icon */}
                        <div className="mt-1 flex-shrink-0">{getTypeIcon(reminder.type)}</div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3
                              className={`font-semibold ${!reminder.isRead ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                            >
                              {reminder.title}
                            </h3>
                            <Badge className={`text-xs px-2 py-0.5 ${getTypeBadge(reminder.type)}`}>
                              {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                            </Badge>
                            <Badge className={`text-xs px-2 py-0.5 ${getPriorityBadge(reminder.priority)}`}>
                              {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{reminder.description}</p>

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <Home size={14} className="mr-1" />
                              <span className="truncate">{reminder.propertyUnit}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Countdown */}
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className={`text-sm font-medium ${getCountdownColor(reminder.dueDate)}`}>
                          {getCountdown(reminder.dueDate)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {reminder.dueDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
