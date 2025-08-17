"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import {
  Plus,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  MessageSquare,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Check,
  Megaphone,
  User,
  CheckCircle,
  CalendarIcon,
} from "lucide-react"

// Dummy data
const dummyTenants = [
  { id: "1", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Mike Chen", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Emily Rodriguez", avatar: "/placeholder.svg?height=40&width=40" },
]

const activeTenants = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    unit: "Unit 4B",
    rentAmount: 1800,
    leaseStart: "Jan 2024",
    leaseEnd: "Dec 2024",
    status: "Active",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    unit: "Unit 2A",
    rentAmount: 2200,
    leaseStart: "Mar 2024",
    leaseEnd: "Feb 2025",
    status: "Active",
  },
]

const pendingInvites = [
  {
    id: "1",
    code: "INV-ABC123",
    createdAt: "2 days ago",
    expiresAt: "5 days",
    status: "Pending",
  },
  {
    id: "2",
    code: "INV-XYZ789",
    createdAt: "1 week ago",
    expiresAt: "1 day",
    status: "Pending",
  },
]

const upcomingReminders = [
  {
    id: "1",
    type: "rent",
    description: "Rent collection for Unit 4B",
    dueDate: "March 1, 2024",
    priority: "high",
    scope: "Sarah Johnson",
    status: "pending",
  },
  {
    id: "2",
    type: "maintenance",
    description: "HVAC inspection for Building A",
    dueDate: "March 15, 2024",
    priority: "medium",
    scope: "All tenants",
    status: "pending",
  },
]

interface BroadcastDialogBodyProps {
  broadcastForm: {
    title: string
    message: string
    showIdentity: boolean
  }
  setBroadcastForm: (form: {
    title: string
    message: string
    showIdentity: boolean
  }) => void
  broadcastErrors: { title?: string; message?: string }
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}

