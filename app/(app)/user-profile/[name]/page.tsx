"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  MessageCircle,
  Calendar,
  User,
  BedDouble,
  Bath,
  Square,
  Heart,
  Grid,
  List,
  Shield,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerificationBadge } from "@/components/safety/verification-badge"
import { ReportUserDialog } from "@/components/safety/report-user-dialog"
import { useMediaQuery } from "@/hooks/use-media-query"

interface UserProfile {
  id: string
  name: string
  avatar: string
  verified: boolean
  verificationLevel: "unverified" | "basic" | "verified" | "premium"
  bio: string
  location: string
  joinedDate: string
  totalListings: number
  interests: string[]
  preferences: {
    petFriendly: boolean
    smoking: boolean
    cleanliness: string
    lifestyle: string
  }
}

interface UserListing {
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
  type: "sublet" | "lease-transfer" | "roommate-wanted"
}

// Mock user data
const mockUserProfiles: { [key: string]: UserProfile } = {
  "alex-rodriguez": {
    id: "user-1",
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=150&width=150",
    verified: true,
    verificationLevel: "verified",
    bio: "Software engineer working remotely. I'm clean, responsible, and respectful of shared spaces. Looking to sublet my apartment while I travel for work. I believe in clear communication and maintaining a positive living environment.",
    location: "Castro District, SF",
    joinedDate: "January 2023",
    totalListings: 3,
    interests: ["Technology", "Travel", "Photography", "Cooking", "Hiking"],
    preferences: {
      petFriendly: true,
      smoking: false,
      cleanliness: "Very Clean",
      lifestyle: "Quiet Professional",
    },
  },
  "sarah-kim": {
    id: "user-2",
    name: "Sarah Kim",
    avatar: "/placeholder.svg?height=150&width=150",
    verified: false,
    verificationLevel: "basic",
    bio: "Marketing professional relocating to New York for a new opportunity. I've been a responsible tenant for 3 years and am looking for someone to take over my lease. The apartment has been well-maintained and I'm happy to help with the transition.",
    location: "Noe Valley, SF",
    joinedDate: "March 2023",
    totalListings: 1,
    interests: ["Marketing", "Yoga", "Coffee", "Art", "Reading"],
    preferences: {
      petFriendly: false,
      smoking: false,
      cleanliness: "Clean",
      lifestyle: "Social Professional",
    },
  },
}

const mockUserListings: { [key: string]: UserListing[] } = {
  "alex-rodriguez": [
    {
      id: "3",
      title: "Charming 1BR in Castro",
      price: 2600,
      location: "Castro District, SF",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 750,
      images: ["/placeholder.svg?height=300&width=400"],
      available: "March 30, 2024",
      status: "available",
      postedDate: "2024-02-15",
      liked: false,
      type: "sublet",
    },
    {
      id: "8",
      title: "Cozy Studio Sublet",
      price: 2200,
      location: "Castro District, SF",
      bedrooms: 0,
      bathrooms: 1,
      sqft: 500,
      images: ["/placeholder.svg?height=300&width=400"],
      available: "April 15, 2024",
      status: "pending",
      postedDate: "2024-01-20",
      liked: false,
      type: "sublet",
    },
    {
      id: "9",
      title: "Looking for Roommate",
      price: 1300,
      location: "Castro District, SF",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 400,
      images: ["/placeholder.svg?height=300&width=400"],
      available: "May 1, 2024",
      status: "available",
      postedDate: "2024-02-01",
      liked: false,
      type: "roommate-wanted",
    },
  ],
  "sarah-kim": [
    {
      id: "4",
      title: "Spacious 2BR in Noe Valley",
      price: 3400,
      location: "Noe Valley, SF",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      images: ["/placeholder.svg?height=300&width=400"],
      available: "April 15, 2024",
      status: "available",
      postedDate: "2024-02-10",
      liked: false,
      type: "lease-transfer",
    },
  ],
}

const mockUserReviews = [
  {
    id: "1",
    author: "Michael Chen",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    date: "January 2024",
    comment:
      "Alex was a great landlord! Very responsive and the apartment was exactly as described. Smooth transition and would definitely recommend.",
    type: "tenant",
  },
  {
    id: "2",
    author: "Lisa Park",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4,
    date: "December 2023",
    comment:
      "Had a good experience renting from Alex. Professional communication and the place was clean and well-maintained.",
    type: "tenant",
  },
]

