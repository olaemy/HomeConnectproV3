"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MapPin, X, ChevronLeft, ChevronRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VerificationBadge } from "@/components/safety/verification-badge"
import { ReportUserDialog } from "@/components/safety/report-user-dialog"
import { SafeModeToggle } from "@/components/safety/safe-mode-toggle"
import { CompatibilityDisplay } from "@/components/matching/compatibility-display"
import { MatchingAlgorithm } from "@/lib/matching-algorithm"
import { SafetySystem } from "@/lib/safety-system"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useSafeMode } from "@/contexts/safe-mode"

interface Roommate {
  id: string
  name: string
  age: number
  location: string
  bio: string
  images: string[]
  budget: [number, number]
  moveInDate: string
  preferences: {
    petFriendly: boolean
    smoking: boolean
    cleanliness: string
    lifestyle: string
  }
  interests: string[]
  verified: boolean
  verificationLevel: "unverified" | "basic" | "verified" | "premium"
  trustScore: number
}

interface UserPreferences {
  ageRange: [number, number]
  budgetRange: [number, number]
  location: string[]
  lifestyle: {
    cleanliness: number
    socialLevel: number
    workFromHome: boolean
    petFriendly: boolean
    smoking: boolean
  }
  interests: string[]
  dealBreakers: string[]
}

interface UserProfile {
  id: string
  age: number
  budget: number
  location: string
  lifestyle: {
    cleanliness: number
    socialLevel: number
    workFromHome: boolean
    petFriendly: boolean
    smoking: boolean
  }
  interests: string[]
  verificationLevel: "unverified" | "basic" | "verified" | "premium"
  trustScore: number
}

const mockRoommates: Roommate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    age: 24,
    location: "Mission District, SF",
    bio: "Graduate student at UCSF, love cooking and yoga. Looking for a clean, respectful roommate to share a 2BR apartment.",
    images: [
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
    ],
    budget: [1200, 1800],
    moveInDate: "March 2024",
    preferences: {
      petFriendly: true,
      smoking: false,
      cleanliness: "Very Clean",
      lifestyle: "Quiet",
    },
    interests: ["Cooking", "Yoga", "Reading", "Hiking"],
    verified: true,
    verificationLevel: "verified",
    trustScore: 92,
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    age: 27,
    location: "SOMA, SF",
    bio: "Software engineer working remotely. Love gaming, music, and exploring the city. Chill roommate who respects personal space.",
    images: [
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
    ],
    budget: [1500, 2200],
    moveInDate: "April 2024",
    preferences: {
      petFriendly: false,
      smoking: false,
      cleanliness: "Clean",
      lifestyle: "Social",
    },
    interests: ["Gaming", "Music", "Tech", "Coffee"],
    verified: true,
    verificationLevel: "premium",
    trustScore: 88,
  },
]

const mockCurrentUserPreferences: UserPreferences = {
  ageRange: [22, 30] as [number, number],
  budgetRange: [1000, 2000] as [number, number],
  location: ["Mission District", "SOMA", "Castro"],
  lifestyle: {
    cleanliness: 7,
    socialLevel: 5,
    workFromHome: true,
    petFriendly: true,
    smoking: false,
  },
  interests: ["Cooking", "Yoga", "Tech", "Travel"],
  dealBreakers: ["smoking"],
}

const mockCurrentUser: UserProfile = {
  id: "current-user",
  age: 26,
  budget: 1500,
  location: "San Francisco",
  lifestyle: {
    cleanliness: 7,
    socialLevel: 5,
    workFromHome: true,
    petFriendly: true,
    smoking: false,
  },
  interests: ["Cooking", "Yoga", "Tech", "Travel"],
  verificationLevel: "verified" as const,
  trustScore: 85,
}

