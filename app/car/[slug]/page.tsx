import { carDetails as heroData } from "@/component/CarDetail";
import { carDetailContent } from "@/component/car/data";

import HeroSection from "@/component/car/HeroSection";
import DescriptionBlock from "@/component/car/DescriptionBlock";
import FeatureGrid from "@/component/car/FeatureGrid";
import FullImageBlock from "@/component/car/FullImageBlock";

import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return heroData.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const carDetail = carDetailContent.find(
    (c) => c.slug === slug
  );

  if (!carDetail) {
    return { title: "Xe không tồn tại" };
  }

  const descSection = carDetail.sections.find(
    (s) => s.type === "description"
  );

  return {
    title: carDetail.name,
    description:
      descSection?.type === "description"
        ? descSection.data.content
        : "",
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const car = heroData.find((c) => c.slug === slug);
  const carDetail = carDetailContent.find(
    (c) => c.slug === slug
  );

  if (!car || !carDetail) return notFound();

  return (
    <>
      <HeroSection car={car} />
      
      {carDetail.sections.map((section, index) => {
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