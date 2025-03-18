import { supabase } from "@/lib/supabase";

// Constants
export const STORAGE_BUCKET = "game-images";
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Validates an image file based on size and type
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "No file provided" };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File size too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
    };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(", ")}` 
    };
  }

  return { valid: true };
}

/**
 * Generates a unique file path for storage
 */
export function generateFilePath(userId: string, gameId: string, fileName: string): string {
  const extension = fileName.split('.').pop();
  const timestamp = Date.now();
  return `${userId}/${gameId}/${timestamp}.${extension}`;
}

/**
 * Uploads an image to Supabase storage
 */
export async function uploadGameImage(file: File, userId: string, gameId: string): Promise<{ 
  success: boolean; 
  path?: string; 
  error?: string;
}> {
  try {
    // Validate the file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Generate a unique file path
    const filePath = generateFilePath(userId, gameId, file.name);

    // Upload the file
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type
      });

    if (error) {
      console.error("Error uploading file:", error);
      return { success: false, error: error.message };
    }

    return { success: true, path: data.path };
  } catch (error) {
    console.error("Unexpected error during upload:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
}

/**
 * Gets a public URL for an image
 */
export function getImageUrl(path: string): string | null {
  if (!path) return null;
  
  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);
    
  return data.publicUrl;
}

/**
 * Deletes an image from storage
 */
export async function deleteGameImage(path: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path]);

    if (error) {
      console.error("Error deleting file:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error during file deletion:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
} 