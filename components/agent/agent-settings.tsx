"use client"

import { useState } from "react"
import { Bell, Shield, Globe, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AgentSettings {
  notifications: {
    newInquiries: boolean
    propertyViews: boolean
    messages: boolean
    reviews: boolean
    marketingEmails: boolean
    push: boolean
    email: boolean
    sms: boolean
  }
  privacy: {
    showPhone: boolean
    showEmail: boolean
    showOnlineStatus: boolean
    allowDirectContact: boolean
  }
  availability: {
    mondayToFriday: string
    weekends: string
    responseTime: string
    autoReply: boolean
    autoReplyMessage: string
  }
  marketing: {
    featuredListings: boolean
    socialMediaSharing: boolean
    emailMarketing: boolean
    seoOptimization: boolean
  }
}

export function AgentSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<AgentSettings>({
    notifications: {
      newInquiries: true,
      propertyViews: true,
      messages: true,
      reviews: true,
      marketingEmails: false,
      push: true,
      email: true,
      sms: false,
    },
    privacy: {
      showPhone: true,
      showEmail: true,
      showOnlineStatus: true,
      allowDirectContact: true,
    },
    availability: {
      mondayToFriday: "9:00 AM - 6:00 PM",
      weekends: "10:00 AM - 4:00 PM",
      responseTime: "Within 2 hours",
      autoReply: true,
      autoReplyMessage: "Thank you for your inquiry! I'll get back to you within 2 hours during business hours.",
    },
    marketing: {
      featuredListings: true,
      socialMediaSharing: true,
      emailMarketing: false,
      seoOptimization: true,
    },
  })

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast({
      title: "Settings Updated",
      description: "Your agent settings have been successfully saved.",
    })
  }

  const updateNotificationSetting = (key: keyof typeof settings.notifications, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }))
  }

  const updatePrivacySetting = (key: keyof typeof settings.privacy, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value },
    }))
  }

  const updateMarketingSetting = (key: keyof typeof settings.marketing, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      marketing: { ...prev.marketing, [key]: value },
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your preferences and account settings</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell size={20} className="mr-2 text-blue-500" />
              Notifications
            </CardTitle>
            <CardDescription>Choose what notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Notification Delivery Preferences */}
            <div className="border-b pb-4 mb-4">
              <h4 className="font-medium mb-3">Notification Delivery</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications on your device</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => updateNotificationSetting("push", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => updateNotificationSetting("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS/WhatsApp</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive notifications via SMS or WhatsApp
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => updateNotificationSetting("sms", checked)}
                  />
                </div>
              </div>
            </div>

            {/* Notification Preview Cards */}
            <div className="mt-6 space-y-3">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview</h5>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Property Manager: Routine pest control tomorrow at 9am.
                  </p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Rent due in 3 days.</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Reminders are delivered around 7–9am local time or when due. You can change channels above.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Inquiries</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified when someone inquires about your properties
                </p>
              </div>
              <Switch
                checked={settings.notifications.newInquiries}
                onCheckedChange={(checked) => updateNotificationSetting("newInquiries", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Property Views</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when your properties are viewed</p>
              </div>
              <Switch
                checked={settings.notifications.propertyViews}
                onCheckedChange={(checked) => updateNotificationSetting("propertyViews", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Messages</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when you receive new messages</p>
              </div>
              <Switch
                checked={settings.notifications.messages}
                onCheckedChange={(checked) => updateNotificationSetting("messages", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reviews</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when you receive new reviews</p>
              </div>
              <Switch
                checked={settings.notifications.reviews}
                onCheckedChange={(checked) => updateNotificationSetting("reviews", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive tips and updates about growing your business
                </p>
              </div>
              <Switch
                checked={settings.notifications.marketingEmails}
                onCheckedChange={(checked) => updateNotificationSetting("marketingEmails", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield size={20} className="mr-2 text-green-500" />
              Privacy & Visibility
            </CardTitle>
            <CardDescription>Control what information is visible to clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Phone Number</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Display your phone number on your profile</p>
              </div>
              <Switch
                checked={settings.privacy.showPhone}
                onCheckedChange={(checked) => updatePrivacySetting("showPhone", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Email Address</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Display your email address on your profile</p>
              </div>
              <Switch
                checked={settings.privacy.showEmail}
                onCheckedChange={(checked) => updatePrivacySetting("showEmail", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Online Status</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Let clients see when you're online</p>
              </div>
              <Switch
                checked={settings.privacy.showOnlineStatus}
                onCheckedChange={(checked) => updatePrivacySetting("showOnlineStatus", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow Direct Contact</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Allow clients to contact you directly without going through the platform
                </p>
              </div>
              <Switch
                checked={settings.privacy.allowDirectContact}
                onCheckedChange={(checked) => updatePrivacySetting("allowDirectContact", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Availability Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock size={20} className="mr-2 text-purple-500" />
              Availability & Response
            </CardTitle>
            <CardDescription>Set your working hours and response preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weekdays">Monday - Friday</Label>
                <Input
                  id="weekdays"
                  value={settings.availability.mondayToFriday}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      availability: { ...prev.availability, mondayToFriday: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weekends">Weekends</Label>
                <Input
                  id="weekends"
                  value={settings.availability.weekends}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      availability: { ...prev.availability, weekends: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="responseTime">Expected Response Time</Label>
              <select
                id="responseTime"
                value={settings.availability.responseTime}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    availability: { ...prev.availability, responseTime: e.target.value },
                  }))
                }
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
              >
                <option value="Within 1 hour">Within 1 hour</option>
                <option value="Within 2 hours">Within 2 hours</option>
                <option value="Within 4 hours">Within 4 hours</option>
                <option value="Same day">Same day</option>
                <option value="Within 24 hours">Within 24 hours</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-Reply</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Send automatic replies to new inquiries</p>
              </div>
              <Switch
                checked={settings.availability.autoReply}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    availability: { ...prev.availability, autoReply: checked },
                  }))
                }
              />
            </div>
            {settings.availability.autoReply && (
              <div className="space-y-2">
                <Label htmlFor="autoReplyMessage">Auto-Reply Message</Label>
                <Textarea
                  id="autoReplyMessage"
                  value={settings.availability.autoReplyMessage}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      availability: { ...prev.availability, autoReplyMessage: e.target.value },
                    }))
                  }
                  rows={3}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Marketing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe size={20} className="mr-2 text-orange-500" />
              Marketing & Promotion
            </CardTitle>
            <CardDescription>Boost your visibility and reach more clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Featured Listings</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Allow your properties to be featured in search results
                </p>
              </div>
              <Switch
                checked={settings.marketing.featuredListings}
                onCheckedChange={(checked) => updateMarketingSetting("featuredListings", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Social Media Sharing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Allow your listings to be shared on social media
                </p>
              </div>
              <Switch
                checked={settings.marketing.socialMediaSharing}
                onCheckedChange={(checked) => updateMarketingSetting("socialMediaSharing", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Marketing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Include your properties in our email newsletters
                </p>
              </div>
              <Switch
                checked={settings.marketing.emailMarketing}
                onCheckedChange={(checked) => updateMarketingSetting("emailMarketing", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SEO Optimization</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Optimize your listings for search engines</p>
              </div>
              <Switch
                checked={settings.marketing.seoOptimization}
                onCheckedChange={(checked) => updateMarketingSetting("seoOptimization", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Actions */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Account Actions</CardTitle>
          <CardDescription>Manage your account status and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent">
              Deactivate Account Temporarily
            </Button>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent">
              Request Account Deletion
            </Button>
            <Button variant="outline">Download My Data</Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help with your account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact Support
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
