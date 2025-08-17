"use client"

import { Shield, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSafeMode } from "@/contexts/safe-mode"

export function HeaderSafeModeToggle() {
  const { safeMode, setSafeMode } = useSafeMode()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSafeMode(!safeMode)}
            className={`${safeMode ? "text-green-600" : "text-gray-500"}`}
          >
            {safeMode ? <ShieldCheck size={20} /> : <Shield size={20} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{safeMode ? "Safe Mode: ON" : "Safe Mode: OFF"}</p>
          <p className="text-xs">{safeMode ? "Only verified users shown" : "All users shown"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
