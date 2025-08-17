"use client"

import { useState } from "react"
import { Moon, Sun, Monitor, Bell, Shield, User, Palette, Globe, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useSafeMode } from "@/contexts/safe-mode"

export default function SettingsPage() {
  const { safeMode, setSafeMode } = useSafeMode()
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("en")
  const [soundVolume, setSoundVolume] = useState([75])

  // Notification preferences
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(false)

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState("public")
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)
  const [allowDirectMessages, setAllowDirectMessages] = useState(true)

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how the app looks and feels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={theme === option.value ? "default" : "outline"}
                  className="flex items-center gap-2 h-auto p-3"
                  onClick={() => setTheme(option.value)}
                >
                  <option.icon className="h-4 w-4" />
                  <span className="text-sm">{option.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Sound Volume</label>
            <div className="px-3">
              <Slider value={soundVolume} onValueChange={setSoundVolume} max={100} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>{soundVolume[0]}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose how you want to be notified about activity.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Push Notifications</label>
              <p className="text-xs text-muted-foreground">Receive notifications on your device</p>
            </div>
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Email Notifications</label>
              <p className="text-xs text-muted-foreground">Get notified via email</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">SMS Notifications</label>
              <p className="text-xs text-muted-foreground">Receive text messages for important updates</p>
            </div>
            <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Marketing Emails</label>
              <p className="text-xs text-muted-foreground">Receive promotional content and tips</p>
            </div>
            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Safety */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Safety
          </CardTitle>
          <CardDescription>Control your privacy and safety settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Safe Mode</label>
              <p className="text-xs text-muted-foreground">Filter out unverified users and content</p>
            </div>
            <Switch checked={safeMode} onCheckedChange={setSafeMode} />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Profile Visibility</label>
            <Select value={profileVisibility} onValueChange={setProfileVisibility}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                <SelectItem value="verified">Verified Users Only</SelectItem>
                <SelectItem value="private">Private - Only approved connections</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Show Online Status</label>
              <p className="text-xs text-muted-foreground">Let others see when you're active</p>
            </div>
            <Switch checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Allow Direct Messages</label>
              <p className="text-xs text-muted-foreground">Let other users message you directly</p>
            </div>
            <Switch checked={allowDirectMessages} onCheckedChange={setAllowDirectMessages} />
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account
          </CardTitle>
          <CardDescription>Manage your account settings and data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <Globe className="mr-2 h-4 w-4" />
            Export My Data
          </Button>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>

          <Separator />

          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
