"use client"

import { useState } from "react"
import { ArrowLeft, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Announcement {
  id: string
  title: string
  message: string
  sender: string
  createdAt: string
  unread: boolean
  isPublicIdentity?: boolean
  managerName?: string
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Building Maintenance Scheduled",
      message:
        "We will be performing routine maintenance on the HVAC system this Saturday from 9 AM to 2 PM. Please expect temporary disruptions to heating and cooling during this time.",
      sender: "Property Manager",
      createdAt: "2 hours ago",
      unread: true,
      isPublicIdentity: false, // removed manager name exposure
    },
    {
      id: "2",
      title: "New Parking Regulations",
      message:
        "Starting next month, all residents must register their vehicles with the front desk. Unregistered vehicles will be subject to towing. Please bring your registration and insurance documents.",
      sender: "Property Manager",
      createdAt: "1 day ago",
      unread: true,
      isPublicIdentity: false,
    },
    {
      id: "3",
      title: "Holiday Office Hours",
      message:
        "The leasing office will be closed on December 25th and January 1st. For emergencies, please contact the emergency maintenance line.", // removed specific phone number
      sender: "Property Manager",
      createdAt: "3 days ago",
      unread: false,
      isPublicIdentity: false, // removed manager name exposure
    },
    {
      id: "4",
      title: "Community Event: Rooftop BBQ",
      message:
        "Join us for a community BBQ on the rooftop terrace this Friday at 6 PM. Food and drinks will be provided. RSVP by Wednesday to secure your spot!",
      sender: "Property Manager",
      createdAt: "5 days ago",
      unread: false,
      isPublicIdentity: false,
    },
    {
      id: "5",
      title: "Package Delivery Updates",
      message:
        "We've partnered with a new package management system. All deliveries will now be stored in secure lockers in the lobby. You'll receive a code via text when packages arrive.",
      sender: "Property Manager",
      createdAt: "1 week ago",
      unread: false,
      isPublicIdentity: false, // removed manager name exposure
    },
  ])

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)

  const getDisplaySender = (announcement: Announcement) => {
    return announcement.isPublicIdentity && announcement.managerName ? announcement.managerName : "Property Manager"
  }

  const handleAnnouncementClick = (announcement: Announcement) => {
    // Mark as read locally
    setAnnouncements((prev) => prev.map((a) => (a.id === announcement.id ? { ...a, unread: false } : a)))
    setSelectedAnnouncement(announcement)
  }

  const handleBackToList = () => {
    setSelectedAnnouncement(null)
  }

  const unreadCount = announcements.filter((a) => a.unread).length

  if (selectedAnnouncement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBackToList} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Announcements
            </Button>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold mb-2">{selectedAnnouncement.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-purple-100 text-purple-600">PM</AvatarFallback>
                      </Avatar>
                      <span>{getDisplaySender(selectedAnnouncement)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedAnnouncement.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedAnnouncement.message}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Announcements</h1>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">Stay updated with important messages from your property management</p>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleAnnouncementClick(announcement)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg truncate">{announcement.title}</h3>
                      {announcement.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{announcement.message}</p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{getDisplaySender(announcement)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{announcement.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {announcements.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground">
                <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No announcements yet</p>
                <p className="text-sm">Check back later for updates from your property manager</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
