export interface MatchResult {
  id: string
  name: string
  age: number
  location: string
  image: string
  compatibility: number
  interests: string[]
  verified: boolean
  userId: string
  status?: "active" | "suspended" | "removed"
  trustScore?: number
}

export interface GetMatchesOptions {
  limit: number
  enforceSafeMode: boolean
  minScore?: number
}

// Dummy data for matches
const DUMMY_MATCHES: MatchResult[] = [
  {
    id: "1",
    name: "Alex Chen",
    age: 24,
    location: "Downtown",
    image: "/placeholder.svg?height=200&width=200",
    compatibility: 92,
    interests: ["Fitness", "Cooking", "Tech"],
    verified: true,
    userId: "user1",
    status: "active",
    trustScore: 85,
  },
  {
    id: "2",
    name: "Jordan Smith",
    age: 26,
    location: "Midtown",
    image: "/placeholder.svg?height=200&width=200",
    compatibility: 88,
    interests: ["Art", "Music", "Travel"],
    verified: true,
    userId: "user2",
    status: "active",
    trustScore: 78,
  },
  {
    id: "3",
    name: "Sam Wilson",
    age: 23,
    location: "University District",
    image: "/placeholder.svg?height=200&width=200",
    compatibility: 85,
    interests: ["Gaming", "Movies", "Sports"],
    verified: false,
    userId: "user3",
    status: "active",
    trustScore: 65,
  },
  {
    id: "4",
    name: "Taylor Brown",
    age: 27,
    location: "Uptown",
    image: "/placeholder.svg?height=200&width=200",
    compatibility: 90,
    interests: ["Reading", "Yoga", "Photography"],
    verified: true,
    userId: "user4",
    status: "active",
    trustScore: 92,
  },
  {
    id: "5",
    name: "Casey Davis",
    age: 25,
    location: "Riverside",
    image: "/placeholder.svg?height=200&width=200",
    compatibility: 87,
    interests: ["Hiking", "Cycling", "Nature"],
    verified: true,
    userId: "user5",
    status: "active",
    trustScore: 88,
  },
  {
    id: "6",
    name: "Riley Johnson",
    age: 28,
    location: "City Center",
    image: "/placeholder.svg?height=200&width=200",
    compatibility: 83,
    interests: ["Business", "Networking", "Wine"],
    verified: true,
    userId: "user6",
    status: "active",
    trustScore: 75,
  },
  {
    id: "7",
    name: "Morgan Lee",
    age: 22,
    location: "Arts District",
    image: "/placeholder.svg?height=200&width=200",
    compatibility: 91,
    interests: ["Painting", "Theater", "Coffee"],
    verified: false,
    userId: "user7",
    status: "active",
    trustScore: 45,
  },
  {
    id: "8",
    name: "Avery Martinez",
    age: 29,
    location: "Tech Hub",
    image: "/placeholder.svg?height=200&width=200",
    compatibility: 89,
    interests: ["Coding", "Startups", "Podcasts"],
    verified: true,
    userId: "user8",
    status: "suspended",
    trustScore: 30,
  },
]

export async function getMatches(options: GetMatchesOptions): Promise<MatchResult[]> {
  const { limit, enforceSafeMode, minScore = 50 } = options

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  let filteredMatches = [...DUMMY_MATCHES]

  if (enforceSafeMode) {
    // Apply full Safe Mode filtering
    filteredMatches = filteredMatches.filter((match) => {
      // Always block suspended/removed users
      if (match.status === "suspended" || match.status === "removed") {
        return false
      }

      // Safe Mode filters
      if (!match.verified) return false
      if (match.trustScore && match.trustScore < minScore) return false

      return true
    })
  } else {
    // Only apply hard blocks (suspended/removed)
    filteredMatches = filteredMatches.filter((match) => {
      return match.status !== "suspended" && match.status !== "removed"
    })
  }

  // Sort by compatibility and limit results
  return filteredMatches.sort((a, b) => b.compatibility - a.compatibility).slice(0, limit)
}
