import clientPromise from "@/lib/mongodb";
import Gallery from "./Gallery";

async function getGallery() {
  try {
    const client = await clientPromise;
    const db = client.db("car-showroom");

    const gallery = await db.collection("galleries").findOne();

    return gallery?.images || [];
  } catch (err) {
    console.error("Gallery fetch error:", err);
    return [];
  }
}

export default async function GalleryWrapper() {
  const images = await getGallery();

  return <Gallery images={images} />;
}