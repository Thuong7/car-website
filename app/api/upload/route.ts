import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_KEY!,
  api_secret: process.env.CLOUD_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { file } = await req.json();

    if (!file) {
      return NextResponse.json(
        { error: "No file" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: "cars",
    });

    return NextResponse.json({
      url: result.secure_url,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Upload fail" },
      { status: 500 }
    );
  }
}