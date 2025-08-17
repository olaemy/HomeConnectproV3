"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Star,
  Building,
  Calendar,
  Award,
  MessageCircle,
  ExternalLink,
  BedDouble,
  Bath,
  Square,
  Heart,
  Grid,
  List,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportUserDialog } from "@/components/safety/report-user-dialog"
import { useMediaQuery } from "@/hooks/use-media-query"

interface AgentProfile {
  id: string
  name: string
  avatar: string
  verified: boolean
  agency: string
  licenseNumber: string
  phone: string
  website?: string
  bio: string
  specialties: string[]
  serviceAreas: string[]
  languages: string[]
  experience: string
  rating: number
  totalReviews: number
  totalListings: number
  joinedDate: string
  achievements: string[]
}

interface AgentListing {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  available: string
  status: "available" | "pending" | "rented"
  postedDate: string
  liked: boolean
}

// Mock agent data
const mockAgentProfiles: { [key: string]: AgentProfile } = {
  "maria-santos": {
    id: "agent-1",
    name: "Maria Santos",
    avatar: "/placeholder.svg?height=150&width=150",
    verified: true,
    agency: "Sunshine Properties",
    licenseNumber: "DRE #01234567",
    phone: "(415) 555-0123",
    website: "www.sunshineproperties.com",
    bio: "With over 8 years of experience in San Francisco real estate, I specialize in helping clients find their perfect home in the city's most desirable neighborhoods. My commitment to exceptional service and deep market knowledge has earned me recognition as a top-performing agent.",
    specialties: ["Luxury Rentals", "First-Time Renters", "Corporate Relocations", "Investment Properties"],
    serviceAreas: ["Mission District", "SOMA", "Castro", "Noe Valley", "Hayes Valley"],
    languages: ["English", "Spanish", "Portuguese"],
    experience: "8+ years",
    rating: 4.8,
    totalReviews: 127,
    totalListings: 45,
    joinedDate: "January 2016",
    achievements: ["Top Agent 2023", "Client Choice Award", "Excellence in Service"],
  },
  "john-chen": {
    id: "agent-2",
    name: "John Chen",
    avatar: "/placeholder.svg?height=150&width=150",
    verified: true,
    agency: "Luxury Living SF",
    licenseNumber: "DRE #07654321",
    phone: "(415) 555-0456",
    website: "www.luxurylivingsf.com",
    bio: "Luxury real estate specialist with a passion for matching discerning clients with exceptional properties. I focus on high-end rentals and sales in San Francisco's premier locations, providing white-glove service throughout the entire process.",
    specialties: ["Luxury Properties", "High-Rise Condos", "Executive Rentals", "International Clients"],
    serviceAreas: ["SOMA", "Financial District", "Russian Hill", "Pacific Heights", "Marina"],
    languages: ["English", "Mandarin", "Cantonese"],
    experience: "6+ years",
    rating: 4.9,
    totalReviews: 89,
    totalListings: 32,
    joinedDate: "March 2018",
    achievements: ["Luxury Specialist", "Top Producer", "5-Star Service Award"],
  },
}

const mockAgentListings: { [key: string]: AgentListing[] } = {
  "maria-santos": [
    {
      id: "1",
      title: "Modern 2BR in Mission District",
      price: 3200,
      location: "Mission District, SF",
      bedrooms: 2,
      bathrooms: 1,
      sqft: 900,
      images: ["/placeholder.svg?height=300&width=400"],
      available: "March 15, 2024",
      status: "available",
      postedDate: "2024-02-01",
      liked: false,
    },
    {
      id: "5",
      title: "Stylish 1BR Loft in SOMA",
      price: 2900,
      location: "SOMA, SF",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 750,
      images: ["/placeholder.svg?height=300&width=400"],
      available: "April 1, 2024",
      status: "pending",
      postedDate: "2024-01-15",
      liked: false,
    },
    {
      id: "6",
      title: "Cozy Studio in Castro",
      price: 2400,
      location: "Castro District, SF",
      bedrooms: 0,
      bathrooms: 1,
      sqft: 500,
      images: ["/placeholder.svg?height=300&width=400"],
      available: "March 1, 2024",
      status: "rented",
      postedDate: "2024-01-01",
      liked: false,
    },
  ],
  "john-chen": [
    {
      id: "2",
      title: "Luxury Studio in SOMA",
      price: 2800,
      location: "SOMA, SF",
      bedrooms: 0,
      bathrooms: 1,
      sqft: 650,
      images: ["/placeholder.svg?height=300&width=400"],
      available: "April 1, 2024",
      status: "available",
      postedDate: "2024-02-10",
      liked: true,
    },
    {
      id: "7",
      title: "Penthouse 2BR with Views",
      price: 4500,
      location: "Financial District, SF",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      images: ["/placeholder.svg?height=300&width=400"],
      available: "May 1, 2024",
      status: "available",
      postedDate: "2024-02-05",
      liked: false,
    },
  ],
}

const mockReviews = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    date: "February 2024",
    comment:
      "Maria was absolutely fantastic! She helped me find the perfect apartment and made the entire process smooth and stress-free. Highly recommend!",
  },
  {
    id: "2",
    author: "David Kim",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    date: "January 2024",
    comment:
      "Professional, responsive, and knowledgeable. Maria went above and beyond to ensure I found exactly what I was looking for.",
  },
  {
    id: "3",
    author: "Emily Chen",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4,
    date: "December 2023",
    comment:
      "Great experience working with Maria. She was very patient and helped me understand the rental market in SF.",
  },
]

