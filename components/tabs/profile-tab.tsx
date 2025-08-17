"use client"
import { useState } from "react"
import { Link } from "next/link"
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  MessageCircle,
  Settings,
  Camera,
  Edit3,
  Star,
  Award,
  Calendar,
  Bell,
  Save,
  X,
  Building,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { VerificationBadge } from "@/components/safety/verification-badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface UserProfile {
  id: string
  name: string
  age: number
  avatar: string
  bio: string
  location: string
  occupation: string
  education: string
  interests: string[]
  lifestyle: {
    cleanliness: number
    socialLevel: number
    workFromHome: boolean
    petFriendly: boolean
    smoking: boolean
  }
  budget: {
    min: number
    max: number
  }
  verificationLevel: "unverified" | "basic" | "verified" | "premium"
  trustScore: number
  joinDate: string
  lastActive: string
  photos: string[]
  achievements: string[]
  preferences: {
    ageRange: [number, number]
    budgetRange: [number, number]
    location: string[]
  }
}

const mockProfile: UserProfile = {
  id: "current_user",
  name: "Alex Thompson",
  age: 28,
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "Software engineer passionate about technology and outdoor adventures. Looking for a like-minded roommate to share a great living space in SF.",
  location: "Mission District, SF",
  occupation: "Senior Software Engineer at Google",
  education: "Stanford University - Computer Science",
  interests: ["Technology", "Hiking", "Photography", "Cooking", "Travel", "Music", "Fitness"],
  lifestyle: {
    cleanliness: 8,
    socialLevel: 7,
    workFromHome: true,
    petFriendly: true,
    smoking: false,
  },
  budget: {
    min: 2000,
    max: 3000,
  },
  verificationLevel: "verified",
  trustScore: 89,
  joinDate: "2023-08-15",
  lastActive: "2024-01-15T10:30:00Z",
  photos: [
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
  ],
  achievements: ["Early Adopter", "Verified Profile", "5-Star Roommate", "Community Helper"],
  preferences: {
    ageRange: [24, 32],
    budgetRange: [1800, 3200],
    location: ["Mission District", "SOMA", "Castro", "Noe Valley"],
  },
}

