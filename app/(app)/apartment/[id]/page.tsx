"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Calendar,
  BedDouble,
  Bath,
  Square,
  Building,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  ExternalLink,
  User,
  Play,
  Pause,
  RotateCcw,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "@/hooks/use-media-query"
import { FindRoommateDialog } from "@/components/apartment/find-roommate-dialog"

interface Agent {
  name: string
  avatar: string
  verified: boolean
  phone: string
  rating: number
  totalReviews: number
}

interface RegularUser {
  name: string
  avatar: string
  verified: boolean
  verificationLevel: "unverified" | "basic" | "verified" | "premium"
  phone?: string
  memberSince: string
  bio: string
}

interface Manager {
  id: string
  name: string
  avatar: string
  verified: boolean
  phone: string
  rating: number
  totalReviews: number
  isAgent: boolean
}

interface MediaItem {
  id: string
  type: "photo" | "video" | "360"
  url: string
  thumbnail?: string
  title?: string
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
  media: MediaItem[]
  amenities: string[]
  available: string
  description: string
  postedBy: "agent" | "user"
  agent?: Agent
  user?: RegularUser
  manager_id: string
  owner_id: string
  address: string
  neighborhood: string
  yearBuilt?: number
  petPolicy: string
  parkingSpaces: number
  leaseTerms: string[]
  utilities: string[]
  nearbyTransport: string[]
  walkScore?: number
  liked: boolean
  status: "available" | "pending" | "rented"
}

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  verified: boolean
  reviewType: "tenant" | "visitor" | "roommate"
}

// Mock reviews data
const mockReviews: { [key: string]: Review[] } = {
  "1": [
    {
      id: "r1",
      userId: "u1",
      userName: "Sarah Chen",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "Amazing apartment! The location is perfect and Maria was incredibly helpful throughout the entire process. The building amenities are top-notch.",
      date: "2024-02-15",
      verified: true,
      reviewType: "tenant",
    },
    {
      id: "r2",
      userId: "u2",
      userName: "Mike Johnson",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment:
        "Great space with lots of natural light. The only downside is street parking can be challenging, but overall very satisfied.",
      date: "2024-01-28",
      verified: true,
      reviewType: "tenant",
    },
    {
      id: "r3",
      userId: "u3",
      userName: "Emily Rodriguez",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "Lived here for 8 months and loved every minute. The property manager is responsive and the neighborhood is vibrant.",
      date: "2024-01-10",
      verified: true,
      reviewType: "tenant",
    },
  ],
  "2": [
    {
      id: "r4",
      userId: "u4",
      userName: "David Kim",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "Luxury living at its finest. The building amenities are incredible and the concierge service is excellent.",
      date: "2024-02-20",
      verified: true,
      reviewType: "tenant",
    },
  ],
}

// Mock current user profile
const mockCurrentUser = {
  name: "Alex Johnson",
  age: 26,
  avatar: "/placeholder.svg?height=80&width=80",
  verified: true,
  bio: "Software engineer who loves cooking and hiking. Looking for a clean, respectful roommate.",
  interests: ["Cooking", "Hiking", "Tech", "Music", "Photography", "Travel"],
}

// Dummy manager mapping
const managerMapping: { [key: string]: Manager } = {
  "manager-1": {
    id: "manager-1",
    name: "Maria Santos-Rodriguez",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: true,
    phone: "(415) 555-0123",
    rating: 4.8,
    totalReviews: 127,
    isAgent: true,
  },
  "manager-2": {
    id: "manager-2",
    name: "Jonathan Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: true,
    phone: "(415) 555-0456",
    rating: 4.9,
    totalReviews: 89,
    isAgent: true,
  },
  "manager-3": {
    id: "manager-3",
    name: "Alex Rodriguez-Smith",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: true,
    phone: "(415) 555-0789",
    rating: 4.7,
    totalReviews: 156,
    isAgent: false,
  },
  "manager-4": {
    id: "manager-4",
    name: "Sarah Kim-Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    verified: true,
    phone: "(415) 555-0321",
    rating: 4.6,
    totalReviews: 98,
    isAgent: false,
  },
}

