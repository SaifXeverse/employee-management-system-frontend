import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";

export async function POST(req: Request): Promise<Response> {
  const form = await req.formData();
  const file = form.get("file") as Blob;

  if (!file) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<Response>((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          resolve(
            NextResponse.json(
              { error: error.message },
              { status: 500 }
            )
          );
        } else {
          resolve(
            NextResponse.json({
              url: result?.secure_url,
              publicId: result?.public_id,
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
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 },
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return NextResponse.json(
        {
          error: `Failed to delete asset. Cloudinary response: ${result.result}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
