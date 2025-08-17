export interface RoommateProfile {
  userId: string
  apartmentId: string
  name: string
  age: number
  avatar: string
  verified: boolean
  bio: string
  interests: string[]
  lifestyle: {
    cleanliness: "very-clean" | "clean" | "moderate" | "relaxed"
    socialLevel: "very-social" | "social" | "moderate" | "quiet"
    workSchedule: "day" | "night" | "flexible" | "remote"
    guestPolicy: "frequent" | "occasional" | "rare" | "none"
  }
  preferences: {
    petFriendly: boolean
    smokingAllowed: boolean
    drinkingOk: boolean
    lgbtqFriendly: boolean
  }
  budget: {
    maxRent: number
    preferredSplit: number // percentage they're willing to pay
  }
  moveInDate: {
    earliest: Date
    latest: Date
    flexible: boolean
  }
  location: {
    city: string
    neighborhoods: string[]
    maxCommute: number // in minutes
  }
  dealBreakers: string[]
  createdAt: Date
  lastActive: Date
}

export interface RoommateMatch {
  profile1: RoommateProfile
  profile2: RoommateProfile
  compatibilityScore: number
  matchReasons: string[]
  apartmentCompatible: boolean
  budgetCompatible: boolean
  lifestyleCompatible: boolean
  locationCompatible: boolean
  matchedAt: Date
}

export class RoommateMatchingSystem {
  private static roommateProfiles: RoommateProfile[] = []
  private static matches: RoommateMatch[] = []

  static addToRoommateFeed(profile: RoommateProfile): void {
    // Remove existing profile for same user/apartment combo
    this.roommateProfiles = this.roommateProfiles.filter(
      (p) => !(p.userId === profile.userId && p.apartmentId === profile.apartmentId),
    )

    // Add new profile
    this.roommateProfiles.push(profile)

    // Find potential matches
    this.findMatches(profile)
  }

  static findMatches(newProfile: RoommateProfile): RoommateMatch[] {
    const potentialMatches: RoommateMatch[] = []

    for (const existingProfile of this.roommateProfiles) {
      // Skip self
      if (existingProfile.userId === newProfile.userId) continue

      // Check if they're looking at the same apartment or compatible locations
      const apartmentCompatible = this.checkApartmentCompatibility(newProfile, existingProfile)
      const budgetCompatible = this.checkBudgetCompatibility(newProfile, existingProfile)
      const lifestyleCompatible = this.checkLifestyleCompatibility(newProfile, existingProfile)
      const locationCompatible = this.checkLocationCompatibility(newProfile, existingProfile)

      if (apartmentCompatible || locationCompatible) {
        const compatibilityScore = this.calculateCompatibilityScore(newProfile, existingProfile)
        const matchReasons = this.generateMatchReasons(newProfile, existingProfile)

        const match: RoommateMatch = {
          profile1: newProfile,
          profile2: existingProfile,
          compatibilityScore,
          matchReasons,
          apartmentCompatible,
          budgetCompatible,
          lifestyleCompatible,
          locationCompatible,
          matchedAt: new Date(),
        }

        potentialMatches.push(match)
      }
    }

    // Sort by compatibility score
    potentialMatches.sort((a, b) => b.compatibilityScore - a.compatibilityScore)

    // Store matches
    this.matches.push(...potentialMatches)

    return potentialMatches
  }

  private static checkApartmentCompatibility(profile1: RoommateProfile, profile2: RoommateProfile): boolean {
    return profile1.apartmentId === profile2.apartmentId
  }

  private static checkBudgetCompatibility(profile1: RoommateProfile, profile2: RoommateProfile): boolean {
    // Check if their budget ranges overlap
    const totalBudget1 = profile1.budget.maxRent
    const totalBudget2 = profile2.budget.maxRent

    // Simple compatibility check - both should be able to afford similar rent ranges
    const budgetDifference = Math.abs(totalBudget1 - totalBudget2)
    return budgetDifference <= totalBudget1 * 0.3 // Within 30% of each other
  }

  private static checkLifestyleCompatibility(profile1: RoommateProfile, profile2: RoommateProfile): boolean {
    const lifestyle1 = profile1.lifestyle
    const lifestyle2 = profile2.lifestyle

    // Check for deal breakers
    const hasLifestyleDealBreakers =
      profile1.dealBreakers.some((db) => db.toLowerCase().includes("clean") && lifestyle2.cleanliness === "relaxed") ||
      profile2.dealBreakers.some((db) => db.toLowerCase().includes("clean") && lifestyle1.cleanliness === "relaxed")

    if (hasLifestyleDealBreakers) return false

    // Check basic compatibility
    const cleanlinessCompatible =
      Math.abs(this.getLifestyleScore(lifestyle1.cleanliness) - this.getLifestyleScore(lifestyle2.cleanliness)) <= 1

    const socialCompatible =
      Math.abs(this.getLifestyleScore(lifestyle1.socialLevel) - this.getLifestyleScore(lifestyle2.socialLevel)) <= 1

    return cleanlinessCompatible && socialCompatible
  }

  private static checkLocationCompatibility(profile1: RoommateProfile, profile2: RoommateProfile): boolean {
    // Check if they're looking in the same city
    if (profile1.location.city !== profile2.location.city) return false

    // Check for overlapping neighborhoods
    const commonNeighborhoods = profile1.location.neighborhoods.filter((n) =>
      profile2.location.neighborhoods.includes(n),
    )

    return commonNeighborhoods.length > 0
  }

