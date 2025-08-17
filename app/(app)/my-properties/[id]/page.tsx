"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  Megaphone,
  Send,
  Copy,
  Check,
  Heart,
  Eye,
  MessageSquare,
  Link2,
  UserPlus,
  Wifi,
  Zap,
  Car,
  Dumbbell,
  Home,
  BarChart3,
  Shield,
  MessageCircle,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock property data - in real app this would come from API
const mockProperty = {
  id: "1",
  title: "Cozy Studio in Mission District",
  type: "apartment",
  location: "Mission District, SF",
  address: "1234 Mission St, San Francisco, CA 94103",
  price: 2400,
  bedrooms: 1,
  bathrooms: 1,
  sqft: 650,
  rating: 4.8,
  views: 124,
  inquiries: 8,
  status: "active",
  postedDate: "2024-01-10",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  description:
    "Beautiful studio apartment in the heart of Mission District. Recently renovated with modern amenities and great natural light.",
  amenities: ["WiFi", "Laundry", "Parking", "Pet Friendly", "Gym"],
  monthlyRevenue: 2400,
  occupancyRate: 100,
  totalViews: 124,
  totalInquiries: 8,
  averageRating: 4.8,
}

// Mock tenants for this property
const propertyTenants = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Unit 4B",
    rentAmount: 2400,
    leaseStart: "Jan 2024",
    leaseEnd: "Dec 2024",
    status: "Active",
    moveInDate: "2024-01-15",
    lastPayment: "2024-02-01",
    paymentStatus: "Paid",
  },
]

// Mock reminders for this property
const propertyReminders = [
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
    description: "HVAC inspection",
    dueDate: "March 15, 2024",
    priority: "medium",
    scope: "All tenants",
    status: "pending",
  },
]

// Mock broadcasts for this property
const propertyBroadcasts = [
  {
    id: "1",
    title: "Building Maintenance Notice",
    message: "Scheduled maintenance on March 10th from 9 AM to 12 PM.",
    sentDate: "2024-02-25",
    recipients: "All tenants",
    status: "Sent",
  },
  {
    id: "2",
    title: "Rent Reminder",
    message: "Friendly reminder that rent is due on March 1st.",
    sentDate: "2024-02-28",
    recipients: "Sarah Johnson",
    status: "Sent",
  },
]

// Mock manager data for the property
const mockManager = {
  id: "mgr-1",
  name: "Maria Santos-Rodriguez",
  avatar: "/placeholder.svg?height=60&width=60",
  role: "Property Manager",
  rating: 4.9,
  responseTime: "< 1 hour",
  isVerified: true,
  totalProperties: 12,
}

