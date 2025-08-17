"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { User, Building, X, Plus, Wifi, Dumbbell, Car, Utensils, Home, Wrench, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import PhotosCard from "@/components/photos-card"

type PostType = "roommate" | "apartment"

const lifestyleTags = [
  "Clean & Organized",
  "Social & Outgoing",
  "Quiet & Studious",
  "Early Bird",
  "Night Owl",
  "Fitness Enthusiast",
  "Foodie",
  "Pet Lover",
  "Non-Smoker",
  "420 Friendly",
  "LGBTQ+ Friendly",
  "Professional",
  "Student",
  "Remote Worker",
  "Minimalist",
  "Plant Parent",
  "Music Lover",
  "Gamer",
  "Outdoor Enthusiast",
  "Homebody",
  "Party-Friendly",
  "Eco-Conscious",
  "Tech Savvy",
  "Artist/Creative",
]

const amenityTags = [
  "In-Unit Laundry",
  "Dishwasher",
  "Air Conditioning",
  "Heating",
  "Parking",
  "Gym/Fitness Center",
  "Pool",
  "Rooftop Access",
  "Balcony/Patio",
  "Hardwood Floors",
  "Pet Friendly",
  "Furnished",
  "WiFi Included",
  "Utilities Included",
  "Elevator",
  "Storage Space",
  "Bike Storage",
  "Garden Access",
  "Fireplace",
  "Walk-in Closet",
  "High Ceilings",
  "Modern Kitchen",
  "Updated Bathroom",
  "Near Public Transit",
  "Near Shopping",
  "Quiet Neighborhood",
]

const amenityIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "WiFi Included": Wifi,
  "Gym/Fitness Center": Dumbbell,
  Parking: Car,
  Kitchen: Utensils,
  "Modern Kitchen": Utensils,
  "In-Unit Laundry": Wrench,
  "Utilities Included": Shield,
}

