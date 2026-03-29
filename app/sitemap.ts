import clientPromise from "@/lib/mongodb";

export default async function sitemap() {
  const baseUrl = "https://mitsubishi-danang.vn";

  const client = await clientPromise;
  const db = client.db("car-showroom");

  const cars = await db
    .collection("cars")
    .find({}, { projection: { slug: 1 } })
    .toArray();

  const blogs = await db
    .collection("blogs")
    .find({}, { projection: { slug: 1, createdAt: 1 } })
    .toArray();

  // STATIC PAGES
  const staticPages = ["", "/blog", "/review", "/contact"];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  // CAR PAGES
  const carUrls = cars.map((car: any) => ({
    url: `${baseUrl}/car/${car.slug}`,
    lastModified: new Date(),
  }));

  // BLOG PAGES
  const blogUrls = blogs.map((b: any) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.createdAt || new Date(),
  }));

  return [...staticUrls, ...carUrls, ...blogUrls];
}