  private static calculateCompatibilityScore(profile1: RoommateProfile, profile2: RoommateProfile): number {
    let score = 0
    let factors = 0

    // Lifestyle compatibility (30%)
    const lifestyleScore = this.calculateLifestyleScore(profile1.lifestyle, profile2.lifestyle)
    score += lifestyleScore * 0.3
    factors += 0.3

    // Interest compatibility (25%)
    const interestScore = this.calculateInterestScore(profile1.interests, profile2.interests)
    score += interestScore * 0.25
    factors += 0.25

    // Budget compatibility (20%)
    const budgetScore = this.calculateBudgetScore(profile1.budget, profile2.budget)
    score += budgetScore * 0.2
    factors += 0.2

    // Preference compatibility (15%)
    const preferenceScore = this.calculatePreferenceScore(profile1.preferences, profile2.preferences)
    score += preferenceScore * 0.15
    factors += 0.15

    // Location compatibility (10%)
    const locationScore = this.calculateLocationScore(profile1.location, profile2.location)
    score += locationScore * 0.1
    factors += 0.1

    return Math.round(score)
  }

  private static calculateLifestyleScore(
    lifestyle1: RoommateProfile["lifestyle"],
    lifestyle2: RoommateProfile["lifestyle"],
  ): number {
    let score = 0
    let factors = 0

    // Cleanliness compatibility
    const cleanDiff = Math.abs(
      this.getLifestyleScore(lifestyle1.cleanliness) - this.getLifestyleScore(lifestyle2.cleanliness),
    )
    score += Math.max(0, 100 - cleanDiff * 25)
    factors++

    // Social level compatibility
    const socialDiff = Math.abs(
      this.getLifestyleScore(lifestyle1.socialLevel) - this.getLifestyleScore(lifestyle2.socialLevel),
    )
    score += Math.max(0, 100 - socialDiff * 25)
    factors++

    // Work schedule compatibility
    if (
      lifestyle1.workSchedule === lifestyle2.workSchedule ||
      lifestyle1.workSchedule === "flexible" ||
      lifestyle2.workSchedule === "flexible"
    ) {
      score += 100
    } else {
      score += 50
    }
    factors++

    return Math.round(score / factors)
  }

  private static calculateInterestScore(interests1: string[], interests2: string[]): number {
    const commonInterests = interests1.filter((interest) => interests2.includes(interest))
    const totalInterests = new Set([...interests1, ...interests2]).size

    if (totalInterests === 0) return 50

    return Math.round((commonInterests.length / Math.max(interests1.length, interests2.length)) * 100)
  }

  private static calculateBudgetScore(budget1: RoommateProfile["budget"], budget2: RoommateProfile["budget"]): number {
    const budgetDiff = Math.abs(budget1.maxRent - budget2.maxRent)
    const avgBudget = (budget1.maxRent + budget2.maxRent) / 2
    const compatibility = Math.max(0, 100 - (budgetDiff / avgBudget) * 100)

    return Math.round(compatibility)
  }

  private static calculatePreferenceScore(
    prefs1: RoommateProfile["preferences"],
    prefs2: RoommateProfile["preferences"],
  ): number {
    const factors = ["petFriendly", "smokingAllowed", "drinkingOk", "lgbtqFriendly"] as const
    let matches = 0

    factors.forEach((factor) => {
      if (prefs1[factor] === prefs2[factor]) {
        matches++
      }
    })

    return Math.round((matches / factors.length) * 100)
  }

  private static calculateLocationScore(loc1: RoommateProfile["location"], loc2: RoommateProfile["location"]): number {
    if (loc1.city !== loc2.city) return 0

    const commonNeighborhoods = loc1.neighborhoods.filter((n) => loc2.neighborhoods.includes(n))
    return commonNeighborhoods.length > 0 ? 80 : 60
  }

  private static generateMatchReasons(profile1: RoommateProfile, profile2: RoommateProfile): string[] {
    const reasons: string[] = []

    // Same apartment
    if (profile1.apartmentId === profile2.apartmentId) {
      reasons.push("Both interested in the same apartment")
    }

    // Similar interests
    const commonInterests = profile1.interests.filter((interest) => profile2.interests.includes(interest))
    if (commonInterests.length >= 2) {
      reasons.push(`Share ${commonInterests.length} common interests`)
    }

    // Compatible lifestyle
    const lifestyleScore = this.calculateLifestyleScore(profile1.lifestyle, profile2.lifestyle)
    if (lifestyleScore > 80) {
      reasons.push("Very compatible lifestyles")
    }

    // Similar budget
    const budgetScore = this.calculateBudgetScore(profile1.budget, profile2.budget)
    if (budgetScore > 80) {
      reasons.push("Similar budget ranges")
    }

    // Both verified
    if (profile1.verified && profile2.verified) {
      reasons.push("Both verified users")
    }

    return reasons
  }

  private static getLifestyleScore(level: string): number {
    const scores = {
      "very-clean": 4,
      clean: 3,
      moderate: 2,
      relaxed: 1,
      "very-social": 4,
      social: 3,
      quiet: 1,
    }
    return scores[level as keyof typeof scores] || 2
  }

  // Public methods for getting matches
  static getMatchesForUser(userId: string): RoommateMatch[] {
    return this.matches
      .filter((match) => match.profile1.userId === userId || match.profile2.userId === userId)
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
  }

  static getRoommateFeed(userId?: string): RoommateProfile[] {
    const profiles = this.roommateProfiles.filter((p) => p.userId !== userId)

    // Sort by most recent and compatibility if user provided
    profiles.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime())

    return profiles
  }

  static removeFromFeed(userId: string, apartmentId?: string): void {
    if (apartmentId) {
      this.roommateProfiles = this.roommateProfiles.filter(
        (p) => !(p.userId === userId && p.apartmentId === apartmentId),
      )
    } else {
      this.roommateProfiles = this.roommateProfiles.filter((p) => p.userId !== userId)
    }
  }
}
