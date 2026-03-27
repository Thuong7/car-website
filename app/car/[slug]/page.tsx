import clientPromise from "@/lib/mongodb";

import HeroSection from "@/component/car/HeroSection";
import DescriptionBlock from "@/component/car/DescriptionBlock";
import FeatureGrid from "@/component/car/FeatureGrid";
import FullImageBlock from "@/component/car/FullImageBlock";

import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

// =======================
// TYPES
// =======================
type Props = {
  params: Promise<{ slug: string }>;
};

// =======================
// HELPER: GET CAR
// =======================
async function getCar(slug: string) {
  const client = await clientPromise;
  const db = client.db("car-showroom");

  return db.collection("cars").findOne({ slug });
}

// =======================
// STATIC PARAMS (FIX BUG)
// =======================
export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db("car-showroom");

  const cars = await db
    .collection("cars")
    .find({}, { projection: { slug: 1 } })
    .toArray();

  return cars
    .filter((car) => typeof car.slug === "string")
    .map((car) => ({
      slug: car.slug,
    }));
}

// =======================
// SEO
// =======================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const car = await getCar(slug);

  if (!car) {
    return {
      title: "Xe không tồn tại",
      robots: { index: false },
    };
  }

  const descSection = car.sections?.find(
    (s: any) => s.type === "description"
  );

  const description =
    descSection?.data?.content?.slice(0, 160) ||
    `Giá xe ${car.name} mới nhất, ưu đãi hấp dẫn, hỗ trợ trả góp.`;

  const heroImage =
    car.sections?.find((s: any) => s.type === "hero")?.data?.gallery?.[0] ||
    "/banner.jpg";

  return {
    title: `${car.name} | Mitsubishi Đà Nẵng`,
    description,

    openGraph: {
      title: car.name,
      description,
      url: `https://yourdomain.com/car/${slug}`,
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: car.name,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// =======================
// PAGE
// =======================
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const car = await getCar(slug);

  if (!car) return notFound();

  const heroBlock = car.sections?.find(
    (s: any) => s.type === "hero"
  );

  return (
    <>
      {/* HERO */}
      <HeroSection
        car={{
          name: car.name,
          gallery: heroBlock?.data?.gallery || [],
          priceList: heroBlock?.data?.priceList || [],
          promo: heroBlock?.data?.promo || [],
        }}
      />

      {/* CONTENT */}
      {car.sections?.map((section: any, index: number) => {
        switch (section.type) {
          case "fullImage":
            return <FullImageBlock key={index} data={section.data} />;

          case "description":
            return <DescriptionBlock key={index} data={section.data} />;

          case "features":
            return <FeatureGrid key={index} features={section.data} />;

          default:
            return null;
        }
      })}

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: car.name,
            description: car.name,
            brand: "Mitsubishi",
          }),
        }}
      />
    </>
  );
}