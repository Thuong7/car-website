import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const fetchCache = "force-no-store";
export const revalidate = 0;

// GET: lấy tất cả review
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("car-showroom");

    const reviews = await db
      .collection("reviews")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
} 

// POST: tạo review mới
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("car-showroom");

    const newReview = {
      name: body.name || "",
      location: body.location || "",
      car: body.car || "",
      rating: body.rating || 5,
      content: body.content || "",
      image: body.image || "",
      createdAt: new Date(),
    };

    const result = await db.collection("reviews").insertOne(newReview);

    return NextResponse.json({
      _id: result.insertedId,
      ...newReview,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}