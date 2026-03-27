import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import GalleryWrapper from "@/component/GalleryWrapper";
import type { Metadata } from "next";

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

  openGraph: {
    title: "Mitsubishi Đà Nẵng",
    description:
      "Giá xe Mitsubishi mới nhất, ưu đãi hấp dẫn, hỗ trợ trả góp.",
    url: "https://yourdomain.com",
    siteName: "Mitsubishi Đà Nẵng",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/banner.jpg", // nhớ có file này
        width: 1200,
        height: 630,
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL("https://yourdomain.com"), 
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
        <Footer />
      </body>
    </html>
  );
}