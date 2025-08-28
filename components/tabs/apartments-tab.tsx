"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Calendar,
  Building,
  Filter,
  Search,
  SlidersHorizontal,
  MessageCircle,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ReportUserDialog } from "@/components/safety/report-user-dialog"
import { SafeModeToggle } from "@/components/safety/safe-mode-toggle"
import { SafetySystem } from "@/lib/safety-system"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useSafeMode } from "@/contexts/safe-mode"

interface Agent {
  name: string
  avatar: string
  verified: boolean
  rating: number
  totalReviews: number
}

interface RegularUser {
  name: string
  avatar: string
  verified: boolean
  verificationLevel: "unverified" | "basic" | "verified" | "premium"
  memberSince: string
  bio: string
}

interface Manager {
  id: string
  name: string
  avatar: string
  verified: boolean
  isAgent: boolean
}

// Dummy manager mapping based on manager_id
const dummyManagers: Record<string, Manager> = {
  "mgr-1": {
    id: "mgr-1",
    name: "Maria Santos-Rodriguez",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    isAgent: true,
  },
  "mgr-2": {
    id: "mgr-2",
    name: "Jonathan Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    isAgent: true,
  },
  "mgr-3": {
    id: "mgr-3",
    name: "Alexander Rodriguez-Kim",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    isAgent: false, // Self-managing owner
  },
  "mgr-4": {
    id: "mgr-4",
    name: "Sarah Kim-Williams",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: false,
    isAgent: false, // Self-managing owner
  },
}

interface Apartment {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  amenities: string[]
  available: string
  description: string
  postedBy: "agent" | "user"
  agent?: Agent
  user?: RegularUser
  manager_id: string
  owner_id?: string
  liked: boolean
  featured?: boolean
}

const mockApartments: Apartment[] = [
  {
    id: "1",
    title: "Modern 2BR in Mission District",
    price: 3200,
    location: "Mission District, SF",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    amenities: ["In-unit Laundry", "Parking", "Pet Friendly", "Gym"],
    available: "March 15, 2024",
    description: "Beautiful modern apartment with hardwood floors and stainless steel appliances.",
    postedBy: "agent",
    agent: {
      name: "Maria Santos-Rodriguez",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      rating: 4.8,
      totalReviews: 127,
    },
    manager_id: "mgr-1",
    liked: false,
    featured: true,
  },
  {
    id: "2",
    title: "Luxury Studio in SOMA",
    price: 2800,
    location: "SOMA, SF",
    bedrooms: 0,
    bathrooms: 1,
    sqft: 650,
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    amenities: ["Concierge", "Rooftop Deck", "Gym", "Pool"],
    available: "April 1, 2024",
    description: "Stunning luxury studio with city views and premium finishes.",
    postedBy: "agent",
    agent: {
      name: "Jonathan Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      rating: 4.9,
      totalReviews: 89,
    },
    manager_id: "mgr-2",
    liked: false,
  },
  {
    id: "3",
    title: "Charming 1BR in Castro",
    price: 2600,
    location: "Castro District, SF",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 750,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    amenities: ["Hardwood Floors", "Bay Windows", "Garden Access"],
    available: "March 30, 2024",
    description: "Cozy apartment with character in vibrant Castro District.",
    postedBy: "user",
    user: {
      name: "Alexander Rodriguez-Kim",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
      verificationLevel: "verified",
      memberSince: "January 2023",
      bio: "Software engineer looking to sublet while traveling for work.",
    },
    manager_id: "mgr-3",
    owner_id: "mgr-3",
    liked: false,
  },
  {
    id: "4",
    title: "Spacious 2BR in Noe Valley",
    price: 3400,
    location: "Noe Valley, SF",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    amenities: ["Private Patio", "In-unit Laundry", "Fireplace"],
    available: "April 15, 2024",
    description: "Beautiful apartment with private patio in quiet neighborhood.",
    postedBy: "user",
    user: {
      name: "Sarah Kim-Williams",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: false,
      verificationLevel: "basic",
      memberSince: "March 2023",
      bio: "Moving to New York, looking for responsible tenants.",
    },
    manager_id: "mgr-4",
    owner_id: "mgr-4",
    liked: false,
  },
]