export default function AddPage() {
  const { user } = useAuth()
  const [postType, setPostType] = useState<PostType>("roommate")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const [managerName, setManagerName] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    budget: "",
    moveInDate: "",
    images: [] as string[],
  })

  const currentTags = postType === "roommate" ? lifestyleTags : amenityTags
  const tagLabel = postType === "roommate" ? "Lifestyle Tags" : "Amenities"
  const tagDescription =
    postType === "roommate"
      ? "Select tags that describe your lifestyle and what you're looking for in a roommate"
      : "Select amenities and features available in your apartment"

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    // Simulate file upload with placeholder
    if (formData.images.length < 6) {
      addPhoto()
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const addCustomTag = () => {
    const value = customTag.trim()
    if (value && !selectedTags.includes(value)) {
      setSelectedTags((prev) => [...prev, value])
      setCustomTag("")
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }

  const handleSubmit = () => {
    const submissionData = {
      postType,
      ...formData,
      tags: selectedTags,
      managerName: postType === "apartment" ? managerName : undefined,
    }

    console.log("Submitting:", submissionData)
    setFormData({
      title: "",
      description: "",
      location: "",
      budget: "",
      moveInDate: "",
      images: [],
    })
    setSelectedTags([])
    setManagerName("")
  }

  const handlePostTypeChange = (newType: PostType) => {
    setPostType(newType)
    setSelectedTags([]) // reset tags when switching
  }

  const handleManagerNameChange = (name: string) => {
    setManagerName(name)
    if (user?.id && name.trim()) {
      localStorage.setItem(
        `manager-name-${user.id}`,
        JSON.stringify({
          managerName: name,
          lastUpdated: new Date().toISOString(),
        }),
      )
    }
  }

  const addPhoto = () => {
    const placeholder = `/placeholder.svg?height=300&width=400&text=${postType}+photo+${formData.images.length + 1}`
    setFormData((prev) => ({ ...prev, images: [...prev.images, placeholder] }))
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const getManagerDisplayName = (managerId: string | null) => {
    if (!managerId) return "Unknown"
    if (managerId === user?.id) return user?.name || "You"

    const managerMap: Record<string, string> = {
      "manager-1": "Jane Doe",
      "manager-2": "Bright Homes Agency",
      "manager-3": "Pacific Property Management",
      "manager-4": "Sarah Johnson",
    }

    return managerMap[managerId] || "Unknown Manager"
  }

  useEffect(() => {
    if (user?.id) {
      const savedManagerData = localStorage.getItem(`manager-name-${user.id}`)
      if (savedManagerData) {
        try {
          const parsed = JSON.parse(savedManagerData)
          setManagerName(parsed.managerName || "")
        } catch (error) {
          console.log("[v0] Error loading saved manager name:", error)
        }
      }
    }
  }, [user])

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Listing
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Share your space or find your perfect roommate
          </p>
        </div>

        <div className="mb-6">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
            <button
              onClick={() => handlePostTypeChange("roommate")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-200 ${
                postType === "roommate"
                  ? "bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-300"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <User size={20} className="mr-2" />
              Looking for Roommate
            </button>
            <button
              onClick={() => handlePostTypeChange("apartment")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl transition-all duration-200 ${
                postType === "apartment"
                  ? "bg-white dark:bg-gray-700 shadow text-purple-600 dark:text-purple-300"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Building size={20} className="mr-2" />
              Listing Apartment
            </button>
          </div>
        </div>

        <PhotosCard
          photos={formData.images}
          onRemove={removePhoto}
          onAdd={addPhoto}
          dragActive={dragActive}
          onDrag={handleDrag}
          onDrop={handleDrop}
          headerGradient={postType === "roommate" ? "from-purple-500 to-pink-500" : "from-blue-500 to-purple-500"}
          title="Photos"
          subtitle={
            postType === "roommate"
              ? "Upload photos to showcase your lifestyle and space preferences"
              : "Upload high-quality images to showcase your apartment"
          }
        />

        <Card className="p-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm mb-6">
          <h3 className="font-semibold mb-3">Basic Information</h3>

          <div className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                placeholder={postType === "roommate" ? "Looking for a roommate in..." : "Beautiful 2BR apartment in..."}
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                placeholder={
                  postType === "roommate"
                    ? "Tell potential roommates about yourself and what you're looking for..."
                    : "Describe your apartment, amenities, and neighborhood..."
                }
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-gray-50 dark:bg-gray-800 min-h-[120px]"
              />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm mb-6">
          <h3 className="font-semibold mb-2 flex items-center">
            {postType === "roommate" ? (
              <User size={20} className="mr-2 text-pink-500" />
            ) : (
              <Building size={20} className="mr-2 text-blue-500" />
            )}
            {tagLabel}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tagDescription}</p>

          {selectedTags.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Selected ({selectedTags.length})</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <motion.div key={tag} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Badge
                      className={`${
                        postType === "roommate"
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      } px-3 py-1 cursor-pointer hover:opacity-90 transition-opacity`}
                      onClick={() => removeTag(tag)}
                    >
                      {postType === "apartment" &&
                        (() => {
                          const Icon = amenityIconMap[tag] || Home
                          return <Icon size={12} className="mr-1" />
                        })()}
                      {tag}
                      <X size={12} className="ml-1" />
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Available {postType === "roommate" ? "Tags" : "Amenities"}</h4>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {currentTags
                .filter((tag) => !selectedTags.includes(tag))
                .map((tag) => {
                  const Icon = postType === "apartment" ? amenityIconMap[tag] || Home : undefined
                  return (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors px-3 py-1"
                      onClick={() => toggleTag(tag)}
                    >
                      {Icon ? <Icon size={12} className="mr-1" /> : null}
                      {tag}
                      <Plus size={12} className="ml-1" />
                    </Badge>
                  )
                })}
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder={`Add custom ${postType === "roommate" ? "lifestyle tag" : "amenity"}...`}
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustomTag()}
              className="bg-gray-50 dark:bg-gray-800 flex-1"
            />
            <Button
              onClick={addCustomTag}
              disabled={!customTag.trim()}
              variant="outline"
              size="sm"
              className="px-4 bg-transparent"
            >
              <Plus size={16} />
            </Button>
          </div>
        </Card>

        {postType === "apartment" && (
          <Card className="p-4 border mb-6">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Property Manager Name</label>
                <Input
                  placeholder="Enter your property manager name (e.g., John Smith, ABC Property Management)"
                  value={managerName}
                  onChange={(e) => handleManagerNameChange(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-800"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  This name will be displayed as the public contact for your listing
                </p>
              </div>
            </div>
          </Card>
        )}

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {postType === "apartment" && managerName.trim() && (
            <div className="mb-4 flex justify-center">
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-3 py-1.5 text-sm font-medium">
                <Building size={14} className="mr-1.5" />
                Posting as Property Manager: {managerName}
              </Badge>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={postType === "apartment" && !managerName.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {postType === "roommate" ? "Post Roommate Search" : "List Apartment"}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
