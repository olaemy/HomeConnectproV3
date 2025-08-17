import type React from "react"
import { AgentSidebar } from "@/components/agent/agent-sidebar"

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AgentSidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
