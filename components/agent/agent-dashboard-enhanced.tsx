"use client"

import { useState } from "react"
import { MessageCircle, Eye, Calendar, DollarSign, Home, Mail, Clock, Award, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DashboardStats {
  totalProperties: number
  availableProperties: number
  totalViews: number
  totalInquiries: number
  monthlyRevenue: number
  responseRate: number
  averageRating: number
  totalReviews: number
}

interface RecentActivity {
  id: string
  type: "inquiry" | "view" | "message" | "booking"
  property: string
  client: string
  time: string
  status: "new" | "responded" | "pending"
}

const mockStats: DashboardStats = {
  totalProperties: 12,
  availableProperties: 8,
  totalViews: 1247,
  totalInquiries: 89,
  monthlyRevenue: 15600,
  responseRate: 94,
  averageRating: 4.8,
  totalReviews: 127,
}

const mockRecentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "inquiry",
    property: "Modern 2BR in Mission District",
    client: "Sarah Johnson",
    time: "2 hours ago",
    status: "new",
  },
  {
    id: "2",
    type: "message",
    property: "Luxury Studio in SOMA",
    client: "David Kim",
    time: "4 hours ago",
    status: "responded",
  },
  {
    id: "3",
    type: "view",
    property: "Cozy Studio in Castro",
    client: "Anonymous",
    time: "6 hours ago",
    status: "new",
  },
  {
    id: "4",
    type: "booking",
    property: "Penthouse 2BR with Views",
    client: "Emily Chen",
    time: "1 day ago",
    status: "pending",
  },
]

const mockUpcomingTasks = [
  { id: "1", task: "Property showing at 2 PM", property: "Modern 2BR in Mission District", time: "Today" },
  { id: "2", task: "Follow up with Sarah Johnson", property: "Luxury Studio in SOMA", time: "Tomorrow" },
  { id: "3", task: "Update property photos", property: "Cozy Studio in Castro", time: "This week" },
]

export function AgentDashboardEnhanced() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "inquiry":
        return <MessageCircle size={16} className="text-blue-500" />
      case "view":
        return <Eye size={16} className="text-green-500" />
      case "message":
        return <Mail size={16} className="text-purple-500" />
      case "booking":
        return <Calendar size={16} className="text-orange-500" />
      default:
        return <Clock size={16} className="text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-500"
      case "responded":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your business overview</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={timeRange === "week" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("week")}>
            Week
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button
            variant={timeRange === "quarter" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("quarter")}
          >
            Quarter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Properties</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{mockStats.totalProperties}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">{mockStats.availableProperties} available</p>
              </div>
              <Home className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  ${mockStats.monthlyRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">+12% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Total Views</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {mockStats.totalViews.toLocaleString()}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400">+8% this week</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Inquiries</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{mockStats.totalInquiries}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">+15% this month</p>
              </div>
              <MessageCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 size={20} className="mr-2 text-blue-500" />
                Performance Overview
              </CardTitle>
              <CardDescription>Your key performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Rate</span>
                    <span className="text-sm text-gray-600">{mockStats.responseRate}%</span>
                  </div>
                  <Progress value={mockStats.responseRate} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Client Satisfaction</span>
                    <span className="text-sm text-gray-600">{mockStats.averageRating}/5.0</span>
                  </div>
                  <Progress value={(mockStats.averageRating / 5) * 100} className="h-2" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mockStats.totalReviews}</div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">96%</div>
                  <div className="text-sm text-gray-600">Positive Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2.1h</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock size={20} className="mr-2 text-green-500" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest interactions with your properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <p className="font-medium text-sm">{activity.client}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{activity.property}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`} />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                <Home size={16} className="mr-2" />
                Add New Property
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <MessageCircle size={16} className="mr-2" />
                View Messages
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Calendar size={16} className="mr-2" />
                Schedule Showing
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar size={20} className="mr-2 text-orange-500" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUpcomingTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="font-medium text-sm">{task.task}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{task.property}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {task.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award size={20} className="mr-2 text-yellow-500" />
                Profile Strength
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Profile Completion</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="space-y-2 text-xs">
                  <div className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Profile photo added
                  </div>
                  <div className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    License verified
                  </div>
                  <div className="flex items-center text-yellow-600">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                    Add more specialties
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
