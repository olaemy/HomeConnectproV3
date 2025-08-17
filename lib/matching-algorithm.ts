export interface UserPreferences {
  ageRange?: [number, number]
  budgetRange?: [number, number]
  location?: string[]
  lifestyle?: {
    cleanliness?: number
    socialLevel?: number
    workFromHome?: boolean
    petFriendly?: boolean
    smoking?: boolean
  }
  interests?: string[]
  dealBreakers?: string[]
}

export interface UserProfile {
  id: string
  age?: number
  budget?: number
  location?: string
  lifestyle?: {
    cleanliness?: number
    socialLevel?: number
    workFromHome?: boolean
    petFriendly?: boolean
    smoking?: boolean
  }
  interests?: string[]
  verificationLevel?: "unverified" | "basic" | "verified" | "premium"
  trustScore?: number
}

export interface CompatibilityScore {
  overall: number
  breakdown: {
    age: number
    budget: number
    location: number
    lifestyle: number
    interests: number
    dealBreakers: number
    verification: number
    trust: number
  }
  reasons: string[]
}

export class MatchingAlgorithm {
  private static normalizeProfile(profile: Partial<UserProfile>): UserProfile {
    return {
      id: profile.id ?? "",
      age: profile.age ?? 25,
      budget: profile.budget ?? 1000,
      location: profile.location ?? "",
      lifestyle: {
        cleanliness: profile.lifestyle?.cleanliness ?? 5,
        socialLevel: profile.lifestyle?.socialLevel ?? 5,
        workFromHome: profile.lifestyle?.workFromHome ?? false,
        petFriendly: profile.lifestyle?.petFriendly ?? false,
        smoking: profile.lifestyle?.smoking ?? false,
      },
      interests: profile.interests ?? [],
      verificationLevel: profile.verificationLevel ?? "unverified",
      trustScore: profile.trustScore ?? 50,
    }
  }

  private static normalizePreferences(preferences: Partial<UserPreferences>): UserPreferences {
    return {
      ageRange: preferences.ageRange ?? [18, 99],
      budgetRange: preferences.budgetRange ?? [0, Number.MAX_SAFE_INTEGER],
      location: preferences.location ?? [],
      lifestyle: {
        cleanliness: preferences.lifestyle?.cleanliness ?? 5,
        socialLevel: preferences.lifestyle?.socialLevel ?? 5,
        workFromHome: preferences.lifestyle?.workFromHome ?? false,
        petFriendly: preferences.lifestyle?.petFriendly ?? false,
        smoking: preferences.lifestyle?.smoking ?? false,
      },
      interests: preferences.interests ?? [],
      dealBreakers: preferences.dealBreakers ?? [],
    }
  }

  static calculateCompatibility(
    user: UserProfile,
    candidate: UserProfile,
    preferences: UserPreferences,
  ): CompatibilityScore {
    const normalizedUser = this.normalizeProfile(user)
    const normalizedCandidate = this.normalizeProfile(candidate)
    const normalizedPreferences = this.normalizePreferences(preferences)

    const scores = {
      age: this.calculateAgeScore(this.getAge(user), this.getAge(candidate), this.getAgeRange(preferences)),
      budget: this.calculateBudgetScore(
        this.getBudget(user),
        this.getBudget(candidate),
        this.getBudgetRange(preferences),
      ),
      location: this.calculateLocationScore(
        this.getUserLocation(user),
        this.getUserLocation(candidate),
        this.getLocation(preferences),
      ),
      lifestyle: this.calculateLifestyleScore(this.getLifestyle(user), this.getLifestyle(candidate)),
      interests: this.calculateInterestsScore(this.getInterests(user), this.getInterests(candidate)),
      dealBreakers: this.calculateDealBreakersScore(candidate, preferences),
      verification: this.calculateVerificationScore(candidate),
      trust: this.calculateTrustScore(candidate),
    }

    const weights = {
      age: 0.1,
      budget: 0.15,
      location: 0.1,
      lifestyle: 0.3,
      interests: 0.2,
      dealBreakers: 0.05,
      verification: 0.1,
      trust: 0.05,
    }

    const overall = Object.entries(scores).reduce((total, [key, score]) => {
      return total + score * weights[key as keyof typeof weights]
    }, 0)

    const reasons = this.generateCompatibilityReasons(scores, user, candidate)

    return {
      overall: Math.round(overall),
      breakdown: scores,
      reasons,
    }
  }

  private static calculateAgeScore(age: number, candidateAge: number, ageRange: [number, number]): number {
    if (candidateAge >= ageRange[0] && candidateAge <= ageRange[1]) return 10

    const ageDiff = Math.min(Math.abs(candidateAge - ageRange[0]), Math.abs(candidateAge - ageRange[1]))
    return Math.max(0, 10 - ageDiff * 2)
  }

  private static calculateBudgetScore(budget: number, candidateBudget: number, budgetRange: [number, number]): number {
    if (candidateBudget >= budgetRange[0] && candidateBudget <= budgetRange[1]) return 15

    const budgetDiff = Math.min(Math.abs(candidateBudget - budgetRange[0]), Math.abs(candidateBudget - budgetRange[1]))
    const budgetScore = Math.max(0, 15 - (budgetDiff / 500) * 5)
    return budgetScore
  }