export function ProfileTab() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [activeTab, setActiveTab] = useState("overview")
  const [notificationPreferences, setNotificationPreferences] = useState({
    push: true,
    email: true,
    sms: false,
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState<UserProfile>(mockProfile)

  const profileCompletion = 85 // Calculate based on filled fields

  const updateNotificationPreference = (key: keyof typeof notificationPreferences, value: boolean) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleEditProfile = () => {
    setEditForm({ ...profile })
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = () => {
    setProfile({ ...editForm })
    setIsEditModalOpen(false)
  }

  const handleCancelEdit = () => {
    setEditForm({ ...profile })
    setIsEditModalOpen(false)
  }

  const updateEditForm = (field: string, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedField = (parent: string, field: string, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof UserProfile],
        [field]: value,
      },
    }))
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-600">
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <CardContent className="relative -mt-16 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <Button
                size="sm"
                className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0 bg-white text-gray-600 hover:bg-gray-50"
              >
                <Camera size={16} />
              </Button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 mb-2">
                <h1 className="text-2xl font-bold">
                  {profile.name}, {profile.age}
                </h1>
                <VerificationBadge verificationLevel={profile.verificationLevel} trustScore={profile.trustScore} />
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                {profile.achievements.map((achievement, index) => {
                  const badgeColors = [
                    "bg-blue-100 text-blue-700",
                    "bg-green-100 text-green-700",
                    "bg-orange-100 text-orange-700",
                    "bg-indigo-100 text-indigo-700",
                  ]
                  const colorClass = badgeColors[index % badgeColors.length]

                  return (
                    <Badge key={achievement} className={`${colorClass} cursor-default`}>
                      <Award size={12} className="mr-1" />
                      {achievement}
                    </Badge>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{profile.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleEditProfile}>
                    <Edit3 size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => updateEditForm("name", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={editForm.age}
                            onChange={(e) => updateEditForm("age", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => updateEditForm("bio", e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={editForm.location}
                            onChange={(e) => updateEditForm("location", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="occupation">Occupation</Label>
                          <Input
                            id="occupation"
                            value={editForm.occupation}
                            onChange={(e) => updateEditForm("occupation", e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="education">Education</Label>
                          <Input
                            id="education"
                            value={editForm.education}
                            onChange={(e) => updateEditForm("education", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Budget Range</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budgetMin">Minimum Budget</Label>
                          <Input
                            id="budgetMin"
                            type="number"
                            value={editForm.budget.min}
                            onChange={(e) => updateNestedField("budget", "min", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="budgetMax">Maximum Budget</Label>
                          <Input
                            id="budgetMax"
                            type="number"
                            value={editForm.budget.max}
                            onChange={(e) => updateNestedField("budget", "max", Number.parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Lifestyle */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Lifestyle</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Cleanliness Level: {editForm.lifestyle.cleanliness}/10</Label>
                          <Slider
                            value={[editForm.lifestyle.cleanliness]}
                            onValueChange={(value) => updateNestedField("lifestyle", "cleanliness", value[0])}
                            max={10}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Social Level: {editForm.lifestyle.socialLevel}/10</Label>
                          <Slider
                            value={[editForm.lifestyle.socialLevel]}
                            onValueChange={(value) => updateNestedField("lifestyle", "socialLevel", value[0])}
                            max={10}
                            min={1}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="workFromHome"
                              checked={editForm.lifestyle.workFromHome}
                              onCheckedChange={(checked) => updateNestedField("lifestyle", "workFromHome", checked)}
                            />
                            <Label htmlFor="workFromHome">Work From Home</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="petFriendly"
                              checked={editForm.lifestyle.petFriendly}
                              onCheckedChange={(checked) => updateNestedField("lifestyle", "petFriendly", checked)}
                            />
                            <Label htmlFor="petFriendly">Pet Friendly</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="smoking"
                              checked={editForm.lifestyle.smoking}
                              onCheckedChange={(checked) => updateNestedField("lifestyle", "smoking", checked)}
                            />
                            <Label htmlFor="smoking">Smoking</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Interests</h3>
                      <div>
                        <Label htmlFor="interests">Interests (comma-separated)</Label>
                        <Input
                          id="interests"
                          value={editForm.interests.join(", ")}
                          onChange={(e) =>
                            updateEditForm(
                              "interests",
                              e.target.value.split(", ").filter((i) => i.trim()),
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2 pt-4 border-t">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X size={16} className="mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Profile Completion</span>
            <span className="text-sm font-normal">{profileCompletion}%</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={profileCompletion} className="mb-2" />
          <p className="text-sm text-gray-600">
            Complete your profile to get better matches and increase trust with other users.
          </p>
        </CardContent>
      </Card>

      {/* My Properties quick access section for mobile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-blue-500" />
            My Properties
          </CardTitle>
          <CardDescription>Manage your apartment listings and roommate searches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Link href="/my-properties">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">View All Properties</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage listings and inquiries</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">3</div>
                <div className="text-sm text-green-600 dark:text-green-400">Active Listings</div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">12</div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Total Inquiries</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{profile.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Briefcase size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm">{profile.occupation}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm">{profile.education}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">💰</span>
                  <span className="text-sm">
                    ${profile.budget.min.toLocaleString()} - ${profile.budget.max.toLocaleString()}/month
                  </span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="mr-2 text-yellow-500" />
                  <span className="text-sm">Trust Score: {profile.trustScore}/100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Cleanliness Level</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={profile.lifestyle.cleanliness * 10} className="flex-1" />
                    <span className="text-sm font-medium">{profile.lifestyle.cleanliness}/10</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Social Level</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={profile.lifestyle.socialLevel * 10} className="flex-1" />
                    <span className="text-sm font-medium">{profile.lifestyle.socialLevel}/10</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm">Work From Home</span>
                  <Badge variant={profile.lifestyle.workFromHome ? "default" : "secondary"}>
                    {profile.lifestyle.workFromHome ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm">Pet Friendly</span>
                  <Badge variant={profile.lifestyle.petFriendly ? "default" : "secondary"}>
                    {profile.lifestyle.petFriendly ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm">Smoking</span>
                  <Badge variant={profile.lifestyle.smoking ? "destructive" : "default"}>
                    {profile.lifestyle.smoking ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>My Photos</span>
                <Button size="sm">
                  <Camera size={16} className="mr-2" />
                  Add Photo
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profile.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button size="sm" variant="secondary">
                        <Edit3 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors">
                  <div className="text-center">
                    <Camera size={24} className="mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Add Photo</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roommate Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Age Range</label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm">
                    {profile.preferences.ageRange[0]} - {profile.preferences.ageRange[1]} years
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Budget Range</label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm">
                    ${profile.preferences.budgetRange[0].toLocaleString()} - $
                    {profile.preferences.budgetRange[1].toLocaleString()}/month
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Preferred Locations</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.preferences.location.map((location) => (
                    <Badge key={location} variant="outline">
                      <MapPin size={12} className="mr-1" />
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell size={20} className="mr-2 text-blue-500" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications on your device</p>
                </div>
                <Switch
                  checked={notificationPreferences.push}
                  onCheckedChange={(checked) => updateNotificationPreference("push", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notificationPreferences.email}
                  onCheckedChange={(checked) => updateNotificationPreference("email", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS/WhatsApp</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via SMS or WhatsApp</p>
                </div>
                <Switch
                  checked={notificationPreferences.sms}
                  onCheckedChange={(checked) => updateNotificationPreference("sms", checked)}
                />
              </div>

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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
          <Heart size={16} className="mr-2" />
          View Matches
        </Button>
        <Button variant="outline">
          <MessageCircle size={16} className="mr-2" />
          Messages
        </Button>
      </div>
    </div>
  )
}
