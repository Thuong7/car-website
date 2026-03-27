import clientPromise from "@/lib/mongodb";
import { slugify } from "@/lib/slugify";
// ======================
// MAIN HANDLER
// ======================
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const client = await clientPromise;
  const db = client.db("car-showroom");

  // 👉 GET ONE
  if (slug) {
    const blog = await db.collection("blogs").findOne({ slug });

    if (!blog) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(blog);
  }

  // 👉 GET ALL
  const blogs = await db
    .collection("blogs")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json(blogs);
}

// ======================
// CREATE
// ======================
export async function POST(req: Request) {
  console.log("🔥 HIT BLOG API");

  try {
    const body = await req.json();

    console.log("BODY:", body);

    if (!body.name?.trim()) {
      return Response.json(
        { error: "Thiếu name" },
        { status: 400 }
      );
    }

    const slug = slugify(body.name);

    console.log("SLUG:", slug);

    const client = await clientPromise;
    const db = client.db("car-showroom");

    const exist = await db
      .collection("blogs")
      .findOne({ slug });

    if (exist) {
      return Response.json(
        { error: "Slug đã tồn tại" },
        { status: 400 }
      );
    }

    await db.collection("blogs").insertOne({
      ...body,
      slug,
      createdAt: new Date(),
    });

    return Response.json({ success: true });

  } catch (err) {
    console.error("ERROR:", err);
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

// ======================
// UPDATE
// ======================
export async function PUT(req: Request) {
  const body = await req.json();

  const slug = slugify(body.name);

  const client = await clientPromise;
  const db = client.db("car-showroom");

  await db.collection("blogs").updateOne(
    { slug: body.slug },
    {
      $set: {
        ...body,
        updatedAt: new Date(),
      },
    }
  );

  return Response.json({ success: true });
}

// ======================
// DELETE
// ======================
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return Response.json(
      { error: "Thiếu slug" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("car-showroom");

  await db.collection("blogs").deleteOne({ slug });

  return Response.json({ success: true });
}