"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Camera,
  MapPin,
  DollarSign,
  Calendar,
  User,
  Building,
  X,
  Plus,
  Wifi,
  Dumbbell,
  Car,
  Waves,
  Wind,
  ThermometerSun,
  PawPrint,
  Bike,
  Leaf,
  Flame,
  Bus,
  ShoppingBag,
  UtensilsCrossed,
  ShowerHead,
  DoorOpen,
  MapPin as DefaultAmenityIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"

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
  "Carpet",
  "Pet Friendly",
  "Furnished",
  "Unfurnished",
  "WiFi Included",
  "Utilities Included",
  "Doorman/Concierge",
  "Elevator",
  "Storage Space",
  "Bike Storage",
  "Garden Access",
  "Fireplace",
  "Walk-in Closet",
  "Bay Windows",
  "High Ceilings",
  "Modern Kitchen",
  "Updated Bathroom",
  "Near Public Transit",
  "Near Shopping",
  "Quiet Neighborhood",
]

// Map common amenities to icons (fallback to MapPin if not found)
const amenityIconMap: Record<string, React.ElementType> = {
  "WiFi Included": Wifi,
  "Gym/Fitness Center": Dumbbell,
  Parking: Car,
  Pool: Waves,
  "Air Conditioning": Wind,
  Heating: ThermometerSun,
  "Pet Friendly": PawPrint,
  "Bike Storage": Bike,
  "Garden Access": Leaf,
  Fireplace: Flame,
  "Near Public Transit": Bus,
  "Near Shopping": ShoppingBag,
  "Modern Kitchen": UtensilsCrossed,
  "Updated Bathroom": ShowerHead,
  "Balcony/Patio": DoorOpen,
}

function TagPill({ tag, onClick }: { tag: string; onClick?: () => void }) {
  const Icon = amenityIconMap[tag] || DefaultAmenityIcon
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
      <Badge
        onClick={onClick}
        variant="outline"
        className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 px-4 py-2 flex items-center gap-2 text-sm font-medium"
      >
        <Icon className="w-4 h-4 text-blue-500" />
        {tag}
      </Badge>
    </motion.div>
  )
}

