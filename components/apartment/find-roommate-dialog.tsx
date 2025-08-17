"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  Home,
  DollarSign,
  Calendar,
  Check,
  Loader2,
  MapPin,
  BedDouble,
  Bath,
  Square,
  User,
  Heart,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface UserProfile {
  name: string
  age: number
  avatar: string
  verified: boolean
  bio: string
  interests: string[]
}

interface Apartment {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  available: string
  address: string
}

interface FindRoommateDialogProps {
  apartment: Apartment
  userProfile: UserProfile
}

export function FindRoommateDialog({ apartment, userProfile }: FindRoommateDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFindRoommate = async () => {
    setIsLoading(true)

    // Simulate API call to add user to roommate feed
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSuccess(true)

    // Auto close after success
    setTimeout(() => {
      setIsOpen(false)
      setIsSuccess(false)
    }, 2500)
  }

  const splitRent = Math.round(apartment.price / 2)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
          size="lg"
        >
          <Users size={18} className="mr-2" />
          Find a Roommate
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Find a Roommate for This Apartment</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check size={40} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">You're Now Looking for a Roommate!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your profile has been added to the roommate feed. Other users interested in sharing this apartment will
                be able to find and match with you.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p className="text-sm text-green-700 dark:text-green-300">
                  💡 You'll receive notifications when potential roommates are interested in matching with you!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Apartment Summary */}
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{apartment.title}</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-sm">{apartment.address}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <BedDouble size={14} className="mr-1 text-blue-500" />
                        <span>{apartment.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center">
                        <Bath size={14} className="mr-1 text-green-500" />
                        <span>{apartment.bathrooms} bath</span>
                      </div>
                      <div className="flex items-center">
                        <Square size={14} className="mr-1 text-purple-500" />
                        <span>{apartment.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Cost Breakdown */}
              <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Cost Sharing Benefits</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Rent</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          ${apartment.price.toLocaleString()}/mo
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your Share (50/50)</p>
                        <p className="text-xl font-bold text-green-600">${splitRent.toLocaleString()}/mo</p>
                      </div>
                    </div>
                    <div className="mt-2 p-2 bg-green-100 dark:bg-green-800/30 rounded text-sm text-green-700 dark:text-green-300">
                      💰 Save ${splitRent.toLocaleString()}/month by sharing!
                    </div>
                  </div>
                </div>
              </Card>

              {/* Your Profile Preview */}
              <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Your Profile Preview</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      This is how other users will see you in the roommate feed:
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-3">
                    <img
                      src={userProfile.avatar || "/placeholder.svg"}
                      alt={userProfile.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">
                          {userProfile.name}, {userProfile.age}
                        </h4>
                        {userProfile.verified && (
                          <Badge className="bg-green-500 text-white text-xs px-2 py-0.5">✓ Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{userProfile.bio}</p>
                      <div className="flex flex-wrap gap-1">
                        {userProfile.interests.slice(0, 4).map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                            {interest}
                          </Badge>
                        ))}
                        {userProfile.interests.length > 4 && (
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            +{userProfile.interests.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Heart size={12} className="mr-1" />
                        Like
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* What Happens Next */}
              <Card className="p-4 bg-gray-50 dark:bg-gray-800/50 border-0">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Calendar size={20} className="mr-2 text-blue-500" />
                  What Happens Next?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Your profile gets added to the roommate feed</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Other users looking for roommates in this area will see your profile
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Get matched with compatible roommates</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our algorithm will suggest the best matches based on lifestyle and preferences
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Start chatting and plan your move-in</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connect with potential roommates and coordinate the apartment application
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Separator />

              {/* Action Button */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFindRoommate}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Adding to Feed...
                    </>
                  ) : (
                    <>
                      <Users size={18} className="mr-2" />
                      Find My Roommate
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