export function RoommatesTab() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProfile, setSelectedProfile] = useState<Roommate | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { safeMode } = useSafeMode()
  const [filteredRoommates, setFilteredRoommates] = useState<Roommate[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  useEffect(() => {
    const filtered = mockRoommates.filter((roommate) => {
      const ok = SafetySystem.isUserSafe(roommate.id, { safeMode, minScore: 50 })
      return ok
    })
    setFilteredRoommates(filtered)
    setCurrentIndex(0)
  }, [safeMode])

  const currentRoommate = filteredRoommates[currentIndex]

  const handleScroll = (direction: "up" | "down") => {
    if (direction === "down" && currentIndex < filteredRoommates.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (direction === "up" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (!selectedProfile) return
    if (direction === "next" && currentImageIndex < selectedProfile.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else if (direction === "prev" && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const compatibility = currentRoommate
    ? MatchingAlgorithm.calculateCompatibility(
        mockCurrentUser,
        {
          id: currentRoommate.id,
          age: currentRoommate.age,
          budget: (currentRoommate.budget[0] + currentRoommate.budget[1]) / 2,
          location: currentRoommate.location,
          lifestyle: {
            cleanliness:
              currentRoommate.preferences.cleanliness === "Very Clean"
                ? 9
                : currentRoommate.preferences.cleanliness === "Clean"
                  ? 7
                  : 5,
            socialLevel:
              currentRoommate.preferences.lifestyle === "Social"
                ? 8
                : currentRoommate.preferences.lifestyle === "Quiet"
                  ? 3
                  : 5,
            workFromHome: true,
            petFriendly: currentRoommate.preferences.petFriendly,
            smoking: currentRoommate.preferences.smoking,
          },
          interests: currentRoommate.interests,
          verificationLevel: currentRoommate.verificationLevel,
          trustScore: currentRoommate.trustScore,
        },
        mockCurrentUserPreferences,
      )
    : null

  useEffect(() => {
    if (isDesktop) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        handleScroll("down")
      } else {
        handleScroll("up")
      }
    }
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener("wheel", handleWheel, { passive: false })
      return () => scrollElement.removeEventListener("wheel", handleWheel)
    }
  }, [currentIndex, filteredRoommates.length, isDesktop])

  if (filteredRoommates.length === 0) {
    return (
      <div className="h-full flex flex-col p-4">
        <SafeModeToggle enabled={safeMode} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Shield size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No roommates found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {safeMode ? "Try turning off Safe Mode to see more profiles" : "Check back later for new roommates!"}
            </p>
            {safeMode && (
              <Button onClick={() => router.push("/settings")} variant="outline">
                Turn off Safe Mode
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (isDesktop) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <SafeModeToggle enabled={safeMode} />
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRoommates.map((roommate) => (
            <motion.div
              key={roommate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => router.push(`/roommate/${roommate.id}`)}
            >
              <div className="relative">
                <img
                  src={roommate.images[0] || "/placeholder.svg"}
                  alt={roommate.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <VerificationBadge
                    verificationLevel={roommate.verificationLevel}
                    trustScore={roommate.trustScore}
                    size="sm"
                  />
                </div>
                <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
                  <ReportUserDialog userId={roommate.id} userName={roommate.name} variant="icon-only" />
                </div>
                <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
                  <h3 className="text-white font-bold text-lg">
                    {roommate.name}, {roommate.age}
                  </h3>
                  <p className="text-white/90 text-sm">{roommate.location}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{roommate.bio}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-green-600">
                    ${roommate.budget[0]}-${roommate.budget[1]}
                  </span>
                  <span className="text-gray-500">{roommate.moveInDate}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Mobile View
  return (
    <div className="h-full overflow-hidden">
      <div className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20">
        <SafeModeToggle enabled={safeMode} />
      </div>
      <div ref={scrollRef} className="h-full snap-y snap-mandatory overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full snap-start flex flex-col"
          >
            <div
              className="relative h-2/3 bg-gradient-to-b from-transparent to-black/20 cursor-pointer"
              onClick={() => router.push(`/roommate/${currentRoommate.id}`)}
            >
              <img
                src={currentRoommate.images[0] || "/placeholder.svg"}
                alt={currentRoommate.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <VerificationBadge
                  verificationLevel={currentRoommate.verificationLevel}
                  trustScore={currentRoommate.trustScore}
                />
              </div>
              <div className="absolute top-4 left-4" onClick={(e) => e.stopPropagation()}>
                <ReportUserDialog userId={currentRoommate.id} userName={currentRoommate.name} variant="icon-only" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h2 className="text-2xl font-bold">
                  {currentRoommate.name}, {currentRoommate.age}
                </h2>
                <div className="flex items-center mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{currentRoommate.location}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 bg-white dark:bg-gray-900 overflow-y-auto">
              {compatibility && (
                <div className="mb-4">
                  <CompatibilityDisplay compatibility={compatibility} />
                </div>
              )}
              <p className="text-gray-700 dark:text-gray-300 mb-4">{currentRoommate.bio}</p>
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                  <X size={20} className="mr-2" /> Pass
                </Button>
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Heart size={20} className="mr-2" /> Like
                </Button>
              </div>
              <div className="flex justify-center mt-4">
                <ReportUserDialog userId={currentRoommate.id} userName={currentRoommate.name} variant="compact" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={() => setSelectedProfile(null)}
          >
            <div className="relative h-full">
              <button
                onClick={() => setSelectedProfile(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white"
              >
                <X size={24} />
              </button>
              <div className="relative h-full">
                <img
                  src={selectedProfile.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${selectedProfile.name} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {currentImageIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImageNavigation("prev")
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}
                {currentImageIndex < selectedProfile.images.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleImageNavigation("next")
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
