"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Plus,
  Heart,
  MessageCircle,
  User,
  HomeIcon,
  PlusIcon,
  HeartIcon,
  MessageCircleIcon,
  UserIcon,
  Building2,
  ChevronUp,
} from "lucide-react"

type NavTab = "home" | "add" | "recs" | "chats" | "mine"

interface BottomNavigationProps {
  activeTab: NavTab
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const [pressedTab, setPressedTab] = useState<NavTab | null>(null)
  const [showMineDropup, setShowMineDropup] = useState(false)

  const tabs = [
    {
      id: "home",
      href: "/discover",
      label: "Discover",
      icon: Home,
      activeIcon: HomeIcon,
      badge: null,
    },
    {
      id: "add",
      href: "/add",
      label: "Add",
      icon: Plus,
      activeIcon: PlusIcon,
      badge: null,
    },
    {
      id: "recs",
      href: "/recommendations",
      label: "Recs",
      icon: Heart,
      activeIcon: HeartIcon,
      badge: 3,
    },
    {
      id: "chats",
      href: "/chats",
      label: "Chats",
      icon: MessageCircle,
      activeIcon: MessageCircleIcon,
      badge: 2,
    },
    {
      id: "mine",
      href: "#",
      label: "Mine",
      icon: User,
      activeIcon: UserIcon,
      badge: null,
    },
  ]

  const mineOptions = [
    {
      href: "/profile",
      label: "My Profile",
      icon: User,
    },
    {
      href: "/my-properties",
      label: "My Properties",
      icon: Building2,
    },
  ]

  const handleMineClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowMineDropup(!showMineDropup)
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showMineDropup && (
          <>
            <div className="fixed bottom-0 left-0 right-0 h-32 z-40" onClick={() => setShowMineDropup(false)} />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-2 mb-2 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-800/20 rounded-2xl shadow-2xl overflow-hidden min-w-[160px]"
            >
              {mineOptions.map((option, index) => (
                <Link
                  key={option.href}
                  href={option.href}
                  onClick={() => setShowMineDropup(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <option.icon size={20} className="text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{option.label}</span>
                </Link>
              ))}
              <div className="absolute bottom-0 right-8 transform translate-y-full">
                <ChevronUp size={16} className="text-white/95 dark:text-gray-900/95" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-white/20 dark:border-gray-800/20" />

      <nav className="relative flex items-center justify-around px-2 py-3 safe-area-pb">
        {tabs.map((tab) => {
          const IconComponent = activeTab === tab.id ? tab.activeIcon : tab.icon
          const isActive = activeTab === tab.id
          const isPressed = pressedTab === tab.id
          const isMineTab = tab.id === "mine"

          return (
            <div key={tab.id} className="relative">
              {isMineTab ? (
                <button
                  onClick={handleMineClick}
                  className="relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50 active:bg-white/70 dark:active:bg-gray-800/70 group"
                  onTouchStart={() => setPressedTab(tab.id as NavTab)}
                  onTouchEnd={() => setPressedTab(null)}
                  onMouseDown={() => setPressedTab(tab.id as NavTab)}
                  onMouseUp={() => setPressedTab(null)}
                  onMouseLeave={() => setPressedTab(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: isActive ? 0.3 : 0.2,
                    }}
                  >
                    <div
                      className={`relative transition-all duration-200 ${
                        isActive || showMineDropup
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`}
                    >
                      <IconComponent
                        size={24}
                        className={`transition-all duration-200 ${isPressed ? "scale-90" : ""}`}
                      />
                      {(isActive || showMineDropup) && (
                        <motion.div
                          className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium mt-1 transition-all duration-200 ${
                        isActive || showMineDropup
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </span>
                    <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
                      {tab.label}
                    </div>
                  </motion.div>
                </button>
              ) : (
                <Link
                  href={tab.href}
                  className="relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50 active:bg-white/70 dark:active:bg-gray-800/70 group"
                  onTouchStart={() => setPressedTab(tab.id as NavTab)}
                  onTouchEnd={() => setPressedTab(null)}
                  onMouseDown={() => setPressedTab(tab.id as NavTab)}
                  onMouseUp={() => setPressedTab(null)}
                  onMouseLeave={() => setPressedTab(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: isActive ? 0.3 : 0.2,
                    }}
                  >
                    <div
                      className={`relative transition-all duration-200 ${
                        isActive
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`}
                    >
                      <IconComponent
                        size={24}
                        className={`transition-all duration-200 ${isPressed ? "scale-90" : ""}`}
                      />
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium mt-1 transition-all duration-200 ${
                        isActive
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </span>
                    {tab.badge && (
                      <motion.div
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          delay: 0.1,
                        }}
                      >
                        {tab.badge}
                      </motion.div>
                    )}
                    <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
                      {tab.label}
                    </div>
                  </motion.div>
                </Link>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
