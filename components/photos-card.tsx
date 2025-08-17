"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Camera, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PhotosCard({
  photos,
  onRemove,
  onAdd,
  dragActive,
  onDrag,
  onDrop,
  headerGradient = "from-purple-500 to-pink-500",
  title = "Photos",
  subtitle = "Upload high-quality images to showcase your post",
}: {
  photos: string[]
  onRemove: (index: number) => void
  onAdd: () => void
  dragActive: boolean
  onDrag: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  headerGradient?: string
  title?: string
  subtitle?: string
}) {
  return (
    <Card className="overflow-hidden shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-6">
      <CardHeader className={`bg-gradient-to-r ${headerGradient} text-white p-6`}>
        <CardTitle className="flex items-center text-xl">
          <Camera className="mr-3 h-6 w-6" />
          {title}
        </CardTitle>
        <p className="text-white/80 mt-2">{subtitle}</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={photo || "/placeholder.svg"}
                alt={`Photo ${index + 1}`}
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-3 right-3 w-8 h-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                onClick={() => onRemove(index)}
              >
                <X size={14} />
              </Button>
            </motion.div>
          ))}

          {/* Add / DnD tile */}
          <motion.div
            className={`rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
              dragActive
                ? "border-purple-400 bg-purple-50 dark:bg-purple-900/20"
                : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAdd}
            onDragEnter={onDrag}
            onDragLeave={onDrag}
            onDragOver={onDrag}
            onDrop={onDrop}
          >
            <Upload size={32} className="text-purple-400 mb-3" />
            <span className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Add Photos</span>
            <span className="text-sm text-gray-500">Drag & drop or click to upload</span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