export function AddTab() {
  const { user } = useAuth()
  const [postType, setPostType] = useState<PostType>("roommate")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")
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

  const handleImageUpload = () => {
    const newImage = `/placeholder.svg?height=400&width=400&query=${postType}+listing+photo`
    setFormData((prev) => ({ ...prev, images: [...prev.images, newImage] }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
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
    console.log("Submitting:", { postType, ...formData, tags: selectedTags })
    setFormData({ title: "", description: "", location: "", budget: "", moveInDate: "", images: [] })
    setSelectedTags([])
  }

  const handlePostTypeChange = (newType: PostType) => {
    setPostType(newType)
    setSelectedTags([]) // reset tags when switching
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Listing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Share your space or find your perfect roommate</p>
        </div>

        <div className="mb-8">
          <div className="flex bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-2 shadow-inner">
            <button
              onClick={() => handlePostTypeChange("roommate")}
              className={`flex-1 flex items-center justify-center py-4 px-6 rounded-2xl transition-all duration-300 font-medium ${
                postType === "roommate"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-white transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50"
              }`}
            >
              <User size={22} className="mr-3" />
              <span className="text-sm sm:text-base">Looking for Roommate</span>
            </button>
            <button
              onClick={() => handlePostTypeChange("apartment")}
              className={`flex-1 flex items-center justify-center py-4 px-6 rounded-2xl transition-all duration-300 font-medium ${
                postType === "apartment"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg text-white transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50"
              }`}
            >
              <Building size={22} className="mr-3" />
              <span className="text-sm sm:text-base">Listing Apartment</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <Card className="p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-xl text-white flex items-center">
                <Camera size={24} className="mr-3" />
                Photos
              </h3>
              <p className="text-purple-100 text-sm mt-1">Add up to 6 photos. First photo will be your cover image.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {formData.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))}

              {formData.images.length < 6 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleImageUpload}
                  className="aspect-square border-3 border-dashed border-purple-300 dark:border-purple-600 rounded-2xl flex flex-col items-center justify-center text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20"
                  aria-label="Add photo"
                >
                  <Camera size={32} className="mb-2" />
                  <span className="text-xs font-medium">Add Photo</span>
                </motion.button>
              )}
            </div>
          </Card>

          <Card className="p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-xl text-white flex items-center">
                <User size={24} className="mr-3" />
                Basic Information
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Title</label>
                <Input
                  placeholder={
                    postType === "roommate" ? "Looking for a roommate in..." : "Beautiful 2BR apartment in..."
                  }
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-4 px-6 text-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Description</label>
                <Textarea
                  placeholder={
                    postType === "roommate"
                      ? "Tell potential roommates about yourself and what you're looking for..."
                      : "Describe your apartment, amenities, and neighborhood..."
                  }
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-4 px-6 min-h-[140px] text-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-200"
                />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-xl text-white flex items-center">
                <MapPin size={24} className="mr-3" />
                Location & Details
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center">
                  <MapPin size={18} className="mr-2 text-blue-500" />
                  Location
                </label>
                <Input
                  placeholder="e.g., Mission District, San Francisco"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  className="bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-4 px-6 text-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center">
                    <DollarSign size={18} className="mr-2 text-green-500" />
                    {postType === "roommate" ? "Budget" : "Rent"}
                  </label>
                  <Input
                    placeholder="$1,500"
                    value={formData.budget}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                    className="bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-4 px-6 text-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center">
                    <Calendar size={18} className="mr-2 text-purple-500" />
                    {postType === "roommate" ? "Move-in Date" : "Available From"}
                  </label>
                  <Input
                    type="date"
                    value={formData.moveInDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, moveInDate: e.target.value }))}
                    className="bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-4 px-6 text-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
            <div
              className={`bg-gradient-to-r ${postType === "roommate" ? "from-pink-500 to-rose-500" : "from-indigo-500 to-purple-500"} rounded-2xl p-4 mb-6`}
            >
              <h3 className="font-bold text-xl text-white flex items-center">
                {postType === "roommate" ? (
                  <User size={24} className="mr-3" />
                ) : (
                  <Building size={24} className="mr-3" />
                )}
                {tagLabel}
              </h3>
              <p className="text-white/90 text-sm mt-1">{tagDescription}</p>
            </div>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Selected ({selectedTags.length})
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedTags.map((tag) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {postType === "apartment" ? (
                        <Badge
                          className="px-4 py-2 cursor-pointer hover:opacity-80 transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg rounded-xl text-sm font-medium"
                          onClick={() => removeTag(tag)}
                        >
                          {amenityIconMap[tag] ? (
                            (() => {
                              const Icon = amenityIconMap[tag]!
                              return <Icon className="w-4 h-4" />
                            })()
                          ) : (
                            <DefaultAmenityIcon className="w-4 h-4" />
                          )}
                          {tag}
                          <X size={14} className="ml-1 hover:bg-white/20 rounded-full p-0.5" />
                        </Badge>
                      ) : (
                        <Badge
                          className="px-4 py-2 cursor-pointer hover:opacity-80 transition-all duration-200 bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg rounded-xl text-sm font-medium"
                          onClick={() => removeTag(tag)}
                        >
                          {tag}
                          <X size={14} className="ml-2 hover:bg-white/20 rounded-full p-0.5" />
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Tags */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Available Tags</h4>
              <div className="flex flex-wrap gap-3 max-h-64 overflow-y-auto p-2 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl">
                {currentTags
                  .filter((tag) => !selectedTags.includes(tag))
                  .map((tag) => (
                    <div key={tag} onClick={() => toggleTag(tag)}>
                      {postType === "apartment" ? (
                        <TagPill tag={tag} />
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 dark:hover:from-pink-900/20 dark:hover:to-rose-900/20 hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300 px-4 py-2 flex items-center gap-2 text-sm font-medium"
                          >
                            {tag}
                            <Plus size={14} />
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Custom Tag Input */}
            <div className="flex gap-3">
              <Input
                placeholder={`Add custom ${postType === "roommate" ? "lifestyle tag" : "amenity"}...`}
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTag())}
                className="bg-gray-50 dark:bg-gray-800 border-0 rounded-2xl py-4 px-6 flex-1 text-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-200"
              />
              <Button
                onClick={addCustomTag}
                disabled={!customTag.trim()}
                className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-3xl shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                <Plus size={20} />
              </Button>
            </div>
          </Card>

          {/* User Role Badge */}
          {user && (
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0 shadow-xl rounded-3xl">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  {user.role === "agent" ? (
                    <Building size={24} className="text-white" />
                  ) : (
                    <User size={24} className="text-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Posting as {user.name}</p>
                  <Badge
                    className={`mt-1 ${
                      user.role === "agent"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    } px-3 py-1 rounded-xl font-medium`}
                  >
                    {user.role === "agent" ? "Verified Agent" : "Regular User"}
                  </Badge>
                </div>
              </div>
            </Card>
          )}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            <Button
              onClick={handleSubmit}
              className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold text-lg rounded-3xl shadow-2xl focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300"
            >
              {postType === "roommate" ? "🏠 Post Roommate Search" : "🏢 List Apartment"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