function BroadcastDialogBody({
  broadcastForm,
  setBroadcastForm,
  broadcastErrors,
  onSubmit,
  onCancel,
}: BroadcastDialogBodyProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="broadcast-title">Title *</Label>
        <Input
          id="broadcast-title"
          value={broadcastForm.title}
          onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
          placeholder="Enter broadcast title"
          className={broadcastErrors.title ? "border-red-500" : ""}
        />
        {broadcastErrors.title && <p className="text-sm text-red-500">{broadcastErrors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="broadcast-message">Message *</Label>
        <Textarea
          id="broadcast-message"
          value={broadcastForm.message}
          onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
          placeholder="Enter your message"
          rows={4}
          className={broadcastErrors.message ? "border-red-500" : ""}
        />
        {broadcastErrors.message && <p className="text-sm text-red-500">{broadcastErrors.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-identity"
          checked={broadcastForm.showIdentity}
          onCheckedChange={(checked) => setBroadcastForm({ ...broadcastForm, showIdentity: checked as boolean })}
        />
        <Label htmlFor="show-identity" className="text-sm">
          Show my identity publicly
        </Label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Send</Button>
      </div>
    </form>
  )
}

interface InviteDialogBodyProps {
  inviteLink: string
  linkCopied: boolean
  onCopyLink: () => void
  onClose: () => void
}

function InviteDialogBody({ inviteLink, linkCopied, onCopyLink, onClose }: InviteDialogBodyProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Invite Link</Label>
        <div className="flex items-center gap-2">
          <Input value={inviteLink} readOnly className="flex-1 bg-gray-50 dark:bg-gray-800" />
          <Button size="sm" onClick={onCopyLink} className="shrink-0">
            {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>Done</Button>
      </div>
    </div>
  )
}

export function PropertyManagement() {
  const [activeTab, setActiveTab] = useState("properties")
  const [showBroadcastModal, setShowBroadcastModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [broadcastForm, setBroadcastForm] = useState({
    title: "",
    message: "",
    showIdentity: false,
  })
  const [broadcastErrors, setBroadcastErrors] = useState<{ title?: string; message?: string }>({})
  const [inviteLink] = useState("https://roommate-app.com/invite/abc123xyz")
  const [linkCopied, setLinkCopied] = useState(false)
  const [reminderForm, setReminderForm] = useState({
    type: "",
    description: "",
    scheduleType: "single",
    singleDate: "",
    monthlyDay: "1",
    scope: "all",
    specificTenants: [] as string[],
  })
  const [reminderErrors, setReminderErrors] = useState<{
    type?: string
    description?: string
    singleDate?: string
    specificTenants?: string
  }>({})
  const [reminders, setReminders] = useState(upcomingReminders)

  // Agent status for verification check
  const agentStatus = "approved" // Change to "pending" to see disabled state

  const isAgentApproved = agentStatus === "approved"

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: { title?: string; message?: string } = {}

    if (!broadcastForm.title.trim()) {
      errors.title = "Title is required"
    }
    if (!broadcastForm.message.trim()) {
      errors.message = "Message is required"
    }

    setBroadcastErrors(errors)

    if (Object.keys(errors).length === 0) {
      toast({
        title: "Broadcast sent successfully!",
        description: "Your message has been sent to all tenants.",
      })
      setShowBroadcastModal(false)
      setBroadcastForm({ title: "", message: "", showIdentity: false })
      setBroadcastErrors({})
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setLinkCopied(true)
    toast({
      title: "Link copied!",
      description: "Invite link has been copied to clipboard.",
    })
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: {
      type?: string
      description?: string
      singleDate?: string
      specificTenants?: string
    } = {}

    if (!reminderForm.type) {
      errors.type = "Type is required"
    }
    if (!reminderForm.description.trim()) {
      errors.description = "Description is required"
    }
    if (reminderForm.scheduleType === "single" && !reminderForm.singleDate) {
      errors.singleDate = "Date is required"
    }
    if (reminderForm.scope === "specific" && reminderForm.specificTenants.length === 0) {
      errors.specificTenants = "At least one tenant must be selected"
    }

    setReminderErrors(errors)

    if (Object.keys(errors).length === 0) {
      const newReminder = {
        id: Date.now().toString(),
        type: reminderForm.type.toLowerCase(),
        description: reminderForm.description,
        dueDate:
          reminderForm.scheduleType === "single"
            ? reminderForm.singleDate
            : `Monthly on day ${reminderForm.monthlyDay}`,
        priority: "medium" as const,
        scope: reminderForm.scope === "all" ? "All tenants" : reminderForm.specificTenants.join(", "),
        status: "pending" as const,
      }

      setReminders([newReminder, ...reminders])
      toast({
        title: "Reminder created!",
        description: "Your reminder has been added successfully.",
      })

      // Reset form
      setReminderForm({
        type: "",
        description: "",
        scheduleType: "single",
        singleDate: "",
        monthlyDay: "1",
        scope: "all",
        specificTenants: [],
      })
      setReminderErrors({})
    }
  }

  const handleTenantToggle = (tenantId: string) => {
    setReminderForm((prev) => ({
      ...prev,
      specificTenants: prev.specificTenants.includes(tenantId)
        ? prev.specificTenants.filter((id) => id !== tenantId)
        : [...prev.specificTenants, tenantId],
    }))
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Property Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your properties and tenants</p>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!isAgentApproved}
                  onClick={() => setShowBroadcastModal(true)}
                  className="hidden sm:flex items-center gap-2"
                >
                  <Megaphone className="w-4 h-4" />📢 Broadcast Message
                </Button>
              </TooltipTrigger>
              {!isAgentApproved && (
                <TooltipContent>
                  <p>Available after verification</p>
                </TooltipContent>
              )}
            </Tooltip>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$52,400</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Property cards would go here */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800"></div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Sunset Apartments</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Downtown, City Center
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3 h-3" />
                      2-3 bed
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3 h-3" />
                      1-2 bath
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-3 h-3" />
                      800-1200 sqft
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">$1,800-2,400/mo</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Eye className="w-3 h-3" />
                      124 views
                    </span>
                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <MessageSquare className="w-3 h-3" />8 inquiries
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tenants" className="space-y-6">
            {/* Active Tenants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Active Tenants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeTenants.map((tenant) => (
                  <Card key={tenant.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={tenant.avatar || "/placeholder.svg"} alt={tenant.name} />
                          <AvatarFallback>
                            {tenant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{tenant.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{tenant.unit}</p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          {tenant.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Rent:</span>
                          <span className="font-medium">${tenant.rentAmount}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Lease:</span>
                          <span>
                            {tenant.leaseStart} - {tenant.leaseEnd}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pending Invites */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Pending Invites</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" disabled={!isAgentApproved} onClick={() => setShowInviteModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Generate Invite Link
                    </Button>
                  </TooltipTrigger>
                  {!isAgentApproved && (
                    <TooltipContent>
                      <p>Available after verification</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingInvites.map((invite) => (
                  <Card key={invite.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {invite.code}
                        </div>
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          {invite.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Created:</span>
                          <span>{invite.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Expires in:</span>
                          <span className="text-orange-600">{invite.expiresAt}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            {/* Create Reminder */}
            <Card>
              <CardHeader>
                <CardTitle>Create Reminder</CardTitle>
                <CardDescription>Set up reminders for rent, maintenance, or custom tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReminderSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reminder-type">Type *</Label>
                      <Select
                        value={reminderForm.type}
                        onValueChange={(value) => setReminderForm({ ...reminderForm, type: value })}
                        disabled={!isAgentApproved}
                      >
                        <SelectTrigger className={reminderErrors.type ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select reminder type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rent">Rent</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                          <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      {reminderErrors.type && <p className="text-sm text-red-500">{reminderErrors.type}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reminder-description">Description *</Label>
                      <Input
                        id="reminder-description"
                        value={reminderForm.description}
                        onChange={(e) => setReminderForm({ ...reminderForm, description: e.target.value })}
                        placeholder="Enter reminder description"
                        className={reminderErrors.description ? "border-red-500" : ""}
                        disabled={!isAgentApproved}
                      />
                      {reminderErrors.description && (
                        <p className="text-sm text-red-500">{reminderErrors.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Schedule</Label>
                    <RadioGroup
                      value={reminderForm.scheduleType}
                      onValueChange={(value) => setReminderForm({ ...reminderForm, scheduleType: value })}
                      disabled={!isAgentApproved}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single">Single date</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly on specific day</Label>
                      </div>
                    </RadioGroup>

                    {reminderForm.scheduleType === "single" && (
                      <div className="space-y-2">
                        <Input
                          type="date"
                          value={reminderForm.singleDate}
                          onChange={(e) => setReminderForm({ ...reminderForm, singleDate: e.target.value })}
                          className={reminderErrors.singleDate ? "border-red-500" : ""}
                          disabled={!isAgentApproved}
                        />
                        {reminderErrors.singleDate && (
                          <p className="text-sm text-red-500">{reminderErrors.singleDate}</p>
                        )}
                      </div>
                    )}

                    {reminderForm.scheduleType === "monthly" && (
                      <div className="space-y-2">
                        <Select
                          value={reminderForm.monthlyDay}
                          onValueChange={(value) => setReminderForm({ ...reminderForm, monthlyDay: value })}
                          disabled={!isAgentApproved}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select day of month" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                              <SelectItem key={day} value={day.toString()}>
                                Day {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Scope</Label>
                    <RadioGroup
                      value={reminderForm.scope}
                      onValueChange={(value) => setReminderForm({ ...reminderForm, scope: value, specificTenants: [] })}
                      disabled={!isAgentApproved}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all-tenants" />
                        <Label htmlFor="all-tenants">All tenants of this property</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="specific" id="specific-tenants" />
                        <Label htmlFor="specific-tenants">Specific tenants</Label>
                      </div>
                    </RadioGroup>

                    {reminderForm.scope === "specific" && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {dummyTenants.map((tenant) => (
                            <div key={tenant.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`tenant-${tenant.id}`}
                                checked={reminderForm.specificTenants.includes(tenant.id)}
                                onCheckedChange={() => handleTenantToggle(tenant.id)}
                                disabled={!isAgentApproved}
                              />
                              <Label htmlFor={`tenant-${tenant.id}`} className="text-sm">
                                {tenant.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {reminderErrors.specificTenants && (
                          <p className="text-sm text-red-500">{reminderErrors.specificTenants}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button type="submit" disabled={!isAgentApproved}>
                          Create Reminder
                        </Button>
                      </TooltipTrigger>
                      {!isAgentApproved && (
                        <TooltipContent>
                          <p>Available after verification</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Upcoming Reminders */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
                <CardDescription>View and manage your scheduled reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Badge
                            variant="outline"
                            className={
                              reminder.type === "rent"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : reminder.type === "maintenance"
                                  ? "bg-orange-50 text-orange-700 border-orange-200"
                                  : "bg-gray-50 text-gray-700 border-gray-200"
                            }
                          >
                            {reminder.type}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{reminder.description}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3" />
                              {reminder.dueDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {reminder.scope}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            reminder.priority === "high"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : reminder.priority === "medium"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {reminder.priority}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Mobile FAB for Broadcast */}
        <div className="fixed bottom-20 right-4 sm:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                disabled={!isAgentApproved}
                onClick={() => setShowBroadcastModal(true)}
                className="rounded-full w-14 h-14 shadow-lg"
              >
                <Megaphone className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            {!isAgentApproved && (
              <TooltipContent>
                <p>Available after verification</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Broadcast Dialog */}
        <Dialog open={showBroadcastModal} onOpenChange={setShowBroadcastModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New Broadcast</DialogTitle>
              <DialogDescription>Send a message to all tenants of this property</DialogDescription>
            </DialogHeader>
            <BroadcastDialogBody
              broadcastForm={broadcastForm}
              setBroadcastForm={setBroadcastForm}
              broadcastErrors={broadcastErrors}
              onSubmit={handleBroadcastSubmit}
              onCancel={() => {
                setShowBroadcastModal(false)
                setBroadcastForm({ title: "", message: "", showIdentity: false })
                setBroadcastErrors({})
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Invite Dialog */}
        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Generate Invite Link</DialogTitle>
              <DialogDescription>Share this link with potential tenants</DialogDescription>
            </DialogHeader>
            <InviteDialogBody
              inviteLink={inviteLink}
              linkCopied={linkCopied}
              onCopyLink={handleCopyLink}
              onClose={() => setShowInviteModal(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