export default function AgentProfilePage() {
  const router = useRouter()
  const params = useParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState<"all" | "available" | "pending" | "rented">("all")
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const agentName = params.name as string
  const agent = mockAgentProfiles[agentName]
  const listings = mockAgentListings[agentName] || []

  useEffect(() => {
    if (!agent) {
      router.push("/discover")
    }
  }, [agent, router])

  if (!agent) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Agent profile not found</p>
      </div>
    )
  }

  const filteredListings = listings.filter((listing) => {
    if (filterStatus === "all") return true
    return listing.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "rented":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleListingClick = (listingId: string) => {
    router.push(`/apartment/${listingId}`)
  }

  const handleStartChat = () => {
    router.push(`/chats?agent=${agent.name}`)
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <ReportUserDialog userId={agent.id} userName={agent.name} variant="compact" />
            <Button variant="ghost" size="sm">
              <ExternalLink size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={agent.avatar || "/placeholder.svg"}
                alt={agent.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <Badge className="bg-blue-500 text-white font-semibold px-3 py-1 mb-2">✓ Verified Agent</Badge>
              <div className="flex items-center mb-2">
                <Star size={16} className="text-yellow-500 fill-current mr-1" />
                <span className="font-semibold">{agent.rating}</span>
                <span className="text-gray-500 ml-1">({agent.totalReviews} reviews)</span>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <Building size={18} className="mr-2" />
                <span className="font-medium">{agent.agency}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <Award size={16} className="mr-2" />
                <span className="text-sm">{agent.licenseNumber}</span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{agent.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{agent.totalListings}</div>
                  <div className="text-sm text-gray-500">Active Listings</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{agent.experience}</div>
                  <div className="text-sm text-gray-500">Experience</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{agent.totalReviews}</div>
                  <div className="text-sm text-gray-500">Reviews</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleStartChat}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <Phone size={18} className="mr-2" />
                  Call
                </Button>
                <ReportUserDialog userId={agent.id} userName={agent.name} variant="compact" />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="listings">Listings ({filteredListings.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({agent.totalReviews})</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              <TabsContent value="listings" className="space-y-4">
                {/* Listings Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={filterStatus === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterStatus === "available" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("available")}
                    >
                      Available
                    </Button>
                    <Button
                      variant={filterStatus === "pending" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={filterStatus === "rented" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus("rented")}
                    >
                      Rented
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid size={16} />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List size={16} />
                    </Button>
                  </div>
                </div>

                {/* Listings Grid/List */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredListings.map((listing) => (
                      <Card
                        key={listing.id}
                        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleListingClick(listing.id)}
                      >
                        <div className="relative h-48">
                          <img
                            src={listing.images[0] || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className={`${getStatusColor(listing.status)} text-white text-xs px-2 py-1`}>
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="sm" className="p-1 bg-white/90 rounded-full">
                              <Heart size={16} className={listing.liked ? "text-red-500 fill-current" : ""} />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <Badge className="bg-green-500 text-white font-bold px-2 py-1">
                              ${listing.price.toLocaleString()}/mo
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{listing.title}</h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                            <MapPin size={14} className="mr-1" />
                            <span className="text-sm">{listing.location}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <BedDouble size={14} className="mr-1 text-blue-500" />
                              <span>{listing.bedrooms || "Studio"}</span>
                            </div>
                            <div className="flex items-center">
                              <Bath size={14} className="mr-1 text-green-500" />
                              <span>{listing.bathrooms}</span>
                            </div>
                            <div className="flex items-center">
                              <Square size={14} className="mr-1 text-purple-500" />
                              <span>{listing.sqft} sqft</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredListings.map((listing) => (
                      <Card
                        key={listing.id}
                        className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleListingClick(listing.id)}
                      >
                        <div className="flex gap-4">
                          <img
                            src={listing.images[0] || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{listing.title}</h3>
                              <Badge className={`${getStatusColor(listing.status)} text-white text-xs px-2 py-1`}>
                                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                              <MapPin size={14} className="mr-1" />
                              <span className="text-sm">{listing.location}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center">
                                  <BedDouble size={14} className="mr-1 text-blue-500" />
                                  <span>{listing.bedrooms || "Studio"}</span>
                                </div>
                                <div className="flex items-center">
                                  <Bath size={14} className="mr-1 text-green-500" />
                                  <span>{listing.bathrooms}</span>
                                </div>
                                <div className="flex items-center">
                                  <Square size={14} className="mr-1 text-purple-500" />
                                  <span>{listing.sqft} sqft</span>
                                </div>
                              </div>
                              <span className="font-bold text-green-600">${listing.price.toLocaleString()}/mo</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {filteredListings.length === 0 && (
                  <div className="text-center py-12">
                    <Building size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No listings found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {filterStatus === "all"
                        ? "This agent hasn't posted any listings yet."
                        : `No ${filterStatus} listings found.`}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{review.author}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Service Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.serviceAreas.map((area, index) => (
                      <Badge
                        key={index}
                        className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-3 py-1"
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Achievements</h3>
                  <div className="space-y-2">
                    {agent.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center">
                        <Award size={16} className="mr-2 text-yellow-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone size={16} className="mr-3 text-blue-500" />
                  <span className="text-sm">{agent.phone}</span>
                </div>
                {agent.website && (
                  <div className="flex items-center">
                    <ExternalLink size={16} className="mr-3 text-purple-500" />
                    <span className="text-sm">{agent.website}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar size={16} className="mr-3 text-orange-500" />
                  <span className="text-sm">Joined {agent.joinedDate}</span>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Listings</span>
                  <span className="font-semibold">{agent.totalListings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Available Now</span>
                  <span className="font-semibold">{listings.filter((l) => l.status === "available").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="font-semibold">{agent.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Experience</span>
                  <span className="font-semibold">{agent.experience}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
