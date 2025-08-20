"use client"

import { Heart, Star, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onStartMatching: () => void
}

export function HeroSection({ onStartMatching }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo and brand */}
          <div className="flex items-center justify-center mb-8">
            <Heart className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              HouseApp
            </h1>
          </div>

          {/* Main headline */}
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Your Perfect
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Home & Community
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Find your ideal home, connect with amazing roommates, and build lasting friendships in your perfect living
            space.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <Button
              onClick={onStartMatching}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Matching Now
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">25K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Successful Matches</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">4.8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">App Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Verified Safe</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