export default function UserProfilePage() {
  const router = useRouter()
  const params = useParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState<"all" | "available" | "pending" | "rented">("all")
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const userName = params.name as string
  const user = mockUserProfiles[userName]
  const listings = mockUserListings[userName] || []

  useEffect(() => {
    if (!user) {
      router.push("/discover")
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>User profile not found</p>
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "sublet":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "lease-transfer":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      case "roommate-wanted":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "sublet":
        return "Sublet"
      case "lease-transfer":
        return "Lease Transfer"
      case "roommate-wanted":
        return "Roommate Wanted"
      default:
        return type
    }
  }

  const handleListingClick = (listingId: string) => {
    router.push(`/apartment/${listingId}`)
  }

  const handleStartChat = () => {
    router.push(`/chats?user=${user.name}`)
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
            <ReportUserDialog userId={user.id} userName={user.name} variant="compact" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              {user.verified && (
                <VerificationBadge verificationLevel={user.verificationLevel} trustScore={0} size="md" />
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <MapPin size={18} className="mr-2" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm">Member since {user.joinedDate}</span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{user.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{user.totalListings}</div>
                  <div className="text-sm text-gray-500">Total Listings</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{user.verified ? "Verified" : "Unverified"}</div>
                  <div className="text-sm text-gray-500">Status</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{mockUserReviews.length}</div>
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
                <ReportUserDialog userId={user.id} userName={user.name} variant="compact" />
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
                <TabsTrigger value="reviews">Reviews ({mockUserReviews.length})</TabsTrigger>
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
                          <div className="absolute top-2 left-2 flex space-x-2">
                            <Badge className={`${getStatusColor(listing.status)} text-white text-xs px-2 py-1`}>
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </Badge>
                            <Badge className={`${getTypeColor(listing.type)} text-xs px-2 py-1`}>
                              {getTypeLabel(listing.type)}
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
                              <div className="flex space-x-2">
                                <Badge className={`${getStatusColor(listing.status)} text-white text-xs px-2 py-1`}>
                                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                </Badge>
                                <Badge className={`${getTypeColor(listing.type)} text-xs px-2 py-1`}>
                                  {getTypeLabel(listing.type)}
                                </Badge>
                              </div>
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
                    <User size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No listings found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {filterStatus === "all"
                        ? "This user hasn't posted any listings yet."
                        : `No ${filterStatus} listings found.`}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {mockUserReviews.map((review) => (
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
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {review.type === "tenant" ? "Former Tenant" : "Roommate"}
                            </Badge>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
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

                {mockUserReviews.length === 0 && (
                  <div className="text-center py-12">
                    <Star size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      This user hasn't received any reviews from tenants or roommates yet.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Living Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Cleanliness</span>
                      <p className="font-medium">{user.preferences.cleanliness}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Lifestyle</span>
                      <p className="font-medium">{user.preferences.lifestyle}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Pet Friendly</span>
                      <p className="font-medium">{user.preferences.petFriendly ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Smoking</span>
                      <p className="font-medium">{user.preferences.smoking ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </Card>

                {user.verified && (
                  <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <div className="flex items-center mb-3">
                      <Shield size={20} className="mr-2 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Verified User</h3>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      This user has completed identity verification. They are committed to maintaining a safe and
                      trustworthy community.
                    </p>
                  </Card>
                )}
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
                  <Calendar size={16} className="mr-3 text-orange-500" />
                  <span className="text-sm">Joined {user.joinedDate}</span>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Listings</span>
                  <span className="font-semibold">{user.totalListings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Available Now</span>
                  <span className="font-semibold">{listings.filter((l) => l.status === "available").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Reviews</span>
                  <span className="font-semibold">{mockUserReviews.length}</span>
                </div>
              </div>
            </Card>

            {/* Safety Notice */}
            <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-3">
                <Shield size={20} className="mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Safety First</h3>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Always meet in person before making any payments. Verify the property and the person's identity. Report
                any suspicious activity to our support team.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
