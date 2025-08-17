"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { CompatibilityScore } from "@/lib/matching-algorithm"

interface CompatibilityDisplayProps {
  compatibility: CompatibilityScore
}

export function CompatibilityDisplay({ compatibility }: CompatibilityDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Compatibility Score</h3>
        <div className={`text-2xl font-bold ${getScoreColor(compatibility.overall)}`}>{compatibility.overall}%</div>
      </div>

      <div className="space-y-3 mb-4">
        {Object.entries(compatibility.breakdown).map(([category, score]) => (
          <div key={category} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="capitalize">{category}</span>
              <span className={getScoreColor(score)}>{score}%</span>
            </div>
            <Progress value={score} className="h-2" />
          </div>
        ))}
      </div>

      {compatibility.reasons.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Why you're compatible:</h4>
          <div className="flex flex-wrap gap-1">
            {compatibility.reasons.map((reason, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {reason}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
