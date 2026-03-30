// lib/getCars.ts
import clientPromise from "@/lib/mongodb";
import { unstable_cache } from "next/cache";

export const getCars = unstable_cache(
  async () => {
    const client = await clientPromise;
    const db = client.db("car-showroom");

    const cars = await db
      .collection("cars")
      .find()
      .sort({ order: 1 }) // 🔥 QUAN TRỌNG
      .toArray();

    return cars.map((car: any) => {
      const hero = car.sections?.find(
        (s: any) => s.type === "hero"
      );

      return {
        _id: car._id.toString(),
        name: car.name,
        slug: car.slug,
        image: hero?.data?.gallery?.[0] || "",
        price: hero?.data?.priceList?.[0]?.price || "",
      };
    });
  },
  ["cars-list"],
  { revalidate: 300 }
);