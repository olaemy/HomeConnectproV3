"use client"

import { useState } from "react"
import { Camera, Plus, X, Save, MapPin, Phone, Building, Award, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface AgentProfileData {
  name: string
  avatar: string
  agency: string
  licenseNumber: string
  phone: string
  website: string
  bio: string
  specialties: string[]
  serviceAreas: string[]
  languages: string[]
  experience: string
  achievements: string[]
  contactPreferences: {
    allowCalls: boolean
    allowTexts: boolean
    allowEmails: boolean
    responseTime: string
  }
}

export function AgentProfileForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<AgentProfileData>({
    name: "Maria Santos",
    avatar: "/placeholder.svg?height=150&width=150",
    agency: "Sunshine Properties",
    licenseNumber: "DRE #01234567",
    phone: "(415) 555-0123",
    website: "www.sunshineproperties.com",
    bio: "With over 8 years of experience in San Francisco real estate, I specialize in helping clients find their perfect home in the city's most desirable neighborhoods.",
    specialties: ["Luxury Rentals", "First-Time Renters", "Corporate Relocations"],
    serviceAreas: ["Mission District", "SOMA", "Castro", "Noe Valley"],
    languages: ["English", "Spanish", "Portuguese"],
    experience: "8+ years",
    achievements: ["Top Agent 2023", "Client Choice Award"],
    contactPreferences: {
      allowCalls: true,
      allowTexts: true,
      allowEmails: true,
      responseTime: "Within 2 hours",
    },
  })

  const [newSpecialty, setNewSpecialty] = useState("")
  const [newServiceArea, setNewServiceArea] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  const [newAchievement, setNewAchievement] = useState("")

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast({
      title: "Profile Updated",
      description: "Your agent profile has been successfully updated.",
    })
  }

  const addItem = (type: "specialties" | "serviceAreas" | "languages" | "achievements", value: string) => {
    if (!value.trim()) return

    setProfileData((prev) => ({
      ...prev,
      [type]: [...prev[type], value.trim()],
    }))

    // Clear the input
    switch (type) {
      case "specialties":
        setNewSpecialty("")
        break
      case "serviceAreas":
        setNewServiceArea("")
        break
      case "languages":
        setNewLanguage("")
        break
      case "achievements":
        setNewAchievement("")
        break
    }
  }

  const removeItem = (type: "specialties" | "serviceAreas" | "languages" | "achievements", index: number) => {
    setProfileData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your agent profile and contact preferences</p>
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
            <>
              <Save size={16} className="mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building size={20} className="mr-2 text-blue-500" />
                Basic Information
              </CardTitle>
              <CardDescription>Your primary profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={profileData.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                  />
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full p-2 bg-purple-500 hover:bg-purple-600"
                  >
                    <Camera size={14} />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold">Profile Photo</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Upload a professional headshot</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agency">Real Estate Agency</Label>
                  <Input
                    id="agency"
                    value={profileData.agency}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, agency: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input
                    id="license"
                    value={profileData.licenseNumber}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                    placeholder="www.yourwebsite.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={profileData.experience}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g., 8+ years"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  placeholder="Tell potential clients about your experience and expertise..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award size={20} className="mr-2 text-purple-500" />
                Specialties
              </CardTitle>
              <CardDescription>What types of properties do you specialize in?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profileData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 flex items-center gap-2">
                    {specialty}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-4 w-4 hover:bg-red-100"
                      onClick={() => removeItem("specialties", index)}
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add a specialty..."
                  onKeyPress={(e) => e.key === "Enter" && addItem("specialties", newSpecialty)}
                />
                <Button
                  variant="outline"
                  onClick={() => addItem("specialties", newSpecialty)}
                  disabled={!newSpecialty.trim()}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin size={20} className="mr-2 text-green-500" />
                Service Areas
              </CardTitle>
              <CardDescription>Which neighborhoods do you serve?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profileData.serviceAreas.map((area, index) => (
                  <Badge
                    key={index}
                    className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 flex items-center gap-2"
                  >
                    {area}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-4 w-4 hover:bg-red-100"
                      onClick={() => removeItem("serviceAreas", index)}
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newServiceArea}
                  onChange={(e) => setNewServiceArea(e.target.value)}
                  placeholder="Add a service area..."
                  onKeyPress={(e) => e.key === "Enter" && addItem("serviceAreas", newServiceArea)}
                />
                <Button
                  variant="outline"
                  onClick={() => addItem("serviceAreas", newServiceArea)}
                  disabled={!newServiceArea.trim()}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages size={20} className="mr-2 text-orange-500" />
                Languages
              </CardTitle>
              <CardDescription>What languages do you speak?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profileData.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1 flex items-center gap-2">
                    {language}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-4 w-4 hover:bg-red-100"
                      onClick={() => removeItem("languages", index)}
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add a language..."
                  onKeyPress={(e) => e.key === "Enter" && addItem("languages", newLanguage)}
                />
                <Button
                  variant="outline"
                  onClick={() => addItem("languages", newLanguage)}
                  disabled={!newLanguage.trim()}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award size={20} className="mr-2 text-yellow-500" />
                Achievements & Awards
              </CardTitle>
              <CardDescription>Showcase your professional accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {profileData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Award size={16} className="mr-2 text-yellow-500" />
                      <span>{achievement}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 hover:bg-red-100"
                      onClick={() => removeItem("achievements", index)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Add an achievement..."
                  onKeyPress={(e) => e.key === "Enter" && addItem("achievements", newAchievement)}
                />
                <Button
                  variant="outline"
                  onClick={() => addItem("achievements", newAchievement)}
                  disabled={!newAchievement.trim()}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone size={20} className="mr-2 text-blue-500" />
                Contact Preferences
              </CardTitle>
              <CardDescription>How clients can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Phone Calls</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow clients to call you</p>
                  </div>
                  <Switch
                    checked={profileData.contactPreferences.allowCalls}
                    onCheckedChange={(checked) =>
                      setProfileData((prev) => ({
                        ...prev,
                        contactPreferences: { ...prev.contactPreferences, allowCalls: checked },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Text Messages</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow clients to text you</p>
                  </div>
                  <Switch
                    checked={profileData.contactPreferences.allowTexts}
                    onCheckedChange={(checked) =>
                      setProfileData((prev) => ({
                        ...prev,
                        contactPreferences: { ...prev.contactPreferences, allowTexts: checked },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow clients to email you</p>
                  </div>
                  <Switch
                    checked={profileData.contactPreferences.allowEmails}
                    onCheckedChange={(checked) =>
                      setProfileData((prev) => ({
                        ...prev,
                        contactPreferences: { ...prev.contactPreferences, allowEmails: checked },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="responseTime">Expected Response Time</Label>
                <select
                  id="responseTime"
                  value={profileData.contactPreferences.responseTime}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      contactPreferences: { ...prev.contactPreferences, responseTime: e.target.value },
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
            </CardContent>
          </Card>

          {/* Profile Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Preview</CardTitle>
              <CardDescription>How clients see your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <img
                  src={profileData.avatar || "/placeholder.svg"}
                  alt="Preview"
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                />
                <div>
                  <h3 className="font-semibold">{profileData.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{profileData.agency}</p>
                </div>
                <Badge className="bg-blue-500 text-white">✓ Verified Agent</Badge>
                <div className="flex items-center justify-center">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full mr-1" />
                      ))}
                    </div>
                    <span className="text-sm ml-2">4.8 (127 reviews)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
