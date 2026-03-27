import clientPromise from "@/lib/mongodb";

import HeroSection from "@/component/car/HeroSection";
import DescriptionBlock from "@/component/car/DescriptionBlock";
import FeatureGrid from "@/component/car/FeatureGrid";
import FullImageBlock from "@/component/car/FullImageBlock";

import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

// ⚠️ FIX: params là Promise (Next mới)
type Props = {
  params: Promise<{ slug: string }>;
};

// =======================
// STATIC PARAMS
// =======================
export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db("car-showroom");

  const cars = await db.collection("cars").find().toArray();

  return cars.map((car) => ({
    slug: car.slug,
  }));
}

// =======================
// SEO
// =======================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // 🔥 FIX

  const client = await clientPromise;
  const db = client.db("car-showroom");

  const carDetail = await db
    .collection("cars")
    .findOne({ slug });

  console.log("PARAM:", slug);

  if (!carDetail) {
    return { title: "Xe không tồn tại" };
  }

  const descSection = carDetail.sections?.find(
    (s: any) => s.type === "description"
  );

  return {
    title: carDetail.name,
    description: descSection?.data?.content || "",
  };
}

// =======================
// PAGE
// =======================
export default async function Page({ params }: Props) {
  const { slug } = await params; // 🔥 FIX

  const client = await clientPromise;
  const db = client.db("car-showroom");

  const carDetail = await db
    .collection("cars")
    .findOne({ slug });
  console.log("CAR DETAIL:", carDetail);
  if (!carDetail) return notFound();

  // HERO
  const heroBlock = carDetail.sections?.find(
    (s: any) => s.type === "hero"
  );

  return (
    <>
      <HeroSection
        car={{
          name: carDetail.name,
          gallery: heroBlock?.data?.gallery || [],
          priceList: heroBlock?.data?.priceList || [],
          promo: heroBlock?.data?.promo || [],
        }}
      />

      {carDetail.sections?.map((section: any, index: number) => {
        if (section.type === "fullImage") {
          return (
            <FullImageBlock key={index} data={section.data} />
          );
        }

        if (section.type === "description") {
          return (
            <DescriptionBlock key={index} data={section.data} />
          );
        }

        if (section.type === "features") {
          return (
            <FeatureGrid key={index} features={section.data} />
          );
        }

        return null;
      })}
    </>
  );
}