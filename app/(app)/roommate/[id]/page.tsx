"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  MapPin,
  Calendar,
  DollarSign,
  User,
  Home,
  Star,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { VerificationBadge } from "@/components/safety/verification-badge"
import { ReportUserDialog } from "@/components/safety/report-user-dialog"
import { CompatibilityDisplay } from "@/components/matching/compatibility-display"
import { MatchingAlgorithm } from "@/lib/matching-algorithm"
import { useMediaQuery } from "@/hooks/use-media-query"

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
    guestPolicy: string
    workSchedule: string
  }
  interests: string[]
  lifestyleTags: string[]
  verified: boolean
  verificationLevel: "unverified" | "basic" | "verified" | "premium"
  trustScore: number
  lookingFor: string[]
  aboutLiving: string[]
  dealBreakers: string[]
}

// Mock data - in real app, this would come from API
const mockRoommates: { [key: string]: Roommate } = {
  "1": {
    id: "1",
    name: "Sarah Chen",
    age: 24,
    location: "Mission District, SF",
    bio: "Graduate student at UCSF studying medicine. I'm passionate about health, wellness, and creating a positive living environment. Looking for someone who values cleanliness and mutual respect.",
    images: [
      "/placeholder.svg?height=600&width=400",
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
      guestPolicy: "Occasional guests welcome",
      workSchedule: "Day shift (9-5)",
    },
    interests: ["Cooking", "Yoga", "Reading", "Hiking", "Photography", "Meditation"],
    lifestyleTags: ["Clean & Organized", "Quiet & Studious", "Pet Lover", "Non-Smoker", "Student", "Early Bird"],
    verified: true,
    verificationLevel: "verified",
    trustScore: 92,
    lookingFor: ["Respectful roommate", "Clean living space", "Quiet environment", "Shared cooking"],
    aboutLiving:
      "I believe in maintaining a clean, organized living space where everyone feels comfortable. I enjoy cooking healthy meals and would love to share recipes and maybe cook together sometimes. I'm usually in bed by 10 PM on weekdays but don't mind if you're a night owl - just keep it down after 11 PM. I have a small herb garden that I'd love to share!",
    dealBreakers: ["Heavy smoking", "Loud parties", "Messy common areas"],
  },
  "2": {
    id: "2",
    name: "Marcus Rodriguez",
    age: 27,
    location: "SOMA, SF",
    bio: "Software engineer working remotely for a tech startup. I love gaming, music production, and exploring SF's food scene. Looking for a chill roommate who respects personal space.",
    images: [
      "/placeholder.svg?height=600&width=400",
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
      guestPolicy: "Friends welcome on weekends",
      workSchedule: "Flexible (remote work)",
    },
    interests: ["Gaming", "Music Production", "Tech", "Coffee", "Food", "Movies"],
    lifestyleTags: ["Tech Savvy", "Social & Outgoing", "Professional", "Remote Worker", "Gamer", "Night Owl"],
    verified: true,
    verificationLevel: "premium",
    trustScore: 88,
    lookingFor: ["Tech-savvy roommate", "Shared interests", "Flexible schedule", "Good communication"],
    aboutLiving:
      "I work from home most days, so I have a dedicated office space. I'm pretty social and enjoy having friends over for game nights or movie marathons on weekends. I'm clean but not obsessive about it - just keep common areas tidy. I love trying new restaurants and would be down to explore the city's food scene together!",
    dealBreakers: ["No pets (allergies)", "Excessive noise during work hours", "Drama"],
  },
}

const mockCurrentUserPreferences = {
  location: {
    city: "San Francisco",
    radius: 10,
    neighborhoods: ["Mission District", "SOMA", "Castro"],
  },
  budget: { min: 1000, max: 2000 },
  moveInDate: {
    earliest: new Date("2024-03-01"),
    latest: new Date("2024-05-01"),
    flexible: true,
  },
  lifestyle: {
    cleanliness: "clean" as const,
    socialLevel: "moderate" as const,
    workSchedule: "day" as const,
    guestPolicy: "occasional" as const,
  },
  preferences: {
    petFriendly: true,
    smokingAllowed: false,
    drinkingOk: true,
    lgbtqFriendly: true,
  },
  interests: ["Cooking", "Yoga", "Tech", "Travel"],
  dealBreakers: ["smoking"],
}

