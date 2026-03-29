import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import GalleryWrapper from "@/component/GalleryWrapper";
import type { Metadata } from "next";
import FloatingButtons from "@/component/common/FloatingButtons";
import { cars } from "@/component/data";

export const metadata: Metadata = {
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
  twitter: {
  card: "summary_large_image",
  title: "Mitsubishi Đà Nẵng",
  description:
    "Giá xe Mitsubishi mới nhất, ưu đãi hấp dẫn, hỗ trợ trả góp.",
  images: ["/banner.jpg"],
},
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
    url: "/banner.jpg",
    width: 1200,
    height: 630,
    alt: "Mitsubishi Đà Nẵng",
  },
],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL("https://mitsubishi-danang.vn"), 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main>{children}</main> 
        <GalleryWrapper />
        <FloatingButtons cars={cars} />
        <Footer />
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