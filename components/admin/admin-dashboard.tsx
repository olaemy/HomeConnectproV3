"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Shield, AlertTriangle, Home, CheckCircle, XCircle, Clock, Eye } from "lucide-react"

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalReports: number
  pendingReports: number
  verifiedUsers: number
  totalListings: number
  activeListings: number
  totalMatches: number
}

interface SafetyReport {
  id: string
  reporterId: string
  reportedUserId: string
  reportedUserName: string
  type: string
  description: string
  status: "pending" | "investigating" | "resolved" | "dismissed"
  createdAt: string
  priority: "low" | "medium" | "high"
}

const mockStats: DashboardStats = {
  totalUsers: 12847,
  activeUsers: 8932,
  totalReports: 234,
  pendingReports: 23,
  verifiedUsers: 7456,
  totalListings: 3421,
  activeListings: 2876,
  totalMatches: 45632,
}

const mockReports: SafetyReport[] = [
  {
    id: "1",
    reporterId: "user_123",
    reportedUserId: "user_456",
    reportedUserName: "John Doe",
    type: "harassment",
    description: "User sent inappropriate messages and continued after being asked to stop.",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
    priority: "high",
  },
  {
    id: "2",
    reporterId: "user_789",
    reportedUserId: "user_101",
    reportedUserName: "Jane Smith",
    type: "fake_profile",
    description: "Profile photos appear to be stock images, inconsistent information.",
    status: "investigating",
    createdAt: "2024-01-14T15:45:00Z",
    priority: "medium",
  },
  {
    id: "3",
    reporterId: "user_202",
    reportedUserId: "user_303",
    reportedUserName: "Mike Johnson",
    type: "scam",
    description: "Requesting money upfront for apartment viewing, suspicious behavior.",
    status: "pending",
    createdAt: "2024-01-13T09:15:00Z",
    priority: "high",
  },
]

export function AdminDashboard() {
  const [reports, setReports] = useState<SafetyReport[]>(mockReports)

  const updateReportStatus = (reportId: string, newStatus: SafetyReport["status"]) => {
    setReports((prev) => prev.map((report) => (report.id === reportId ? { ...report, status: newStatus } : report)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "investigating":
        return <Eye className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "dismissed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <Badge className="bg-green-100 text-green-800">System Healthy</Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{mockStats.activeUsers.toLocaleString()} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Reports</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalReports}</div>
            <p className="text-xs text-muted-foreground">{mockStats.pendingReports} pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.verifiedUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((mockStats.verifiedUsers / mockStats.totalUsers) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeListings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{mockStats.totalListings.toLocaleString()} total listings</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Safety Reports</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="listings">Listing Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Safety Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(report.priority)}`} />
                        <span className="font-medium">Report #{report.id}</span>
                        <Badge variant="outline" className="capitalize">
                          {report.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        <span className="text-sm capitalize">{report.status}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Reported User:</strong> {report.reportedUserName}
                      </p>
                      <p className="text-sm">{report.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        {report.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateReportStatus(report.id, "investigating")}
                            >
                              Investigate
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateReportStatus(report.id, "dismissed")}
                            >
                              Dismiss
                            </Button>
                          </>
                        )}
                        {report.status === "investigating" && (
                          <>
                            <Button size="sm" onClick={() => updateReportStatus(report.id, "resolved")}>
                              Resolve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateReportStatus(report.id, "dismissed")}
                            >
                              Dismiss
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">User management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>Listing Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Listing management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