export function ApartmentsTab() {
  const router = useRouter()
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { safeMode } = useSafeMode()
  const [showFilters, setShowFilters] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const getManagerInfo = (managerId: string) => {
    return (
      dummyManagers[managerId] || {
        id: managerId,
        name: "Property Manager",
        avatar: "/placeholder.svg?height=60&width=60",
        verified: false,
        isAgent: true,
      }
    )
  }

  useEffect(() => {
    const filtered = mockApartments.filter((apartment) => {
      // Search filter
      const matchesSearch =
        apartment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apartment.location.toLowerCase().includes(searchQuery.toLowerCase())

      if (!matchesSearch) return false

      const manager = getManagerInfo(apartment.manager_id)
      const ok = SafetySystem.isUserSafe(manager.name || apartment.id, { safeMode, minScore: 50 })
      return ok
    })

    setApartments(filtered)
  }, [searchQuery, safeMode])

  const handleLike = (apartmentId: string) => {
    setApartments((prev) => prev.map((apt) => (apt.id === apartmentId ? { ...apt, liked: !apt.liked } : apt)))
  }

  const handleApartmentClick = (apartmentId: string) => {
    router.push(`/apartment/${apartmentId}`)
  }

  const handleContactManager = (managerId: string, contactType: "chat" | "call") => {
    const manager = getManagerInfo(managerId)
    // Navigate to manager's profile page
    if (manager.isAgent) {
      router.push(`/agent-profile/${manager.name.toLowerCase().replace(/\s+/g, "-")}`)
    } else {
      router.push(`/user-profile/${manager.name.toLowerCase().replace(/\s+/g, "-")}`)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/20">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search apartments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-0"
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="bg-transparent">
              <SlidersHorizontal size={16} />
            </Button>
          </div>

          <SafeModeToggle enabled={safeMode} />

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pt-2 border-t border-gray-200/20"
            >
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Filter size={14} className="mr-1" />
                  Price Range
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Bedrooms
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Amenities
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Available Date
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {apartments.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Building size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">No apartments found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchQuery ? "Try adjusting your search terms" : "Check back later for new listings!"}
              </p>
              {safeMode && (
                <Button onClick={() => router.push("/settings")} variant="outline">
                  Turn off Safe Mode
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className={`grid gap-6 ${isDesktop ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
            <AnimatePresence>
              {apartments.map((apartment) => {
                const manager = getManagerInfo(apartment.manager_id)

                return (
                  <motion.div
                    key={apartment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                  >
                    <Card className="overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                      <div className="relative" onClick={() => handleApartmentClick(apartment.id)}>
                        <img
                          src={apartment.images[0] || "/placeholder.svg"}
                          alt={apartment.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Featured Badge */}
                        {apartment.featured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-yellow-500 text-white font-semibold px-2 py-1">⭐ Featured</Badge>
                          </div>
                        )}

                        {/* Report Button */}
                        <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
                          <ReportUserDialog
                            userId={manager.id}
                            userName={manager.name}
                            variant="icon-only"
                            icon="dots"
                          />
                        </div>

                        {/* Posted By Badge - Always show as Property Manager */}
                        <div className="absolute bottom-3 left-3">
                          {manager.verified && (
                            <Badge className="bg-blue-500 text-white font-semibold px-2 py-1">
                              <Building size={12} className="mr-1" />✓ Verified Property Manager
                            </Badge>
                          )}
                          {!manager.verified && (
                            <Badge className="bg-gray-500 text-white font-semibold px-2 py-1">
                              <Building size={12} className="mr-1" />
                              Property Manager
                            </Badge>
                          )}
                        </div>

                        {/* Like Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleLike(apartment.id)
                          }}
                          className="absolute bottom-3 right-3 p-2 bg-black/20 hover:bg-black/30 rounded-full transition-colors"
                        >
                          <Heart
                            size={18}
                            className={`${apartment.liked ? "fill-current text-red-500" : "text-white"}`}
                          />
                        </button>

                        {/* Price Badge */}
                        <div className="absolute top-3 right-12">
                          <Badge className="bg-green-500 text-white font-bold text-lg px-3 py-1">
                            ${apartment.price.toLocaleString()}/mo
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4" onClick={() => handleApartmentClick(apartment.id)}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg line-clamp-1">{apartment.title}</h3>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                          <MapPin size={14} className="mr-1 flex-shrink-0" />
                          <span className="text-sm line-clamp-1">{apartment.location}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <BedDouble size={14} className="mr-1 text-blue-500" />
                              <span>{apartment.bedrooms || "Studio"}</span>
                            </div>
                            <div className="flex items-center">
                              <Bath size={14} className="mr-1 text-green-500" />
                              <span>{apartment.bathrooms}</span>
                            </div>
                            <div className="flex items-center">
                              <Square size={14} className="mr-1 text-purple-500" />
                              <span>{apartment.sqft} sqft</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                          {apartment.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span>Available {apartment.available}</span>
                          </div>

                          {/* Manager Info - Always show manager, never owner */}
                          <div className="flex items-center space-x-2">
                            <img
                              src={manager.avatar || "/placeholder.svg"}
                              alt="Property Manager"
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-xs text-gray-500">{manager.name}</span>
                          </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200/20">
                          {/* Manager Info - Always show manager, never owner */}
                          <div className="flex items-center space-x-2">
                            <img
                              src={manager.avatar || "/placeholder.svg"}
                              alt="Property Manager"
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <div className="text-sm font-medium">{manager.name}</div>
                              <div className="text-xs text-gray-500">Property Manager</div>
                            </div>
                          </div>

                          {/* Contact Buttons */}
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleContactManager(apartment.manager_id, "chat")
                              }}
                              className="text-xs px-3 py-1"
                            >
                              <MessageCircle size={14} className="mr-1" />
                              Chat
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleContactManager(apartment.manager_id, "call")
                              }}
                              className="text-xs px-3 py-1"
                            >
                              <Phone size={14} className="mr-1" />
                              Call
                            </Button>
                          </div>
                        </div>

                        {/* Amenities Preview */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {apartment.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                              {amenity}
                            </Badge>
                          ))}
                          {apartment.amenities.length > 3 && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              +{apartment.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
