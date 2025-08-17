"use client"

import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { NewMatchesTodaySection } from "@/components/new-matches-today-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { Footer } from "@/components/footer"

interface LandingPageProps {
  onStartMatching: () => void
}

export function LandingPage({ onStartMatching }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <HeroSection onStartMatching={onStartMatching} />
      <HowItWorksSection />
      <NewMatchesTodaySection />
      <TestimonialSection />
      <Footer />
    </div>
  )
}
