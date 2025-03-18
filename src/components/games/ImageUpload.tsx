"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { 
  MAX_FILE_SIZE, 
  ALLOWED_FILE_TYPES,
  validateImageFile 
} from "@/lib/utils/image-upload"
import { Camera, X, Upload } from "lucide-react"

interface ImageUploadProps {
  gameId: string
  existingImageUrl?: string | null
  onUploadSuccess?: (imageUrl: string) => void
  onRemoveImage?: () => void
}

export function ImageUpload({
  gameId,
  existingImageUrl = null,
  onUploadSuccess,
  onRemoveImage
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Helper for human-readable file size
  const formatFileSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset state
    setError(null)
    
    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error || "Invalid file")
      return
    }
    
    // Create local preview
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    
    // Prepare for upload
    setIsUploading(true)
    
    try {
      // Create form data for upload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("gameId", gameId)
      
      // Send to API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })
      
      const result = await response.json()
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Upload failed")
      }
      
      // Call success callback with the image URL
      if (onUploadSuccess && result.data.url) {
        onUploadSuccess(result.data.url)
      }
      
      toast.success("Image uploaded successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      setError(error instanceof Error ? error.message : "Upload failed")
      toast.error("Failed to upload image")
      
      // Reset preview on error
      if (!existingImageUrl) {
        setPreviewUrl(null)
      } else {
        setPreviewUrl(existingImageUrl)
      }
    } finally {
      setIsUploading(false)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = async () => {
    if (!onRemoveImage) return
    
    setIsUploading(true)
    
    try {
      onRemoveImage()
      setPreviewUrl(null)
      toast.success("Image removed")
    } catch (error) {
      console.error("Error removing image:", error)
      toast.error("Failed to remove image")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="image-upload">
      <input
        type="file"
        accept={ALLOWED_FILE_TYPES.join(",")}
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        disabled={isUploading}
      />
      
      {/* Image preview or upload area */}
      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
        {previewUrl ? (
          // Show image preview with remove button
          <>
            <Image
              src={previewUrl}
              alt="Game cover"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isUploading}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          // Show upload prompt
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full h-full flex flex-col items-center justify-center p-4 space-y-2 hover:bg-gray-200 transition-colors"
          >
            {isUploading ? (
              <div className="animate-pulse flex flex-col items-center">
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Uploading...</p>
              </div>
            ) : (
              <>
                <Camera size={32} className="text-gray-400" />
                <p className="text-sm text-gray-500">
                  Click to upload game image
                </p>
                <p className="text-xs text-gray-400">
                  Maximum size: {formatFileSize(MAX_FILE_SIZE)}
                </p>
                <p className="text-xs text-gray-400">
                  Formats: {ALLOWED_FILE_TYPES.map(type => type.split('/')[1]).join(', ')}
                </p>
              </>
            )}
          </button>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
} 