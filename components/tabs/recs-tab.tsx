"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, MapPin, Calendar, Star, Filter, Wifi, Dumbbell, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { VerificationBadge } from "@/components/safety/verification-badge"
import type { JSX } from "react/jsx-runtime"

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
    name: "Sarah Lee",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    isAgent: true,
  },
}

interface Recommendation {
  id: string
  type: "roommate" | "apartment"
  name: string
  age?: number
  location: string
  image: string
  price?: number
  budget?: [number, number]
  compatibility?: number
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  moveInDate: string
  description: string
  liked: boolean
  matched: boolean
  manager_id?: string
  owner_id?: string
  amenities?: string[]
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    type: "roommate",
    name: "Jessica Park",
    age: 26,
    location: "Noe Valley, SF",
    image: "/placeholder.svg?height=300&width=400",
    budget: [1400, 1800],
    compatibility: 92,
    moveInDate: "April 2024",
    description:
      "Marketing professional who loves cooking and weekend hikes. Looking for a clean, respectful roommate.",
    liked: true,
    matched: false,
  },
  {
    id: "2",
    type: "apartment",
    name: "Sunny 1BR in Hayes Valley",
    location: "Hayes Valley, SF",
    image: "/placeholder.svg?height=300&width=400",
    price: 2900,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    moveInDate: "March 2024",
    description: "Beautiful apartment with lots of natural light, hardwood floors, and modern amenities.",
    liked: false,
    matched: true,
    manager_id: "mgr-1",
    amenities: ["Wifi", "Gym", "Parking"],
  },
  {
    id: "3",
    type: "roommate",
    name: "Michael Torres",
    age: 29,
    location: "Richmond District, SF",
    image: "/placeholder.svg?height=300&width=400",
    budget: [1200, 1600],
    compatibility: 88,
    moveInDate: "May 2024",
    description: "Software developer who enjoys gaming, music, and exploring new restaurants in the city.",
    liked: false,
    matched: false,
  },
]

export function RecsTab() {
  const [recommendations, setRecommendations] = useState(mockRecommendations)
  const [filter, setFilter] = useState<"all" | "roommates" | "apartments">("all")

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

  const toggleLike = (id: string) => {
    setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, liked: !rec.liked } : rec)))
  }

  const filteredRecommendations = recommendations.filter((rec) => {
    if (filter === "all") return true
    if (filter === "roommates") return rec.type === "roommate"
    if (filter === "apartments") return rec.type === "apartment"
    return true
  })

  const amenityIcons: Record<string, JSX.Element> = {
    Wifi: <Wifi size={14} />,
    Gym: <Dumbbell size={14} />,
    Parking: <Car size={14} />,
  }

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Recommendations</h2>
          <Button variant="ghost" size="sm">
            <Filter size={20} />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
          {[
            { id: "all", label: "All" },
            { id: "roommates", label: "Roommates" },
            { id: "apartments", label: "Apartments" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === tab.id
                  ? "bg-white dark:bg-gray-700 shadow-md text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredRecommendations.map((rec) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
              <div className="relative">
                {/* Image */}
                <div className="h-48 relative">
                  <img src={rec.image || "/placeholder.svg"} alt={rec.name} className="w-full h-full object-cover" />

                  {/* Type badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={`${rec.type === "roommate" ? "bg-purple-500 text-white" : "bg-blue-500 text-white"}`}
                    >
                      {rec.type === "roommate" ? "Roommate" : "Apartment"}
                    </Badge>
                  </div>

                  {/* Status badges */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    {rec.matched && <Badge className="bg-green-500 text-white">✓ Matched</Badge>}
                    {rec.compatibility && rec.type === "roommate" && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star size={12} className="mr-1" />
                        {rec.compatibility}%
                      </Badge>
                    )}
                  </div>

                  {/* Price/Budget overlay */}
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-black/70 text-white font-bold">
                      {rec.price ? `$${rec.price.toLocaleString()}/mo` : `$${rec.budget?.[0]}-${rec.budget?.[1]}`}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Title & Location */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">
                        {rec.name}
                        {rec.age && `, ${rec.age}`}
                      </h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={14} className="mr-1" />
                        <span className="text-sm">{rec.location}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(rec.id)}
                      className="p-2"
                    >
                      <Heart size={20} className={rec.liked ? "text-red-500 fill-current" : "text-gray-400"} />
                    </motion.button>
                  </div>

                  {/* Apartment-specific manager + amenities */}
                  {rec.type === "apartment" && rec.manager_id && (
                    <>
                      {(() => {
                        const manager = getManagerInfo(rec.manager_id)
                        return (
                          <div className="flex items-center gap-3">
                            <img
                              src={manager.avatar || "/placeholder.svg"}
                              alt={manager.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="font-medium">{manager.name}</span>
                            {manager.verified && <VerificationBadge />}
                            <Badge className="bg-indigo-500 text-white">Property Manager</Badge>
                          </div>
                        )
                      })()}

                      {rec.amenities && rec.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {rec.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                              {amenityIcons[amenity] || <MapPin size={14} />}
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{rec.bedrooms} bed</span>
                        <span>{rec.bathrooms} bath</span>
                        <span>{rec.sqft} sqft</span>
                      </div>
                    </>
                  )}

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{rec.description}</p>

                  {/* Availability & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>Available {rec.moveInDate}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle size={16} className="mr-1" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No recommendations yet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your profile to get personalized recommendations!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