// Mock data - in real app, this would come from API
const mockApartments: { [key: string]: Apartment } = {
  "1": {
    id: "1",
    title: "Modern 2BR in Mission District",
    price: 3200,
    location: "Mission District, SF",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    media: [
      {
        id: "1",
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        title: "Living Room",
      },
      {
        id: "2",
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        title: "Kitchen",
      },
      {
        id: "3",
        type: "video",
        url: "/placeholder.svg?height=600&width=800",
        thumbnail: "/placeholder.svg?height=600&width=800",
        title: "Apartment Walkthrough",
      },
      {
        id: "4",
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        title: "Master Bedroom",
      },
      {
        id: "5",
        type: "360",
        url: "/placeholder.svg?height=600&width=800",
        thumbnail: "/placeholder.svg?height=600&width=800",
        title: "360° Living Room Tour",
      },
      {
        id: "6",
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        title: "Bathroom",
      },
      {
        id: "7",
        type: "photo",
        url: "/placeholder.svg?height=600&width=800",
        title: "Building Exterior",
      },
    ],
    amenities: ["In-unit Laundry", "Parking", "Pet Friendly", "Gym", "Rooftop Deck", "Dishwasher"],
    available: "March 15, 2024",
    description:
      "Beautiful modern 2-bedroom apartment in the heart of Mission District. Features hardwood floors, stainless steel appliances, and plenty of natural light. Walking distance to restaurants, cafes, and public transportation.",
    postedBy: "agent",
    agent: {
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: true,
      phone: "(415) 555-0123",
      rating: 4.8,
      totalReviews: 127,
    },
    manager_id: "manager-1",
    owner_id: "owner-1",
    address: "1234 Valencia Street, San Francisco, CA 94110",
    neighborhood: "Mission District",
    yearBuilt: 2018,
    petPolicy: "Cats and small dogs allowed with deposit",
    parkingSpaces: 1,
    leaseTerms: ["12 months", "6 months (higher rate)"],
    utilities: ["Water", "Trash", "Internet"],
    nearbyTransport: ["16th St Mission BART", "Bus lines 14, 49"],
    walkScore: 92,
    liked: false,
    status: "available",
  },
  "2": {
    id: "2",
    title: "Luxury Studio in SOMA",
    price: 2800,
    location: "SOMA, SF",
    bedrooms: 0,
    bathrooms: 1,
    sqft: 650,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    media: [],
    amenities: ["Concierge", "Rooftop Deck", "Gym", "Pool", "In-unit Laundry", "High-end Appliances"],
    available: "April 1, 2024",
    description:
      "Stunning luxury studio in a full-service building. Floor-to-ceiling windows with city views, premium finishes throughout, and access to world-class amenities including rooftop pool and fitness center.",
    postedBy: "agent",
    agent: {
      name: "John Chen",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: true,
      phone: "(415) 555-0456",
      rating: 4.9,
      totalReviews: 89,
    },
    manager_id: "manager-2",
    owner_id: "owner-2",
    address: "567 Howard Street, San Francisco, CA 94105",
    neighborhood: "SOMA",
    yearBuilt: 2020,
    petPolicy: "No pets allowed",
    parkingSpaces: 0,
    leaseTerms: ["12 months", "24 months (discount available)"],
    utilities: ["Water", "Trash", "Gas"],
    nearbyTransport: ["Montgomery BART", "Bus lines 30, 45"],
    walkScore: 88,
    liked: false,
    status: "available",
  },
  "3": {
    id: "3",
    title: "Charming 1BR in Castro",
    price: 2600,
    location: "Castro District, SF",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 750,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    media: [],
    amenities: ["Hardwood Floors", "Bay Windows", "Garden Access", "Updated Kitchen"],
    available: "March 30, 2024",
    description:
      "Cozy 1-bedroom apartment with character in the vibrant Castro District. Recently updated with modern amenities while maintaining its classic charm. Perfect for someone looking for a comfortable home in a great neighborhood.",
    postedBy: "user",
    user: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: true,
      verificationLevel: "verified",
      memberSince: "January 2023",
      bio: "Software engineer looking to sublet my apartment while I travel for work. Clean, responsible tenant preferred.",
    },
    manager_id: "manager-3",
    owner_id: "owner-3",
    address: "789 Castro Street, San Francisco, CA 94114",
    neighborhood: "Castro District",
    yearBuilt: 1995,
    petPolicy: "Small pets okay with approval",
    parkingSpaces: 0,
    leaseTerms: ["6 months", "Month-to-month available"],
    utilities: ["Water", "Trash"],
    nearbyTransport: ["Castro Muni Station", "Bus lines 24, 35"],
    walkScore: 95,
    liked: false,
    status: "available",
  },
  "4": {
    id: "4",
    title: "Spacious 2BR in Noe Valley",
    price: 3400,
    location: "Noe Valley, SF",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    media: [],
    amenities: ["Private Patio", "In-unit Laundry", "Fireplace", "Storage", "Modern Kitchen"],
    available: "April 15, 2024",
    description:
      "Beautiful 2-bedroom apartment with private patio in quiet Noe Valley. Perfect for professionals or small families. Recently renovated with high-end finishes and appliances.",
    postedBy: "user",
    user: {
      name: "Sarah Kim",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: false,
      verificationLevel: "basic",
      memberSince: "March 2023",
      bio: "Moving to New York for a new job opportunity. Looking for responsible tenants to take over my lease.",
    },
    manager_id: "manager-4",
    owner_id: "owner-4",
    address: "456 24th Street, San Francisco, CA 94131",
    neighborhood: "Noe Valley",
    yearBuilt: 1985,
    petPolicy: "No pets allowed",
    parkingSpaces: 1,
    leaseTerms: ["12 months", "Lease transfer available"],
    utilities: ["Water", "Trash", "Gas"],
    nearbyTransport: ["24th St Mission BART", "Bus lines 48, J-Church"],
    walkScore: 85,
    liked: false,
    status: "available",
  },
}

