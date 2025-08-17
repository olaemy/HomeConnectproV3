"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, X, MapPin, Briefcase, GraduationCap, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VerificationBadge } from "@/components/safety/verification-badge"
import { CompatibilityDisplay } from "@/components/matching/compatibility-display"
import { SafetySystem } from "@/lib/safety-system"
import { useSafeMode } from "@/contexts/safe-mode"

interface RoommateProfile {
  id: string
  name: string
  age: number
  avatar: string
  bio: string
  location: string
  occupation: string
  education: string
  interests: string[]
  lifestyle: {
    cleanliness: number
    socialLevel: number
    workFromHome: boolean
    petFriendly: boolean
    smoking: boolean
  }
  budget: {
    min: number
    max: number
  }
  verificationLevel: "unverified" | "basic" | "verified" | "premium"
  trustScore: number
  compatibility: number
  images: string[]
}

const mockProfiles: RoommateProfile[] = [
  {
    id: "1",
    name: "Sarah Chen",
    age: 26,
    avatar: "/placeholder.svg?height=400&width=400",
    bio: "Software engineer who loves hiking and cooking. Looking for a clean, respectful roommate to share a place in Mission District.",
    location: "Mission District, SF",
    occupation: "Software Engineer at Meta",
    education: "UC Berkeley - Computer Science",
    interests: ["Hiking", "Cooking", "Photography", "Yoga", "Reading"],
    lifestyle: {
      cleanliness: 9,
      socialLevel: 7,
      workFromHome: true,
      petFriendly: true,
      smoking: false,
    },
    budget: {
      min: 1800,
      max: 2500,
    },
    verificationLevel: "verified",
    trustScore: 92,
    compatibility: 94,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: "2",
    name: "Marcus Johnson",
    age: 29,
    avatar: "/placeholder.svg?height=400&width=400",
    bio: "Marketing professional and fitness enthusiast. I'm organized, friendly, and looking for someone who shares similar values.",
    location: "SOMA, SF",
    occupation: "Marketing Manager",
    education: "Stanford University - MBA",
    interests: ["Fitness", "Travel", "Music", "Networking", "Basketball"],
    lifestyle: {
      cleanliness: 8,
      socialLevel: 9,
      workFromHome: false,
      petFriendly: false,
      smoking: false,
    },
    budget: {
      min: 2000,
      max: 3000,
    },
    verificationLevel: "premium",
    trustScore: 96,
    compatibility: 87,
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
  },
]

export function MatchTab() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [profiles] = useState(mockProfiles)
  const { safeMode } = useSafeMode()
  const [filteredProfiles, setFilteredProfiles] = useState<RoommateProfile[]>([])

  useEffect(() => {
    const filtered = profiles.filter((profile) => {
      const visible = SafetySystem.isUserSafe(profile.id, { safeMode, minScore: 50 })
      return visible
    })
    setFilteredProfiles(filtered)
    setCurrentIndex(0)
  }, [profiles, safeMode])

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex < filteredProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Reset to first profile for demo
    }
  }

  const currentProfile = filteredProfiles[currentIndex]

  if (!currentProfile) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">No more profiles</h3>
          <p className="text-gray-600">Check back later for new matches!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-4 max-w-md mx-auto">
      <motion.div
        key={currentProfile.id}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="flex-1"
      >
        <Card className="h-full overflow-hidden">
          <div className="relative h-2/3">
            <img
              src={currentProfile.avatar || "/placeholder.svg"}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <VerificationBadge
                verificationLevel={currentProfile.verificationLevel}
                trustScore={currentProfile.trustScore}
              />
            </div>
            <div className="absolute top-4 right-4">
              <CompatibilityDisplay score={currentProfile.compatibility} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h2 className="text-white text-2xl font-bold">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <div className="flex items-center text-white/90 text-sm mt-1">
                <MapPin size={16} className="mr-1" />
                {currentProfile.location}
              </div>
            </div>
          </div>

          <CardContent className="p-4 h-1/3 overflow-y-auto">
            <p className="text-gray-700 dark:text-gray-300 mb-4">{currentProfile.bio}</p>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Briefcase size={16} className="mr-2 text-gray-500" />
                <span>{currentProfile.occupation}</span>
              </div>
              <div className="flex items-center text-sm">
                <GraduationCap size={16} className="mr-2 text-gray-500" />
                <span>{currentProfile.education}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="mr-2">💰</span>
                <span>
                  ${currentProfile.budget.min.toLocaleString()} - ${currentProfile.budget.max.toLocaleString()}/month
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Lifestyle</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Cleanliness: {currentProfile.lifestyle.cleanliness}/10</div>
                <div>Social Level: {currentProfile.lifestyle.socialLevel}/10</div>
                <div>WFH: {currentProfile.lifestyle.workFromHome ? "Yes" : "No"}</div>
                <div>Pet Friendly: {currentProfile.lifestyle.petFriendly ? "Yes" : "No"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-center items-center space-x-6 mt-4">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 border-red-200 hover:bg-red-50 hover:border-red-300 bg-transparent"
          onClick={() => handleSwipe("left")}
        >
          <X size={24} className="text-red-500" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-12 h-12 border-blue-200 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
        >
          <MessageCircle size={20} className="text-blue-500" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 border-green-200 hover:bg-green-50 hover:border-green-300 bg-transparent"
          onClick={() => handleSwipe("right")}
        >
          <Heart size={24} className="text-green-500" />
        </Button>
      </div>
    </div>
  )
}
