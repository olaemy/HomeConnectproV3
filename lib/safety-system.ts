export interface SafetyReport {
  id: string
  reporterId: string
  reportedUserId: string
  type: "harassment" | "fake_profile" | "inappropriate_content" | "scam" | "other"
  description: string
  evidence?: string[]
  status: "pending" | "investigating" | "resolved" | "dismissed"
  createdAt: Date
  updatedAt: Date
}

export interface SafetyFlags {
  hasMultipleReports: boolean
  hasUnverifiedPhotos: boolean
  hasInconsistentInfo: boolean
  hasLowTrustScore: boolean
  isNewAccount: boolean
  hasBeenReported: boolean
}

export interface SafetySettings {
  safeMode: boolean
  hideUnverifiedUsers: boolean
  requirePhotoVerification: boolean
  minimumTrustScore: number
  blockNewAccounts: boolean
  autoHideReportedUsers: boolean
}

export class SafetySystem {
  private static instance: SafetySystem
  private reports: SafetyReport[] = []
  private blockedUsers: Set<string> = new Set()

  static getInstance(): SafetySystem {
    if (!SafetySystem.instance) {
      SafetySystem.instance = new SafetySystem()
    }
    return SafetySystem.instance
  }

  // Report a user
  reportUser(
    reporterId: string,
    reportedUserId: string,
    type: SafetyReport["type"],
    description: string,
    evidence?: string[],
  ): string {
    const report: SafetyReport = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      reporterId,
      reportedUserId,
      type,
      description,
      evidence,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.reports.push(report)
    return report.id
  }

  // Get safety flags for a user
  getSafetyFlags(userId: string): SafetyFlags {
    const userReports = this.reports.filter((r) => r.reportedUserId === userId)

    return {
      hasMultipleReports: userReports.length >= 3,
      hasUnverifiedPhotos: false, // Would be determined by photo verification system
      hasInconsistentInfo: false, // Would be determined by profile analysis
      hasLowTrustScore: false, // Would be determined by trust score calculation
      isNewAccount: false, // Would be determined by account creation date
      hasBeenReported: userReports.length > 0,
    }
  }

  // Check if user should be hidden based on safety settings
  shouldHideUser(userId: string, settings: SafetySettings): boolean {
    if (!settings.safeMode) return false

    const flags = this.getSafetyFlags(userId)

    if (settings.autoHideReportedUsers && flags.hasBeenReported) return true
    if (settings.hideUnverifiedUsers && flags.hasUnverifiedPhotos) return true
    if (settings.blockNewAccounts && flags.isNewAccount) return true

    return false
  }

  // Block a user
  blockUser(userId: string): void {
    this.blockedUsers.add(userId)
  }

  // Unblock a user
  unblockUser(userId: string): void {
    this.blockedUsers.delete(userId)
  }

  // Check if user is blocked
  isUserBlocked(userId: string): boolean {
    return this.blockedUsers.has(userId)
  }

  // Get all reports for admin review
  getAllReports(): SafetyReport[] {
    return [...this.reports]
  }

  // Update report status (admin function)
  updateReportStatus(reportId: string, status: SafetyReport["status"]): boolean {
    const report = this.reports.find((r) => r.id === reportId)
    if (report) {
      report.status = status
      report.updatedAt = new Date()
      return true
    }
    return false
  }

  // Get safety score for a user (0-100)
  getSafetyScore(userId: string): number {
    const flags = this.getSafetyFlags(userId)
    let score = 100

    if (flags.hasMultipleReports) score -= 30
    if (flags.hasUnverifiedPhotos) score -= 15
    if (flags.hasInconsistentInfo) score -= 20
    if (flags.hasLowTrustScore) score -= 25
    if (flags.isNewAccount) score -= 10

    return Math.max(0, score)
  }

  // Generate safety recommendations
  getSafetyRecommendations(userId: string): string[] {
    const flags = this.getSafetyFlags(userId)
    const recommendations: string[] = []

    if (flags.hasUnverifiedPhotos) {
      recommendations.push("Verify your photos to increase trust")
    }
    if (flags.hasInconsistentInfo) {
      recommendations.push("Update your profile information for consistency")
    }
    if (flags.isNewAccount) {
      recommendations.push("Complete your profile to build trust with other users")
    }

    return recommendations
  }

  static isUserSafe(userId: string, opts?: { safeMode?: boolean; minScore?: number }): boolean {
    const instance = SafetySystem.getInstance()

    // Check for suspended/removed users using safety flags as proxy
    const flags = instance.getSafetyFlags(userId)

    // If user has multiple reports (indicating admin suspension/removal), block immediately
    if (flags.hasMultipleReports) return false

    if (opts?.safeMode === true) {
      // If user is blocked by current viewer (personal blocklist)
      if (instance.isUserBlocked(userId)) return false

      // If user is unverified (using unverified photos as proxy)
      if (flags.hasUnverifiedPhotos) return false

      // If trust/safety score exists and is below threshold
      const score = instance.getSafetyScore(userId)
      const minScore = opts?.minScore ?? 50
      if (score < minScore) return false

      // If shouldHideUser returns true (using default safe mode settings)
      const defaultSettings: SafetySettings = {
        safeMode: true,
        hideUnverifiedUsers: true,
        requirePhotoVerification: false,
        minimumTrustScore: minScore,
        blockNewAccounts: false,
        autoHideReportedUsers: true,
      }
      if (instance.shouldHideUser(userId, defaultSettings)) return false
    }

    // Otherwise return true
    return true
  }
}

// Export singleton instance
export const safetySystem = SafetySystem.getInstance()