export default function RoommateDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [compatibility, setCompatibility] = useState<number | null>(null)
  const [compatibilityError, setCompatibilityError] = useState<string | null>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const roommateId = params.id as string
  const roommate = mockRoommates[roommateId]

  const hasRequiredFields = (profile: any, preferences: any) => {
    return profile && preferences && profile.name && profile.location && preferences.budget && preferences.lifestyle
  }

  const areProfilesComplete = () => {
    const currentUserComplete = hasRequiredFields(mockCurrentUserPreferences, mockCurrentUserPreferences)
    const roommateComplete = hasRequiredFields(roommate, {
      budget: roommate?.budget,
      lifestyle: roommate?.preferences,
    })
    return currentUserComplete && roommateComplete
  }

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (direction === "prev" && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    } else if (direction === "next" && currentImageIndex < roommate.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const handleStartChat = () => {
    // Logic to start chat
    console.log("Starting chat with", roommate.name)
  }

  useEffect(() => {
    if (!roommate) {
      router.push("/discover")
      return
    }

    const calculateCompatibility = async () => {
      setIsLoading(true)
      setCompatibilityError(null)

      if (!areProfilesComplete()) {
        setCompatibility(null)
        setIsLoading(false)
        return
      }

      try {
        const score = MatchingAlgorithm.calculateCompatibility(mockCurrentUserPreferences, {
          location: {
            city: "San Francisco",
            radius: 10,
            neighborhoods: [roommate.location.split(", ")[0]],
          },
          budget: { min: roommate.budget[0], max: roommate.budget[1] },
          moveInDate: {
            earliest: new Date(roommate.moveInDate),
            latest: new Date(roommate.moveInDate),
            flexible: true,
          },
          lifestyle: {
            cleanliness: roommate.preferences.cleanliness.toLowerCase().replace(" ", "-") as any,
            socialLevel: roommate.preferences.lifestyle.toLowerCase() as any,
            workSchedule: "flexible" as const,
            guestPolicy: "occasional" as const,
          },
          preferences: {
            petFriendly: roommate.preferences.petFriendly,
            smokingAllowed: roommate.preferences.smoking,
            drinkingOk: true,
            lgbtqFriendly: true,
          },
          interests: roommate.interests,
          dealBreakers: roommate.dealBreakers,
        })
        setCompatibility(score)
      } catch (error) {
        console.warn("Failed to calculate compatibility:", error)
        setCompatibilityError("Unable to calculate compatibility score")
        setCompatibility(null)
      } finally {
        setIsLoading(false)
      }
    }

    calculateCompatibility()
  }, [roommate, router])

  if (!roommate) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Roommate not found</p>
      </div>
    )
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
            <ReportUserDialog userId={roommate.id} userName={roommate.name} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart size={20} className={isLiked ? "fill-current" : ""} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Image Gallery */}
        <Card className="overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="relative h-96 md:h-[500px]">
            <img
              src={roommate.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${roommate.name} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Image Navigation */}
            {currentImageIndex > 0 && (
              <button
                onClick={() => handleImageNavigation("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {currentImageIndex < roommate.images.length - 1 && (
              <button
                onClick={() => handleImageNavigation("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {roommate.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Verification Badge */}
            <div className="absolute top-4 right-4">
              <VerificationBadge verificationLevel={roommate.verificationLevel} trustScore={roommate.trustScore} />
            </div>
          </div>
        </Card>

        {/* Profile Header */}
        <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold mb-2">
                {roommate.name}, {roommate.age}
              </h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                <MapPin size={18} className="mr-2" />
                <span>{roommate.location}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <DollarSign size={16} className="mr-1 text-green-500" />
                  <span className="font-medium">
                    ${roommate.budget[0]}-${roommate.budget[1]}/month
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-blue-500" />
                  <span className="font-medium">Available {roommate.moveInDate}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={handleStartChat}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6"
              >
                <MessageCircle size={18} className="mr-2" />
                Message
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsLiked(!isLiked)}
                className={`px-6 ${isLiked ? "bg-red-50 border-red-200 text-red-600" : ""}`}
              >
                <Heart size={18} className={`mr-2 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{roommate.bio}</p>
        </Card>

        {/* Compatibility Score */}
        {isLoading ? (
          <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Calculating compatibility...</span>
            </div>
          </Card>
        ) : !areProfilesComplete() ? (
          <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center justify-center py-8 text-amber-600 dark:text-amber-400">
              <AlertCircle size={20} className="mr-2" />
              <span>Incomplete profile - compatibility score unavailable</span>
            </div>
          </Card>
        ) : compatibilityError ? (
          <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
              <AlertCircle size={20} className="mr-2" />
              <span>{compatibilityError}</span>
            </div>
          </Card>
        ) : compatibility !== null ? (
          <CompatibilityDisplay compatibility={compatibility} />
        ) : null}

        {/* About Living Together */}
        <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Home size={20} className="mr-2 text-purple-500" />
            About Living Together
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{roommate.aboutLiving}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3 text-green-600">Looking For:</h3>
              <div className="space-y-2">
                {roommate.lookingFor.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 text-red-600">Deal Breakers:</h3>
              <div className="space-y-2">
                {roommate.dealBreakers.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User size={20} className="mr-2 text-blue-500" />
            Living Preferences
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Cleanliness Level</span>
                <p className="font-medium">{roommate.preferences.cleanliness}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Lifestyle</span>
                <p className="font-medium">{roommate.preferences.lifestyle}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Work Schedule</span>
                <p className="font-medium">{roommate.preferences.workSchedule}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Pet Friendly</span>
                <p className="font-medium">{roommate.preferences.petFriendly ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Smoking</span>
                <p className="font-medium">{roommate.preferences.smoking ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Guest Policy</span>
                <p className="font-medium">{roommate.preferences.guestPolicy}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Interests */}
        <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Star size={20} className="mr-2 text-yellow-500" />
            Interests & Hobbies
          </h2>
          <div className="flex flex-wrap gap-2">
            {roommate.interests.map((interest, index) => (
              <Badge
                key={index}
                className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-3 py-1"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Lifestyle Tags */}
        <Card className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User size={20} className="mr-2 text-blue-500" />
            Lifestyle Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {roommate.lifestyleTags.map((tag, index) => (
              <Badge key={index} className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/20 p-4 -mx-4">
          <div className="flex space-x-3 max-w-4xl mx-auto">
            <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={() => router.back()}>
              Keep Looking
            </Button>
            <Button
              onClick={handleStartChat}
              size="lg"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
            >
              <MessageCircle size={18} className="mr-2" />
              Start Chatting
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
