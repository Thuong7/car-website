import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_KEY!,
  api_secret: process.env.CLOUD_SECRET!,
});
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("car-showroom");

    const gallery = await db.collection("galleries").findOne({});

    return NextResponse.json({
      images: gallery?.images || [],
    });
  } catch (err) {
    console.error("GET GALLERY ERROR:", err);

    return NextResponse.json(
      { images: [] },
      { status: 200 }
    );
  }
}
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

// UPDATE
export async function PUT(req: Request) {
  const body = await req.json();
    console.log("BODY:", body);
  const client = await clientPromise;
  const db = client.db("car-showroom");

  await db.collection("galleries").updateOne(
    {},
    {
      $set: {
        images: body.images,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}