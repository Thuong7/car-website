import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import GalleryWrapper from "@/component/GalleryWrapper";
import type { Metadata } from "next";
import FloatingButtons from "@/component/common/FloatingButtons";
import { getCars } from "@/lib/getCars";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://mitsubishi-danang.vn"),

  title: {
    default: "Mitsubishi Đà Nẵng - Báo giá xe Mitsubishi mới nhất",
    template: "%s | Mitsubishi Đà Nẵng",
  },

  description:
    "Cập nhật giá xe Mitsubishi mới nhất 2026, ưu đãi hấp dẫn, hỗ trợ trả góp, đăng ký lái thử tại Đà Nẵng.",

  keywords: [
    "mitsubishi đà nẵng",
    "giá xe mitsubishi",
    "xpander",
    "outlander",
    "attrage",
    "mitsubishi 2026",
  ],

  authors: [{ name: "Mitsubishi Đà Nẵng" }],
  creator: "Mitsubishi Đà Nẵng",
  publisher: "Mitsubishi Đà Nẵng",

  openGraph: {
    title: "Mitsubishi Đà Nẵng",
    description:
      "Giá xe Mitsubishi mới nhất, ưu đãi hấp dẫn, hỗ trợ trả góp.",
    url: "https://mitsubishi-danang.vn",
    siteName: "Mitsubishi Đà Nẵng",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://mitsubishi-danang.vn/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Mitsubishi Đà Nẵng",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mitsubishi Đà Nẵng",
    description:
      "Giá xe Mitsubishi mới nhất, ưu đãi hấp dẫn, hỗ trợ trả góp.",
    images: ["https://mitsubishi-danang.vn/banner.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cars = await getCars();

  return (
    <html lang="vi">
    
      <body>
      <GoogleTagManager gtmId="GTM-5ZTF6XBG" />
        <Header cars={cars} />

        <main>{children}</main>

        <GalleryWrapper />
        <FloatingButtons cars={cars} />
        <Footer />

        {/* SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Mitsubishi Đà Nẵng",
              url: "https://mitsubishi-danang.vn",
              telephone: "0934780797",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Đà Nẵng",
                addressCountry: "VN",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}