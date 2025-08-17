"use client"

import { Shield, ShieldCheck, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VerificationBadgeProps {
  verificationLevel: "unverified" | "basic" | "verified" | "premium"
  trustScore: number
  size?: "sm" | "md" | "lg"
}

export function VerificationBadge({ verificationLevel, trustScore, size = "md" }: VerificationBadgeProps) {
  const getVerificationInfo = () => {
    switch (verificationLevel) {
      case "premium":
        return {
          icon: ShieldCheck,
          color: "bg-purple-500",
          text: "Premium Verified",
          description: "Email, phone, ID, and background check verified",
        }
      case "verified":
        return {
          icon: ShieldCheck,
          color: "bg-green-500",
          text: "Verified",
          description: "Email, phone, and ID verified",
        }
      case "basic":
        return {
          icon: Shield,
          color: "bg-blue-500",
          text: "Basic",
          description: "Email and phone verified",
        }
      default:
        return {
          icon: Shield,
          color: "bg-gray-500",
          text: "Unverified",
          description: "No verification completed",
        }
    }
  }

  const verification = getVerificationInfo()
  const IconComponent = verification.icon
  const iconSize = size === "sm" ? 12 : size === "lg" ? 20 : 16

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1">
            <Badge className={`${verification.color} text-white flex items-center space-x-1`}>
              <IconComponent size={iconSize} />
              {size !== "sm" && <span>{verification.text}</span>}
            </Badge>
            {trustScore > 0 && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Star size={iconSize} className="text-yellow-500" />
                <span>{trustScore}</span>
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{verification.description}</p>
          {trustScore > 0 && <p>Trust Score: {trustScore}/100</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