// Amenity icons mapping
const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Laundry: Zap,
  Parking: Car,
  "Pet Friendly": Heart,
  Gym: Dumbbell,
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const propertyId = params.id as string

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showBroadcastModal, setShowBroadcastModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null)
  const [isTabBarSticky, setIsTabBarSticky] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const tabBarRef = useRef<HTMLDivElement>(null)

  const [messageForm, setMessageForm] = useState({
    subject: "",
    message: "",
  })

  const [broadcastForm, setBroadcastForm] = useState({
    title: "",
    message: "",
    showIdentity: false,
  })

  const [reminderForm, setReminderForm] = useState({
    type: "",
    description: "",
    scheduleType: "single",
    singleDate: "",
    monthlyDay: "1",
    scope: "all",
    specificTenants: [] as string[],
  })

  const [inviteLink] = useState(`https://roommate-app.com/invite/${propertyId}-abc123`)
  const [linkCopied, setLinkCopied] = useState(false)

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && tabBarRef.current) {
        const heroHeight = heroRef.current.offsetHeight
        const scrollY = window.scrollY

        // Sticky tab bar effect
        setIsTabBarSticky(scrollY > heroHeight - 100)

        // Parallax effect for hero image
        const parallaxElement = heroRef.current.querySelector("img")
        if (parallaxElement) {
          const parallaxSpeed = 0.5
          parallaxElement.style.transform = `translateY(${scrollY * parallaxSpeed}px)`
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevImage()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        nextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockProperty.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockProperty.images.length) % mockProperty.images.length)
  }

  const showToastNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleCopyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setLinkCopied(true)
      showToastNotification("Link copied to clipboard!")
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageForm.subject.trim() || !messageForm.message.trim()) return

    console.log("Sending message:", messageForm)
    showToastNotification("Message sent successfully!")
    setMessageForm({ subject: "", message: "" })
    setShowMessageModal(false)
  }

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!broadcastForm.title.trim() || !broadcastForm.message.trim()) return

    console.log("Sending broadcast:", broadcastForm)
    showToastNotification("Broadcast sent to all tenants!")
    setBroadcastForm({ title: "", message: "", showIdentity: false })
    setShowBroadcastModal(false)
  }

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reminderForm.type || !reminderForm.description.trim() || !reminderForm.singleDate) return

    console.log("Creating reminder:", reminderForm)
    showToastNotification("Reminder created successfully!")
    setReminderForm({
      type: "",
      description: "",
      scheduleType: "single",
      singleDate: "",
      monthlyDay: "1",
      scope: "all",
      specificTenants: [],
    })
    setShowReminderModal(false)
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "revenue", label: "Revenue", icon: BarChart3 },
    { id: "reminders", label: "Reminders", icon: Clock },
    { id: "broadcasts", label: "Broadcasts", icon: Megaphone },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div
            className={`space-y-8 transition-all duration-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {/* Analytics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg transition-transform hover:scale-110">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                      <p className="text-xl font-bold">${mockProperty.monthlyRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Occupancy</p>
                      <p className="text-xl font-bold">{mockProperty.occupancyRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Eye className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Views</p>
                      <p className="text-xl font-bold">{mockProperty.totalViews}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Inquiries</p>
                      <p className="text-xl font-bold">{mockProperty.totalInquiries}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Property Description */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Property Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{mockProperty.description}</p>
              </CardContent>
            </Card>

            {/* Key Facts */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Key Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg transition-transform hover:scale-110">
                      <Bed className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockProperty.bedrooms}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                      <Bath className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockProperty.bathrooms}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Square className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockProperty.sqft}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Square Feet</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">${mockProperty.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Rent</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockProperty.amenities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Shield
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
                      >
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg transition-transform hover:scale-110">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Map Preview */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>{mockProperty.address}</span>
                  </div>
                  <div className="relative h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <img
                      src="/placeholder.svg?height=256&width=600"
                      alt="Property location map"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-lg border transition-transform hover:scale-105">
                        <p className="text-sm font-medium">Interactive Map Preview</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Click to view full map</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Public Manager Profile */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Property Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 transition-transform hover:scale-105">
                    <AvatarImage src={mockManager.avatar || "/placeholder.svg"} alt={mockManager.name} />
                    <AvatarFallback className="text-lg">
                      {mockManager.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{mockManager.name}</h3>
                      {mockManager.isVerified && (
                        <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs transition-colors">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{mockManager.role}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{mockManager.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{mockManager.responseTime}</p>
                        <p className="text-xs text-gray-500">Response Time</p>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4 transition-all duration-200 hover:scale-105 active:scale-95"
                      onClick={() => showToastNotification("Opening message to manager...")}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message Manager
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "tenants":
        return (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Current Tenants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyTenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={tenant.avatar || "/placeholder.svg"} alt={tenant.name} />
                        <AvatarFallback>
                          {tenant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{tenant.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {tenant.unit} • ${tenant.rentAmount}/mo
                        </p>
                        <p className="text-xs text-gray-500">
                          Lease: {tenant.leaseStart} - {tenant.leaseEnd}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {tenant.paymentStatus}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedTenant(tenant.id)
                          setShowMessageModal(true)
                        }}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "revenue":
        return (
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Revenue Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-green-600">${mockProperty.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Annual Revenue</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${(mockProperty.monthlyRevenue * 12).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-purple-600">{mockProperty.occupancyRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "reminders":
        return (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Property Reminders
                </CardTitle>
                <Button size="sm" onClick={() => setShowReminderModal(true)}>
                  <Clock className="w-4 h-4 mr-2" />
                  New Reminder
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{reminder.description}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Due: {reminder.dueDate} • {reminder.scope}
                      </p>
                    </div>
                    <Badge variant={reminder.priority === "high" ? "destructive" : "secondary"}>
                      {reminder.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "broadcasts":
        return (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  Property Broadcasts
                </CardTitle>
                <Button size="sm" onClick={() => setShowBroadcastModal(true)}>
                  <Megaphone className="w-4 h-4 mr-2" />
                  New Broadcast
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyBroadcasts.map((broadcast) => (
                  <div key={broadcast.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{broadcast.title}</h4>
                      <Badge variant="outline">{broadcast.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{broadcast.message}</p>
                    <p className="text-xs text-gray-500">
                      Sent to {broadcast.recipients} on {broadcast.sentDate}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div
          ref={heroRef}
          className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
          role="banner"
          aria-label="Property hero image carousel"
        >
          <div className="relative w-full h-full">
            <img
              src={
                mockProperty.images[currentImageIndex] ||
                "/placeholder.svg?height=600&width=1200&query=modern apartment interior" ||
                "/placeholder.svg"
              }
              alt={`${mockProperty.title} - Image ${currentImageIndex + 1} of ${mockProperty.images.length}`}
              className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                prefersReducedMotion ? "" : "hover:scale-105"
              }`}
              style={{ willChange: prefersReducedMotion ? "auto" : "transform" }}
            />

            <div className="hidden md:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 transition-all duration-200 hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px]"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous image</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 transition-all duration-200 hover:scale-110 active:scale-95 min-w-[44px] min-h-[44px]"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next image</TooltipContent>
              </Tooltip>
            </div>

            <div
              className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 md:hidden"
              role="tablist"
              aria-label="Image carousel indicators"
            >
              {mockProperty.images.map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === currentImageIndex}
                  aria-label={`Go to image ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                    index === currentImageIndex ? "bg-white scale-125" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Overlay with Property Info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div
            className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{mockProperty.title}</h1>
                  <p className="text-lg opacity-90 flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5" />
                    {mockProperty.location}
                  </p>
                  <div className="flex items-center gap-4 text-sm opacity-90">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      {mockProperty.bedrooms} bed
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      {mockProperty.bathrooms} bath
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      {mockProperty.sqft} sqft
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold mb-2">${mockProperty.price.toLocaleString()}</div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">
                      {mockProperty.occupancyRate}% Occupied
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-black/20 hover:bg-black/40 text-white border-0 transition-all duration-200 hover:scale-105 active:scale-95 min-w-[44px] min-h-[44px]"
                onClick={() => router.back()}
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" aria-hidden="true" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Go back</TooltipContent>
          </Tooltip>
        </div>

        <div
          ref={tabBarRef}
          className={`bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
            isTabBarSticky ? "fixed top-0 left-0 right-0 z-50 shadow-lg" : "sticky top-0 z-10"
          }`}
          role="navigation"
          aria-label="Property details navigation"
        >
          <div className="max-w-7xl mx-auto">
            {/* Desktop Tab Bar */}
            <div className="hidden md:flex" role="tablist">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`${tab.id}-panel`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 lg:px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden lg:inline">{tab.label}</span>
                    <span className="lg:hidden">{tab.label.split(" ")[0]}</span>
                  </button>
                )
              })}
            </div>

            <div className="md:hidden overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max" role="tablist">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`${tab.id}-panel`}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap min-h-[44px] ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span className="text-xs sm:text-sm">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div
                className="transition-all duration-300 ease-in-out"
                role="tabpanel"
                id={`${activeTab}-panel`}
                aria-labelledby={`${activeTab}-tab`}
              >
                {renderTabContent()}
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-32 space-y-4 xl:space-y-6">
                {/* Quick Actions */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={() => setShowBroadcastModal(true)}
                      className="w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                      aria-label="Send broadcast message to all tenants"
                    >
                      <Megaphone className="w-4 h-4" aria-hidden="true" />
                      Send Broadcast
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setShowInviteModal(true)}
                      className="w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                      aria-label="Generate invite link for new tenants"
                    >
                      <Link2 className="w-4 h-4" aria-hidden="true" />
                      Generate Invite Link
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setShowReminderModal(true)}
                      className="w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                      aria-label="Create new reminder for this property"
                    >
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      Create Reminder
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 bg-transparent"
                      aria-label="Save property to favorites"
                    >
                      <Heart className="w-4 h-4" aria-hidden="true" />
                      Save to Favorites
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 bg-transparent"
                      aria-label="Schedule property viewing"
                    >
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      Schedule Viewing
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-50">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <Button
              onClick={() => setShowBroadcastModal(true)}
              size="sm"
              className="flex items-center gap-2 whitespace-nowrap min-h-[44px] px-4 transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Send broadcast message"
            >
              <Megaphone className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs">Broadcast</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowInviteModal(true)}
              size="sm"
              className="flex items-center gap-2 whitespace-nowrap min-h-[44px] px-4 transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Generate invite link"
            >
              <UserPlus className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs">Invite</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowReminderModal(true)}
              size="sm"
              className="flex items-center gap-2 whitespace-nowrap min-h-[44px] px-4 transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Create reminder"
            >
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs">Reminder</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 whitespace-nowrap min-h-[44px] px-4 transition-all duration-200 hover:scale-105 active:scale-95 bg-transparent"
              aria-label="Save to favorites"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs">Save</span>
            </Button>
          </div>
        </div>

        <div className="md:hidden h-20" />

        {showToast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2 duration-300">
            {toastMessage}
          </div>
        )}

        {/* Enhanced Modals with better animations */}
        <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
          <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-200">
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>
                Send a personal message to {propertyTenants.find((t) => t.id === selectedTenant)?.name}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message-subject">Subject *</Label>
                <Input
                  id="message-subject"
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                  placeholder="Enter message subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message-content">Message *</Label>
                <Textarea
                  id="message-content"
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  placeholder="Enter your message"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowMessageModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showBroadcastModal} onOpenChange={setShowBroadcastModal}>
          <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-200">
            <DialogHeader>
              <DialogTitle>Send Broadcast</DialogTitle>
              <DialogDescription>Send a message to all tenants of this property</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleBroadcastSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="broadcast-title">Title *</Label>
                <Input
                  id="broadcast-title"
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  placeholder="Enter broadcast title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="broadcast-message">Message *</Label>
                <Textarea
                  id="broadcast-message"
                  value={broadcastForm.message}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                  placeholder="Enter your message"
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-identity"
                  checked={broadcastForm.showIdentity}
                  onCheckedChange={(checked) =>
                    setBroadcastForm({ ...broadcastForm, showIdentity: checked as boolean })
                  }
                />
                <Label htmlFor="show-identity" className="text-sm">
                  Show my identity publicly
                </Label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowBroadcastModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Send Broadcast
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-200">
            <DialogHeader>
              <DialogTitle>Generate Invite Link</DialogTitle>
              <DialogDescription>Share this link with potential tenants for this property</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Invite Link</Label>
                <div className="flex items-center gap-2">
                  <Input value={inviteLink} readOnly className="flex-1 bg-gray-50 dark:bg-gray-800" />
                  <Button size="sm" onClick={handleCopyInviteLink} className="shrink-0">
                    {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setShowInviteModal(false)}>Done</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showReminderModal} onOpenChange={setShowReminderModal}>
          <DialogContent className="sm:max-w-lg animate-in fade-in-0 zoom-in-95 duration-200">
            <DialogHeader>
              <DialogTitle>Create Reminder</DialogTitle>
              <DialogDescription>Set up a reminder for this property</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleReminderSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reminder-type">Type *</Label>
                  <Select
                    value={reminderForm.type}
                    onValueChange={(value) => setReminderForm({ ...reminderForm, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminder-date">Date *</Label>
                  <Input
                    type="date"
                    value={reminderForm.singleDate}
                    onChange={(e) => setReminderForm({ ...reminderForm, singleDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-description">Description *</Label>
                <Input
                  id="reminder-description"
                  value={reminderForm.description}
                  onChange={(e) => setReminderForm({ ...reminderForm, description: e.target.value })}
                  placeholder="Enter reminder description"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowReminderModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Clock className="w-4 h-4 mr-2" />
                  Create Reminder
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
