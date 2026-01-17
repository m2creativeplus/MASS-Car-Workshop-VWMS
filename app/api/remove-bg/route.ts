import { NextRequest, NextResponse } from "next/server";

/**
 * Background Removal API Route
 * 
 * Uses rembg (Python) for actual processing
 * This is a placeholder that returns the original image
 * 
 * Production setup:
 * 1. Deploy rembg as a microservice: docker run -p 5000:5000 danielgatis/rembg
 * 2. Update REMBG_API_URL environment variable
 * 
 * Source: M2 Dev Library - spyne-clone-blueprint.json
 */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;
    const background = formData.get("background") as string || "transparent";

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 10MB." },
        { status: 413 }
      );
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPG, PNG, or WebP." },
        { status: 415 }
      );
    }

    const rembgUrl = process.env.REMBG_API_URL;

    if (rembgUrl) {
      // Production: Forward to rembg microservice
      const buffer = await imageFile.arrayBuffer();
      const blob = new Blob([buffer], { type: imageFile.type });
      
      const rembgFormData = new FormData();
      rembgFormData.append("file", blob, imageFile.name);

      const response = await fetch(rembgUrl, {
        method: "POST",
        body: rembgFormData,
      });

      if (!response.ok) {
        throw new Error(`rembg service error: ${response.status}`);
      }

      const processedImage = await response.arrayBuffer();

      return new NextResponse(processedImage, {
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": `attachment; filename="processed-${imageFile.name}.png"`,
        },
      });
    } else {
      // Development: Return placeholder response
      console.log("REMBG_API_URL not configured, returning original image");
      
      const buffer = await imageFile.arrayBuffer();

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": imageFile.type,
          "X-Processing": "placeholder",
        },
      });
    }
  } catch (error) {
    console.error("Background removal error:", error);
    return NextResponse.json(
      { error: "Processing failed. Please try again." },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
