import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const runtime = "nodejs"; 

export const revalidate = 0; 
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("car-showroom");

    const gallery = await db.collection("galleries").findOne();

    return NextResponse.json({
      images: gallery?.images || [],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ images: [] });
  }
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();

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