const similarApartments = [
  {
    id: "3",
    title: "Charming 1BR in Castro",
    price: 2600,
    location: "Castro District, SF",
    image: "/placeholder.svg?height=200&width=300",
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "4",
    title: "Spacious 2BR in Noe Valley",
    price: 3400,
    location: "Noe Valley, SF",
    image: "/placeholder.svg?height=200&width=300",
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: "5",
    title: "Modern 1BR in Hayes Valley",
    price: 2900,
    location: "Hayes Valley, SF",
    image: "/placeholder.svg?height=200&width=300",
    bedrooms: 1,
    bathrooms: 1,
  },
]

export default function ApartmentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [mediaLoaded, setMediaLoaded] = useState<{ [key: number]: boolean }>({})
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    reviewType: "tenant" as "tenant" | "visitor" | "roommate",
  })

  const apartmentId = params.id as string
  const [reviews, setReviews] = useState<Review[]>(mockReviews[apartmentId] || [])

  const apartment = mockApartments[apartmentId]
  const currentMedia =
    apartment?.media?.[currentMediaIndex] || {
      type: "photo",
      url: apartment?.images?.[currentMediaIndex] || "/placeholder.svg",
    }
  const totalMediaCount = apartment?.media?.length || apartment?.images?.length || 0

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentMediaIndex > 0) {
        setCurrentMediaIndex(currentMediaIndex - 1)
      } else if (e.key === "ArrowRight" && currentMediaIndex < totalMediaCount - 1) {
        setCurrentMediaIndex(currentMediaIndex + 1)
      } else if (e.key === "Escape" && isVideoPlaying) {
        setIsVideoPlaying(false)
        if (videoRef.current) {
          videoRef.current.pause()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentMediaIndex, totalMediaCount, isVideoPlaying])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentMediaIndex < totalMediaCount - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1)
    }
    if (isRightSwipe && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1)
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    if (!prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!apartment) {
      router.push("/discover")
    } else {
      setIsLiked(apartment.liked)
      setTimeout(() => setIsLoading(false), 500)
    }
  }, [apartment, router])

  const showToastNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleMediaNavigation = (direction: "prev" | "next") => {
    if (direction === "next" && currentMediaIndex < totalMediaCount - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1)
    } else if (direction === "prev" && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1)
    }
  }

  const handleMediaLoad = (index: number) => {
    setMediaLoaded((prev) => ({ ...prev, [index]: true }))
  }

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const getStatusBadgeColor = (status: Apartment["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "rented":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Guard against undefined apartment when computing manager
  const manager = apartment ? managerMapping[apartment.manager_id] : undefined

  const handleStartChat = () => {
    if (!manager) return
    const contactName = manager.name
    showToastNotification("Opening chat...")
    router.push(`/chats?contact=${encodeURIComponent(contactName)}`)
  }

  const handleShare = async () => {
    if (!apartment) return
    if (navigator.share) {
      try {
        await navigator.share({
          title: apartment.title,
          text: `Check out this apartment: ${apartment.title} - $${apartment.price}/month`,
          url: window.location.href,
        })
        showToastNotification("Shared successfully!")
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToastNotification("Link copied to clipboard!")
    }
  }

  const handleSimilarApartmentClick = (id: string) => {
    router.push(`/apartment/${id}`)
  }

  const handleViewProfile = () => {
    if (!manager) return
    const slug = manager.name.toLowerCase().replace(/\s+/g, "-")
    if (manager.isAgent) {
      router.push(`/agent-profile/${slug}`)
    } else {
      router.push(`/user-profile/${slug}`)
    }
  }

  const handleSubmitReview = () => {
    if (newReview.comment.trim().length < 10) {
      showToastNotification("Please write a review with at least 10 characters")
      return
    }

    const review: Review = {
      id: `r${Date.now()}`,
      userId: "current-user",
      userName: mockCurrentUser.name,
      userAvatar: mockCurrentUser.avatar,
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: new Date().toISOString().split("T")[0],
      verified: mockCurrentUser.verified,
      reviewType: newReview.reviewType,
    }

    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: "", reviewType: "tenant" })
    setShowReviewForm(false)
    showToastNotification("Review submitted successfully!")
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : manager?.rating || 0

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-6xl mx-auto p-4">
          <div className="animate-pulse">
            <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="flex space-x-2 justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-16 h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20 p-4 transition-all duration-300">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="hover:scale-105 transition-transform duration-200 min-h-[44px] min-w-[44px]"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="hover:scale-105 transition-transform duration-200 min-h-[44px] min-w-[44px]"
              aria-label="Share apartment"
            >
              <Share2 size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsLiked(!isLiked)
                showToastNotification(isLiked ? "Removed from favorites" : "Added to favorites")
              }}
              className={`hover:scale-105 transition-all duration-200 min-h-[44px] min-w-[44px] ${isLiked ? "text-red-500" : ""}`}
              aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={20} className={isLiked ? "fill-current" : ""} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <Card className="overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] group">
            {/* Media Content */}
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out overflow-hidden"
              style={{
                transform: !prefersReducedMotion ? `translateY(${scrollY * 0.1}px)` : "none",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {currentMedia.type === "photo" && (
                <img
                  src={currentMedia.url || "/placeholder.svg"}
                  alt={
                    currentMedia.title || `${apartment!.title} - Image ${currentMediaIndex + 1} of ${totalMediaCount}`
                  }
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onLoad={() => handleMediaLoad(currentMediaIndex)}
                  style={{ opacity: mediaLoaded[currentMediaIndex] ? 1 : 0 }}
                />
              )}

              {currentMedia.type === "video" && (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={currentMedia.url}
                    poster={(currentMedia as MediaItem).thumbnail}
                    className="w-full h-full object-cover"
                    onLoadedData={() => handleMediaLoad(currentMediaIndex)}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    controls={false}
                  />
                  <button
                    onClick={toggleVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-200"
                    aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                  >
                    <div className="bg-black/50 rounded-full p-4 hover:scale-110 transition-transform duration-200">
                      {isVideoPlaying ? (
                        <Pause size={32} className="text-white" />
                      ) : (
                        <Play size={32} className="text-white ml-1" />
                      )}
                    </div>
                  </button>
                </div>
              )}

              {currentMedia.type === "360" && (
                <div className="relative w-full h-full">
                  <img
                    src={currentMedia.url || "/placeholder.svg"}
                    alt={currentMedia.title || "360° Tour"}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onLoad={() => handleMediaLoad(currentMediaIndex)}
                    style={{ opacity: mediaLoaded[currentMediaIndex] ? 1 : 0 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="bg-black/50 rounded-full p-4 hover:scale-110 transition-transform duration-200 cursor-pointer">
                      <RotateCcw size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-500 text-white font-semibold px-3 py-1 shadow-lg">
                      <Eye size={14} className="mr-1" />
                      360° Tour
                    </Badge>
                  </div>
                </div>
              )}

              {/* Gradient overlay for better text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* Price and Status - Pinned top-right */}
            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2 animate-in fade-in slide-in-from-right-4 duration-700">
              <Badge
                className={`${getStatusBadgeColor(apartment!.status)} text-white font-semibold px-3 py-1 shadow-lg capitalize`}
              >
                {apartment!.status}
              </Badge>
              <Badge className="bg-green-500 text-white font-bold text-lg sm:text-xl px-4 py-2 shadow-lg">
                ${apartment!.price.toLocaleString()}/mo
              </Badge>
            </div>

            {/* Media Navigation - Desktop arrows */}
            {isDesktop && currentMediaIndex > 0 && (
              <button
                onClick={() => handleMediaNavigation("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center opacity-0 group-hover:opacity-100"
                aria-label="Previous media"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {isDesktop && currentMediaIndex < totalMediaCount - 1 && (
              <button
                onClick={() => handleMediaNavigation("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center opacity-0 group-hover:opacity-100"
                aria-label="Next media"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Media counter and dots - Mobile */}
            {isMobile && (
              <>
                <div className="absolute top-4 left-4 animate-in fade-in slide-in-from-left-4 duration-700">
                  <Badge className="bg-black/50 text-white font-medium px-3 py-1 shadow-lg backdrop-blur-sm">
                    {currentMediaIndex + 1} / {totalMediaCount}
                  </Badge>
                </div>

                <div
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2"
                  role="tablist"
                  aria-label="Media gallery"
                >
                  {Array.from({ length: totalMediaCount }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                        index === currentMediaIndex ? "bg-white shadow-lg" : "bg-white/50"
                      }`}
                      role="tab"
                      aria-selected={index === currentMediaIndex}
                      aria-label={`View media ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Media type indicator */}
            {currentMedia.type !== "photo" && (
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-black/50 text-white font-medium px-3 py-1 shadow-lg backdrop-blur-sm">
                  {currentMedia.type === "video" ? "Video" : "360° Tour"}
                </Badge>
              </div>
            )}
          </div>

          {/* Desktop thumbnail strip */}
          {isDesktop && totalMediaCount > 1 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {(apartment!.media.length ? apartment!.media : apartment!.images.map((url, i) => ({ id: `${i}`, type: "photo" as const, url }))).map(
                  (media: any, index: number) => (
                    <button
                      key={media.id ?? index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${
                        index === currentMediaIndex
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                      aria-label={`View ${media.title || `media ${index + 1}`}`}
                    >
                      <img
                        src={media.thumbnail || media.url}
                        alt={media.title || `Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {media.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play size={16} className="text-white" />
                        </div>
                      )}
                      {media.type === "360" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <RotateCcw size={16} className="text-white" />
                        </div>
                      )}
                      {index === currentMediaIndex && <div className="absolute inset-0 bg-blue-500/20" />}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Property Header */}
            <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{apartment!.title}</h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <MapPin size={18} className="mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{apartment!.address}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 text-sm">
                    <div className="flex items-center hover:scale-105 transition-transform duration-200">
                      <BedDouble size={16} className="mr-1 text-blue-500" />
                      <span className="font-medium">{apartment!.bedrooms || "Studio"}</span>
                    </div>
                    <div className="flex items-center hover:scale-105 transition-transform duration-200">
                      <Bath size={16} className="mr-1 text-green-500" />
                      <span className="font-medium">{apartment!.bathrooms} bath</span>
                    </div>
                    <div className="flex items-center hover:scale-105 transition-transform duration-200">
                      <Square size={16} className="mr-1 text-purple-500" />
                      <span className="font-medium">{apartment!.sqft} sqft</span>
                    </div>
                    <div className="flex items-center hover:scale-105 transition-transform duration-200">
                      <Calendar size={16} className="mr-1 text-orange-500" />
                      <span className="font-medium">Available {apartment!.available}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {apartment!.description}
              </p>
            </Card>

            {/* Amenities */}
            <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                <Building size={20} className="mr-2 text-blue-500" />
                Amenities & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {apartment!.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 hover:scale-105"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Property Details */}
            <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                    <span className="text-sm font-medium text-gray-500">Neighborhood</span>
                    <p className="font-medium">{apartment!.neighborhood}</p>
                  </div>
                  {apartment!.yearBuilt && (
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                      <span className="text-sm font-medium text-gray-500">Year Built</span>
                      <p className="font-medium">{apartment!.yearBuilt}</p>
                    </div>
                  )}
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                    <span className="text-sm font-medium text-gray-500">Pet Policy</span>
                    <p className="font-medium">{apartment!.petPolicy}</p>
                  </div>
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                    <span className="text-sm font-medium text-gray-500">Parking</span>
                    <p className="font-medium">
                      {apartment!.parkingSpaces > 0 ? `${apartment!.parkingSpaces} space(s)` : "No parking"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {apartment!.walkScore && (
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                      <span className="text-sm font-medium text-gray-500">Walk Score</span>
                      <p className="font-medium">{apartment!.walkScore}/100</p>
                    </div>
                  )}
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                    <span className="text-sm font-medium text-gray-500">Lease Terms</span>
                    <div className="space-y-1">
                      {apartment!.leaseTerms.map((term, index) => (
                        <p key={index} className="text-sm">
                          {term}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
                    <span className="text-sm font-medium text-gray-500">Utilities Included</span>
                    <p className="font-medium">{apartment!.utilities.join(", ")}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Transportation */}
            <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Transportation</h2>
              <div className="flex flex-wrap gap-2">
                {apartment!.nearbyTransport.map((transport, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 hover:scale-105 transition-transform duration-200 cursor-default"
                  >
                    {transport}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Reviews Section */}
            <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold flex items-center">
                    <Star size={20} className="mr-2 text-yellow-500" />
                    Reviews & Ratings
                  </h2>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < Math.floor(averageRating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 font-semibold">{averageRating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-blue-500 hover:bg-blue-600 text-white min-h-[44px]"
                >
                  Write Review
                </Button>
              </div>

              {showReviewForm && (
                <Card className="p-4 mb-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-4">Write a Review</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setNewReview({ ...newReview, rating })}
                          className="p-1 hover:scale-110 transition-transform duration-200"
                          aria-label={`Rate ${rating} stars`}
                        >
                          <Star
                            size={24}
                            className={`${rating <= newReview.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {newReview.rating} star{newReview.rating !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Review Type</label>
                    <div className="flex space-x-2">
                      {[
                        { value: "tenant", label: "Current/Former Tenant" },
                        { value: "visitor", label: "Visited Property" },
                        { value: "roommate", label: "Roommate Experience" },
                      ].map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setNewReview({ ...newReview, reviewType: type.value as any })}
                          className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                            newReview.reviewType === type.value
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Your Review</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Share your experience with this property..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      rows={4}
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {newReview.comment.length}/500 characters (minimum 10)
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleSubmitReview}
                      className="bg-green-500 hover:bg-green-600 text-white"
                      disabled={newReview.comment.trim().length < 10}
                    >
                      Submit Review
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowReviewForm(false)
                        setNewReview({ rating: 5, comment: "", reviewType: "tenant" })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              )}

              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Star size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No reviews yet. Be the first to review this property!</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <Card key={review.id} className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.userAvatar || "/placeholder.svg"}
                          alt={`${review.userName} profile`}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-sm">{review.userName}</h4>
                              {review.verified && (
                                <Badge className="bg-green-500 text-white text-xs px-2 py-0.5">Verified</Badge>
                              )}
                              <Badge variant="outline" className="text-xs px-2 py-0.5 capitalize">
                                {review.reviewType}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>

                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="ml-2 text-sm font-medium">{review.rating}/5</span>
                          </div>

                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg animate-in fade-in slide-in-from-right-4 duration-500 delay-100 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Contact Property Manager</h2>

              {manager && (
                <>
                  <div className="flex items-center mb-4">
                    <img
                      src={manager.avatar || "/placeholder.svg"}
                      alt={`${manager.name} profile picture`}
                      className="w-16 h-16 rounded-full mr-4 hover:scale-105 transition-transform duration-200"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{manager.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Property Manager</p>
                      <div className="flex items-center mb-1">
                        <Star size={14} className="text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-medium">{manager.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({manager.totalReviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <Button
                      onClick={handleStartChat}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white hover:scale-105 transition-all duration-200 min-h-[44px]"
                      aria-label={`Send message to ${manager.name}`}
                    >
                      <MessageCircle size={18} className="mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent hover:scale-105 transition-all duration-200 min-h-[44px]"
                      aria-label={`Call ${manager.name}`}
                    >
                      <Phone size={16} className="mr-1" />
                      Call
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent hover:scale-105 transition-all duration-200 min-h-[44px]"
                      onClick={handleViewProfile}
                      aria-label={`View ${manager.name}'s profile`}
                    >
                      <ExternalLink size={16} className="mr-1" />
                      View Profile
                    </Button>
                  </div>
                </>
              )}
            </Card>

            <Card className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 shadow-lg animate-in fade-in slide-in-from-right-4 duration-500 delay-200 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center">
                <User size={20} className="mr-2 text-blue-500" />
                Looking for a Roommate?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {apartment!.bedrooms >= 2
                  ? `Share this ${apartment!.bedrooms}-bedroom apartment and split the costs! Your profile will be added to the roommate feed.`
                  : `Even studios and 1-bedrooms can work with the right roommate setup. Find someone to share costs and space!`}
              </p>
              <div className="space-y-3">
                <FindRoommateDialog apartment={apartment!} userProfile={mockCurrentUser} />
                <div className="text-xs text-gray-500 text-center">
                  Split rent: ~${Math.round(apartment!.price / 2).toLocaleString()}/month each
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg animate-in fade-in slide-in-from-right-4 duration-500 delay-300 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent justify-start hover:scale-105 transition-all duration-200 min-h-[44px]"
                  onClick={() => {
                    setIsLiked(!isLiked)
                    showToastNotification(isLiked ? "Removed from favorites" : "Added to favorites")
                  }}
                  aria-label={isLiked ? "Remove apartment from favorites" : "Add apartment to favorites"}
                >
                  <Heart size={18} className={`mr-2 ${isLiked ? "fill-current text-red-500" : ""}`} />
                  {isLiked ? "Saved" : "Save Apartment"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent justify-start hover:scale-105 transition-all duration-200 min-h-[44px]"
                  onClick={handleShare}
                  aria-label="Share apartment"
                >
                  <Share2 size={18} className="mr-2" />
                  Share Apartment
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Similar Apartments */}
        <Card className="p-4 sm:p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Similar Apartments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarApartments
              .filter((similar) => similar.id !== apartmentId)
              .slice(0, 3)
              .map((similar, index) => (
                <div
                  key={similar.id}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                  onClick={() => handleSimilarApartmentClick(similar.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${similar.title} apartment details`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSimilarApartmentClick(similar.id)
                    }
                  }}
                >
                  <img
                    src={similar.image || "/placeholder.svg"}
                    alt={`${similar.title} apartment`}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1">{similar.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{similar.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-600">${similar.price}/mo</span>
                      <span className="text-xs text-gray-500">
                        {similar.bedrooms || "Studio"} • {similar.bathrooms} bath
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <div className="sticky bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/20 p-4 -mx-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex space-x-3 max-w-6xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 bg-transparent hover:scale-105 transition-all duration-200 min-h-[48px]"
              onClick={() => {
                setIsLiked(!isLiked)
                showToastNotification(isLiked ? "Removed from favorites" : "Added to favorites")
              }}
              aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={18} className={`mr-2 ${isLiked ? "fill-current text-red-500" : ""}`} />
              {isLiked ? "Saved" : "Save"}
            </Button>
            <Button
              onClick={handleStartChat}
              size="lg"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white hover:scale-105 transition-all duration-200 min-h-[48px]"
              aria-label={`Contact ${manager?.name || "property manager"}`}
            >
              <MessageCircle size={18} className="mr-2" />
              Contact Property Manager
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
