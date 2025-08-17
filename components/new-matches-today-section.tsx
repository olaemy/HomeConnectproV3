"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getMatches, type MatchResult } from "@/lib/getMatches"
import { useState, useEffect } from "react"
import { useSafeModeOptional } from "@/contexts/safe-mode"

export function NewMatchesTodaySection() {
  const { safeMode } = useSafeModeOptional()
  const [matches, setMatches] = useState<MatchResult[]>([])

  useEffect(() => {
    const fetchMatches = async () => {
      const fetchedMatches = await getMatches({
        limit: 6,
        enforceSafeMode: false,
      })
      setMatches(fetchedMatches)
    }

    fetchMatches()
  }, [safeMode])

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">New Matches Today</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See who's looking for roommates in your area right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {matches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img src={match.image || "/placeholder.svg"} alt={match.name} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">{match.compatibility}% Match</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {match.name}, {match.age}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{match.location}</p>
                <div className="flex flex-wrap gap-2">
                  {match.interests.map((interest, i) => (
                    <Badge key={i} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
