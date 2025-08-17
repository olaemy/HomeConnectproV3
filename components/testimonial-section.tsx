"use client"

import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Jessica Park",
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "RoomMatch helped me find the perfect roommate! The compatibility matching is spot-on, and I felt safe throughout the entire process.",
    },
    {
      name: "David Chen",
      location: "New York, NY",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "I was skeptical about finding roommates online, but RoomMatch's verification system gave me confidence. Found my roommate in just 2 weeks!",
    },
    {
      name: "Maria Rodriguez",
      location: "Los Angeles, CA",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The app is so easy to use, and the matching algorithm really works. My roommate and I have been living together for 8 months now!",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of happy roommates who found their perfect match through RoomMatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
