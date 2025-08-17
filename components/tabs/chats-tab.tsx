"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, ArrowLeft, Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SafetySystem } from "@/lib/safety-system"
import { useSafeMode } from "@/contexts/safe-mode"

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  type: "roommate" | "apartment"
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  type: "text" | "image"
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "That sounds perfect! When can we schedule a viewing?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    type: "roommate",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "Thanks for sharing the apartment details",
    timestamp: "1h ago",
    unread: 0,
    online: false,
    type: "roommate",
  },
  {
    id: "3",
    name: "Maria Santos (Agent)",
    avatar: "/placeholder.svg?height=50&width=50",
    lastMessage: "The apartment is still available. Would you like to see it this weekend?",
    timestamp: "3h ago",
    unread: 1,
    online: true,
    type: "apartment",
  },
]

const mockMessages: { [key: string]: Message[] } = {
  "1": [
    {
      id: "1",
      senderId: "other",
      content: "Hi! I saw your roommate listing and I'm really interested!",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      content: "Great! Tell me a bit about yourself and what you're looking for.",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: "3",
      senderId: "other",
      content:
        "I'm a software engineer, very clean and respectful. I work from home mostly but I'm quiet. Looking for a place in Mission District with good transit access.",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: "4",
      senderId: "me",
      content: "That sounds perfect! When can we schedule a viewing?",
      timestamp: "10:37 AM",
      type: "text",
    },
  ],
  "3": [
    {
      id: "1",
      senderId: "other",
      content:
        "Hello! I have a beautiful 2-bedroom apartment in SOMA that just became available. Would you be interested in scheduling a viewing?",
      timestamp: "2:15 PM",
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      content: "Yes, I'd love to see it! What's the rent and when is it available?",
      timestamp: "2:18 PM",
      type: "text",
    },
    {
      id: "3",
      senderId: "other",
      content:
        "It's $3,200/month and available March 1st. The apartment has great natural light, in-unit laundry, and a rooftop deck. I can show it to you this weekend if you're available.",
      timestamp: "2:20 PM",
      type: "text",
    },
  ],
}

export function ChatsTab() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { safeMode } = useSafeMode()

  const [filteredChats, setFilteredChats] = useState<Chat[]>([])

  useEffect(() => {
    const filtered = mockChats.filter((chat) => {
      const visible = SafetySystem.isUserSafe(chat.id, { safeMode, minScore: 50 })
      return visible
    })
    setFilteredChats(filtered)
  }, [safeMode])

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages[selectedChat.id] || [])
    }
  }, [selectedChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    }
    setMessages((prev) => [...prev, newMessage])
    setMessage("")
  }

  const ChatWindow = ({ chat }: { chat: Chat }) => (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center">
        {!isDesktop && (
          <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)} className="mr-3">
            <ArrowLeft size={20} />
          </Button>
        )}
        <div className="relative mr-3">
          <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-10 h-10 rounded-full" />
          {chat.online && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{chat.name}</h3>
          <p className="text-sm text-gray-500">{chat.online ? "Online" : "Offline"}</p>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon">
            <Phone size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Video size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical size={20} />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] ${
                msg.senderId === "me"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              } rounded-2xl px-4 py-2`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.senderId === "me" ? "text-white/70" : "text-gray-500"}`}>
                {msg.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="pr-12 bg-gray-100 dark:bg-gray-800 border-0 rounded-full"
          />
          <Button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  )

  const ChatList = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Messages
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {filteredChats.filter((chat) => chat.unread > 0).length} unread conversations
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <motion.div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
            className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${
              selectedChat?.id === chat.id && isDesktop ? "bg-purple-50 dark:bg-purple-900/20" : ""
            }`}
          >
            <div className="flex items-center">
              <div className="relative mr-3">
                <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-12 h-12 rounded-full" />
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{chat.name}</h3>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {chat.unread > 0 && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs px-2 py-1 rounded-full">
                        {chat.unread}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <div className="h-full flex">
        <div className="w-1/3 lg:w-2/5 border-r border-gray-200 dark:border-gray-800">
          <ChatList />
        </div>
        <div className="flex-1">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Select a chat to start messaging</h3>
                <p className="text-sm text-gray-400">Choose a conversation from the sidebar to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return selectedChat ? <ChatWindow chat={selectedChat} /> : <ChatList />
}