  private static calculateLocationScore(
    userLocation: string,
    candidateLocation: string,
    preferredLocations: string[],
  ): number {
    if (preferredLocations.includes(candidateLocation)) return 10

    return 5 // Partial points for nearby locations
  }

  private static calculateLifestyleScore(
    lifestyle1: UserPreferences["lifestyle"],
    lifestyle2: UserPreferences["lifestyle"],
  ): number {
    let score = 0
    let factors = 0

    // Cleanliness compatibility
    const cleanlinessDiff = Math.abs(lifestyle1.cleanliness - lifestyle2.cleanliness)
    score += Math.max(0, 10 - cleanlinessDiff)
    factors++

    // Social level compatibility
    const socialDiff = Math.abs(lifestyle1.socialLevel - lifestyle2.socialLevel)
    score += Math.max(0, 10 - socialDiff)
    factors++

    // Boolean lifestyle factors
    if (lifestyle1.workFromHome === lifestyle2.workFromHome) score += 2
    if (lifestyle1.petFriendly === lifestyle2.petFriendly) score += 3
    if (lifestyle1.smoking === lifestyle2.smoking) score += 5

    return Math.round(score / factors)
  }

  private static calculateInterestsScore(interests1: string[], interests2: string[]): number {
    const commonInterests = interests1.filter((interest) => interests2.includes(interest))
    const interestScore = Math.min(20, commonInterests.length * 4)
    return interestScore
  }

  private static calculateDealBreakersScore(candidate: UserProfile, preferences: UserPreferences): number {
    const dealBreakers = this.getDealBreakers(preferences)
    const candidateLifestyle = this.getLifestyle(candidate)

    for (const dealBreaker of dealBreakers) {
      if (dealBreaker === "smoking" && candidateLifestyle.smoking) return 0
      if (dealBreaker === "pets" && candidateLifestyle.petFriendly) return 0
      // Add more deal breaker logic as needed
    }
    return 10
  }

  private static calculateVerificationScore(candidate: UserProfile): number {
    const verificationBonus = {
      unverified: 0,
      basic: 3,
      verified: 8,
      premium: 15,
    }
    return verificationBonus[this.getVerificationLevel(candidate)]
  }

  private static calculateTrustScore(candidate: UserProfile): number {
    return Math.min(5, Math.floor(this.getTrustScore(candidate) / 10))
  }

  private static generateCompatibilityReasons(
    scores: CompatibilityScore["breakdown"],
    user: UserProfile,
    candidate: UserProfile,
  ): string[] {
    const reasons: string[] = []

    if (scores.age === 10) reasons.push("You're both within the desired age range")
    if (scores.budget === 15) reasons.push("Your budgets align perfectly")
    if (scores.location === 10) reasons.push("You're both looking in the same area")
    if (scores.lifestyle > 25) reasons.push("Similar lifestyle preferences")
    if (scores.interests > 10) reasons.push("You share common interests")
    if (scores.dealBreakers === 10) reasons.push("No deal breakers found")
    if (scores.verification > 0) reasons.push("Candidate has a good verification level")
    if (scores.trust > 0) reasons.push("Candidate has a high trust score")

    return reasons
  }

  static getRecommendations(
    user: UserProfile,
    candidates: UserProfile[],
    preferences: UserPreferences,
    limit = 10,
  ): Array<UserProfile & { compatibility: number }> {
    const scored = candidates
      .filter((candidate) => candidate.id !== user.id)
      .map((candidate) => ({
        ...candidate,
        compatibility: this.calculateCompatibility(user, candidate, preferences).overall,
      }))
      .filter((candidate) => candidate.compatibility > 50) // Minimum compatibility threshold
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, limit)

    return scored
  }

  private static getAgeRange(preferences: UserPreferences): [number, number] {
    return preferences.ageRange ?? [18, 99]
  }

  private static getBudgetRange(preferences: UserPreferences): [number, number] {
    return preferences.budgetRange ?? [0, Number.MAX_SAFE_INTEGER]
  }

  private static getLocation(preferences: UserPreferences): string[] {
    return preferences.location ?? []
  }

  private static getLifestyle(profile: UserProfile | UserPreferences): {
    cleanliness: number
    socialLevel: number
    workFromHome: boolean
    petFriendly: boolean
    smoking: boolean
  } {
    return {
      cleanliness: profile.lifestyle?.cleanliness ?? 5,
      socialLevel: profile.lifestyle?.socialLevel ?? 5,
      workFromHome: profile.lifestyle?.workFromHome ?? false,
      petFriendly: profile.lifestyle?.petFriendly ?? false,
      smoking: profile.lifestyle?.smoking ?? false,
    }
  }

  private static getInterests(profile: UserProfile): string[] {
    return profile.interests ?? []
  }

  private static getDealBreakers(preferences: UserPreferences): string[] {
    return preferences.dealBreakers ?? []
  }

  private static getAge(profile: UserProfile): number {
    return profile.age ?? 25
  }

  private static getBudget(profile: UserProfile): number {
    return profile.budget ?? 1000
  }

  private static getUserLocation(profile: UserProfile): string {
    return profile.location ?? ""
  }

  private static getVerificationLevel(profile: UserProfile): "unverified" | "basic" | "verified" | "premium" {
    return profile.verificationLevel ?? "unverified"
  }

  private static getTrustScore(profile: UserProfile): number {
    return profile.trustScore ?? 50
  }
}
