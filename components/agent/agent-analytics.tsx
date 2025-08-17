"use client"

import { useState } from "react"
import { TrendingUp, Eye, MessageCircle, DollarSign, BarChart3, PieChart, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface AnalyticsData {
  totalViews: number
  totalInquiries: number
  conversionRate: number
  averageResponseTime: string
  topPerformingProperty: string
  monthlyGrowth: number
}

const mockAnalytics: AnalyticsData = {
  totalViews: 1247,
  totalInquiries: 89,
  conversionRate: 7.1,
  averageResponseTime: "2.1 hours",
  topPerformingProperty: "Modern 2BR in Mission District",
  monthlyGrowth: 15.3,
}

const mockPropertyPerformance = [
  { name: "Modern 2BR in Mission District", views: 245, inquiries: 12, conversion: 4.9 },
  { name: "Luxury Studio in SOMA", views: 189, inquiries: 8, conversion: 4.2 },
  { name: "Cozy Studio in Castro", views: 156, inquiries: 15, conversion: 9.6 },
  { name: "Penthouse 2BR with Views", views: 134, inquiries: 6, conversion: 4.5 },
]

const mockTrafficSources = [
  { source: "Direct Search", percentage: 45, color: "bg-blue-500" },
  { source: "Social Media", percentage: 25, color: "bg-purple-500" },
  { source: "Referrals", percentage: 20, color: "bg-green-500" },
  { source: "Email Marketing", percentage: 10, color: "bg-orange-500" },
]

export function AgentAnalytics() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your performance and optimize your listings</p>
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
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Views</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {mockAnalytics.totalViews.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">+{mockAnalytics.monthlyGrowth}% this month</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Inquiries</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{mockAnalytics.totalInquiries}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+12% from last month</p>
              </div>
              <MessageCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {mockAnalytics.conversionRate}%
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Industry avg: 5.2%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Avg Response</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {mockAnalytics.averageResponseTime}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Target: &lt;2 hours</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Property Performance */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 size={20} className="mr-2 text-blue-500" />
                Property Performance
              </CardTitle>
              <CardDescription>How your individual properties are performing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPropertyPerformance.map((property, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{property.name}</h4>
                      <span className="text-sm text-gray-600">{property.conversion}% conversion</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Views</p>
                        <p className="font-semibold">{property.views}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Inquiries</p>
                        <p className="font-semibold">{property.inquiries}</p>
                      </div>
                      <div>
                        <Progress value={property.conversion * 10} className="h-2 mt-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart size={20} className="mr-2 text-green-500" />
                Traffic Sources
              </CardTitle>
              <CardDescription>Where your property views are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${source.color}`} />
                      <span className="font-medium">{source.source}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${source.color}`}
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Performer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp size={20} className="mr-2 text-yellow-500" />
                Top Performer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{mockAnalytics.topPerformingProperty}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Highest conversion rate this month</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">9.6%</p>
                  <p className="text-xs text-yellow-600">Conversion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Peak Viewing Hours</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Most views between 7-9 PM</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Best Performing Day</p>
                <p className="text-xs text-green-600 dark:text-green-400">Sundays generate 23% more inquiries</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Average View Duration</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Users spend 3.2 minutes on your listings</p>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border border-orange-200 dark:border-orange-800 rounded-lg">
                <p className="text-sm font-medium">📸 Add more photos</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Properties with 8+ photos get 40% more views</p>
              </div>
              <div className="p-3 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm font-medium">⚡ Faster responses</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Respond within 1 hour to increase conversions
                </p>
              </div>
              <div className="p-3 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm font-medium">📝 Update descriptions</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Detailed descriptions perform 25% better</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
