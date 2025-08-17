"use client"

import { useState } from "react"
import { Shield, ShieldCheck, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSafeMode } from "@/contexts/safe-mode"

type SafeModeToggleProps = {}

export function SafeModeToggle({}: SafeModeToggleProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { safeMode, setSafeMode } = useSafeMode()

  if (!isVisible) {
    return null
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {safeMode ? (
            <ShieldCheck size={24} className="text-green-600" />
          ) : (
            <Shield size={24} className="text-gray-500" />
          )}
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {safeMode ? "Safe Mode is on, showing only verified users." : "Safe Mode is off. See all users."}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="safe-mode" checked={safeMode} onCheckedChange={setSafeMode} />
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setIsVisible(false)}>
            <X size={16} className="text-gray-500" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
