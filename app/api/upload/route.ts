import { NextResponse } from "next/server";
import cloudinary from "@/libs/cloudinary";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "products", resource_type: "auto" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            NextResponse.json({
              url: result?.secure_url,
              publicId: result?.public_id,
            }),
          );
        }
      },
    );
    uploadStream.end(buffer);
  });
}

export async function DELETE(req: Request) {
  try {
    const { publicId, resourceType } = await req.json();
    // if (resourceType !== "image") {
    //   return NextResponse.json(
    //     { error: "Type is not image" },
    //     { status: 400 },
    //   );
    // }

    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 },
      );
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

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
    // return NextResponse.json(
    //   { error: "Internal Server Error" },
    //   { status: 500 },
    // );
  }
}
