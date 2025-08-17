"use client"

import { useState } from "react"
import { Flag, MoreVertical, AlertTriangle, MessageSquare, UserX, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface ReportUserDialogProps {
  userId: string
  userName: string
  variant?: "default" | "compact" | "icon-only"
  size?: "sm" | "md" | "lg"
  icon?: "flag" | "dots"
}

const reportReasons = [
  {
    id: "inappropriate-content",
    label: "Inappropriate Content",
    description: "Offensive photos, descriptions, or messages",
    icon: AlertTriangle,
  },
  {
    id: "fake-profile",
    label: "Fake Profile",
    description: "Suspicious or misleading information",
    icon: UserX,
  },
  {
    id: "harassment",
    label: "Harassment",
    description: "Unwanted contact or abusive behavior",
    icon: MessageSquare,
  },
  {
    id: "safety-concern",
    label: "Safety Concern",
    description: "Potential safety risk or dangerous behavior",
    icon: Shield,
  },
  {
    id: "spam",
    label: "Spam or Scam",
    description: "Promotional content or fraudulent activity",
    icon: Flag,
  },
]

export function ReportUserDialog({
  userId,
  userName,
  variant = "default",
  size = "md",
  icon = "flag",
}: ReportUserDialogProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!selectedReason) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setSelectedReason("")
      setAdditionalInfo("")
      setIsSuccess(false)
    }, 2000)
  }

  const TriggerIcon = icon === "dots" ? MoreVertical : Flag

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "icon-only" ? (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800">
            <TriggerIcon
              size={16}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            />
          </Button>
        ) : variant === "compact" ? (
          <Button variant="outline" size={size} className="bg-transparent">
            <TriggerIcon size={14} className="mr-1" />
            Report
          </Button>
        ) : (
          <Button variant="outline" size={size} className="bg-transparent">
            <TriggerIcon size={16} className="mr-2" />
            Report User
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield size={20} className="mr-2 text-red-500" />
            Report {userName}
          </DialogTitle>
          <DialogDescription>
            Help us keep the community safe by reporting inappropriate behavior or content.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Report Submitted</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Thank you for helping keep our community safe. We'll review this report promptly.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Why are you reporting this user?</Label>
              <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                {reportReasons.map((reason) => {
                  const IconComponent = reason.icon
                  return (
                    <div
                      key={reason.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <RadioGroupItem value={reason.id} id={reason.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={reason.id} className="flex items-center cursor-pointer">
                          <IconComponent size={16} className="mr-2 text-gray-500" />
                          <div>
                            <div className="font-medium">{reason.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{reason.description}</div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  )
                })}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="additional-info" className="text-sm font-medium mb-2 block">
                Additional Information (Optional)
              </Label>
              <Textarea
                id="additional-info"
                placeholder="Provide any additional details that might help us understand the issue..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="min-h-[80px] bg-gray-50 dark:bg-gray-800 border-0"
              />
            </div>

            <Separator />

            <div className="flex space-x-3">
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </DialogTrigger>
              <Button
                onClick={handleSubmit}
                disabled={!selectedReason || isSubmitting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Reports are reviewed by our safety team within 24 hours. False reports may result in account restrictions.
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
