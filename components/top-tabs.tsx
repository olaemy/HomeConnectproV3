"use client"

import { Button } from "@/components/ui/button"

interface TopTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TopTabs({ activeTab, onTabChange }: TopTabsProps) {
  const tabs = [
    { id: "roommates", label: "Roommates" },
    { id: "match", label: "Match" },
    { id: "apartments", label: "Apartments" },
  ]

  return (
    <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className="flex-1"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
