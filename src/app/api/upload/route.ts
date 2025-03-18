import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { uploadGameImage } from "@/lib/utils/image-upload";
import { updateGameImageAction } from "@/server/actions/uploads";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const gameId = formData.get("gameId") as string;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }
    
    if (!gameId) {
      return NextResponse.json(
        { success: false, error: "Game ID is required" },
        { status: 400 }
      );
    }
    
    // Upload the image to storage
    const uploadResult = await uploadGameImage(file, userId, gameId);
    
    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error },
        { status: 400 }
      );
    }
    
    // Update the game record with the image path
    const updateResult = await updateGameImageAction(gameId, uploadResult.path || null);
    
    if (!updateResult.isSuccess) {
      return NextResponse.json(
        { success: false, error: updateResult.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        path: uploadResult.path,
        url: updateResult.data
      }
    });
  } catch (error) {
    console.error("Error handling upload:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      },
      { status: 500 }
    );
  }
} 