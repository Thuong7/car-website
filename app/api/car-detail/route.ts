import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// =======================
// GET
// =======================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const client = await clientPromise;
    const db = client.db("car-showroom");

    if (slug) {
      const car = await db.collection("cars").findOne({ slug });

      if (!car) {
        return NextResponse.json(
          { error: "Not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(car);
    }

    const cars = await db.collection("cars").find().toArray();

    return NextResponse.json(cars);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Get fail" },
      { status: 500 }
    );
  }
}

// =======================
// POST
// =======================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("car-showroom");

    const exist = await db.collection("cars").findOne({
      slug: body.slug,
    });

    if (exist) {
      return NextResponse.json(
        { error: "Slug đã tồn tại" },
        { status: 400 }
      );
    }

    await db.collection("cars").insertOne(body);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Create fail" });
  }
}

// =======================
// PUT
// =======================
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { _id, ...rest } = body;

    const client = await clientPromise;
    const db = client.db("car-showroom");

    const result = await db.collection("cars").updateOne(
      { slug: body.slug },
      { $set: rest }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy xe" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update fail" });
  }
}

// =======================
// DELETE
// =======================
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const client = await clientPromise;
    const db = client.db("car-showroom");

    const result = await db.collection("cars").deleteOne({
      slug,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy xe" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete fail" });
  }
}