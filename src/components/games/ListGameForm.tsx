"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { gameConditionEnum, updateGameSchema } from "@/lib/validations/collection"
import { updateGameAction } from "@/server/actions/collection"
import { SelectGame } from "@/db/schema/games"
import { getImageUrl } from "@/lib/utils/image-upload"
import { deleteGameImageAction } from "@/server/actions/uploads"

import { ConditionSelect } from "./ConditionSelect"
import { PlatformSelect } from "./PlatformSelect"
import { ImageUpload } from "./ImageUpload"

interface ListGameFormProps {
  game: SelectGame
}

export function ListGameForm({ game }: ListGameFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(
    game.coverImageId ? getImageUrl(game.coverImageId) : null
  )

  // Use react-hook-form to handle form validation
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      id: game.id,
      condition: game.condition,
      notes: game.notes || "",
      forTrade: game.forTrade,
      // We don't include coverImageId in the form - it's handled separately
    },
    resolver: zodResolver(updateGameSchema)
  })

  // Watch values to pass to controlled components
  const condition = watch("condition")
  const forTrade = watch("forTrade")

  // Handle condition select change
  const handleConditionChange = (newCondition: typeof gameConditionEnum._type) => {
    setValue("condition", newCondition)
  }

  // Handle image upload success
  const handleImageUploadSuccess = (url: string) => {
    setImageUrl(url)
  }

  // Handle image removal
  const handleRemoveImage = async () => {
    try {
      const result = await deleteGameImageAction(game.id)
      if (!result.isSuccess) {
        throw new Error(result.message)
      }
      setImageUrl(null)
    } catch (error) {
      console.error("Error removing image:", error)
      toast.error("Failed to remove image")
      throw error // Re-throw to let the ImageUpload component handle the error
    }
  }

  // Handle form submission
  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    try {
      const result = await updateGameAction(data)
      
      if (result.isSuccess) {
        toast.success("Game listing updated successfully")
        router.push("/collection")
        router.refresh()
      } else {
        toast.error(result.message || "Failed to update game listing")
      }
    } catch (error) {
      console.error("Error updating game:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{game.name}</h3>
        <p className="text-sm text-gray-500">Platform: {game.platform}</p>
      </div>
      
      {/* Game Image */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Game Image
        </label>
        <ImageUpload 
          gameId={game.id}
          existingImageUrl={imageUrl}
          onUploadSuccess={handleImageUploadSuccess}
          onRemoveImage={handleRemoveImage}
        />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Condition
          </label>
          <ConditionSelect 
            value={condition} 
            onChange={handleConditionChange} 
            disabled={isSubmitting}
          />
          {errors.condition && (
            <p className="text-red-500 text-sm mt-1">{errors.condition.message?.toString()}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Notes (optional)
          </label>
          <textarea
            {...register("notes")}
            rows={3}
            disabled={isSubmitting}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Describe the condition or any other details"
          />
          {errors.notes && (
            <p className="text-red-500 text-sm mt-1">{errors.notes.message?.toString()}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="forTrade"
            {...register("forTrade")}
            disabled={isSubmitting}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="forTrade" className="ml-2 block text-sm">
            List this game for trade
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  )
} 