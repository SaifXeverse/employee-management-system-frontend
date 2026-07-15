import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as Blob;
  
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "products", resource_type: "auto" },
      (error, result) => {
        if (error) {
          resolve(NextResponse.json({ error }, { status: 500 }));
        } else {
          resolve(
            NextResponse.json({ 
              url: result?.secure_url, 
              publicId: result?.public_id 
            })
          );
        }
      }
    );
    uploadStream.end(buffer);
  });
}

export async function DELETE(req: Request) {
  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Image deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}