import { SafetySystem } from "../lib/safety-system"

describe("SafetySystem.isUserSafe", () => {
  beforeEach(() => {
    // Reset any static state
    SafetySystem.getInstance()
  })

  test("suspended user returns false even when safeMode=false", () => {
    // Mock a suspended user (using multiple reports as proxy for admin action)
    const suspendedUserId = "suspended-user"
    const safetySystem = SafetySystem.getInstance()

    // Add multiple reports to simulate suspension
    for (let i = 0; i < 6; i++) {
      safetySystem.reportUser(suspendedUserId, `reporter-${i}`, "harassment", "Test report")
    }

    const result = SafetySystem.isUserSafe(suspendedUserId, { safeMode: false })
    expect(result).toBe(false)
  })

  test("unverified user: true when safeMode=false, false when safeMode=true", () => {
    const unverifiedUserId = "unverified-user"

    // When safeMode is false, unverified users should be visible
    const resultSafeModeOff = SafetySystem.isUserSafe(unverifiedUserId, { safeMode: false })
    expect(resultSafeModeOff).toBe(true)

    // When safeMode is true, unverified users should be hidden
    const resultSafeModeOn = SafetySystem.isUserSafe(unverifiedUserId, { safeMode: true })
    expect(resultSafeModeOn).toBe(false)
  })

  test("low score behavior with threshold", () => {
    const lowScoreUserId = "low-score-user"

    // Test with default threshold (50)
    const resultDefault = SafetySystem.isUserSafe(lowScoreUserId, { safeMode: true })
    expect(resultDefault).toBe(false) // Score of 30 < default 50

    // Test with custom threshold
    const resultCustom = SafetySystem.isUserSafe(lowScoreUserId, { safeMode: true, minScore: 20 })
    expect(resultCustom).toBe(true) // Score of 30 > custom 20
  })

  test("personal blocklist behavior", () => {
    const blockedUserId = "blocked-user"
    const currentUserId = "current-user"
    const safetySystem = SafetySystem.getInstance()

    // Block the user
    safetySystem.blockUser(currentUserId, blockedUserId)

    // Blocked user should not be safe when safeMode is true
    const result = SafetySystem.isUserSafe(blockedUserId, { safeMode: true })
    expect(result).toBe(false)
  })
})
