import ReviewPage from "@/component/review/ReviewPage";
import "@/component/review/review.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Đánh giá xe Mitsubishi từ khách hàng | Mitsubishi Đà Nẵng",
  description:
    "Xem review thực tế từ khách hàng đã mua xe Mitsubishi tại Đà Nẵng. Hình ảnh giao xe, đánh giá chi tiết và trải nghiệm thực tế.",

  keywords: [
    "đánh giá mitsubishi",
    "review xe mitsubishi",
    "xpander review",
    "destinator đánh giá",
    "mitsubishi đà nẵng",
  ],

  openGraph: {
    title:
      "Đánh giá xe Mitsubishi từ khách hàng | Mitsubishi Đà Nẵng",
    description:
      "Tổng hợp review thực tế từ khách hàng Mitsubishi tại Đà Nẵng.",
    url: "https://mitsubishi-danang.vn/review",
    siteName: "Mitsubishi Đà Nẵng",
    images: [
      {
        url: "https://mitsubishi-danang.vn/banner.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      {/* 🔥 H1 SEO */}
      <h1 className="seo-hidden">
        Đánh giá xe Mitsubishi từ khách hàng tại Đà Nẵng
      </h1>

      {/* 🔥 Content SEO */}
      <section className="seo-hidden">
        <h2>Review thực tế từ khách hàng Mitsubishi</h2>
        <p>
          Tổng hợp đánh giá thực tế từ khách hàng đã mua xe Mitsubishi như
          Xpander, Destinator, Triton tại Đà Nẵng. Hình ảnh giao xe,
          trải nghiệm sử dụng và nhận xét chi tiết.
        </p>

        <h2>Khách hàng nói gì về Mitsubishi</h2>
        <p>
          Mitsubishi là thương hiệu xe nổi tiếng với độ bền bỉ, tiết kiệm nhiên liệu
          và chi phí sử dụng thấp. Những phản hồi từ khách hàng giúp bạn có cái nhìn
          thực tế trước khi quyết định mua xe.
        </p>
      </section>

      {/* 🔥 MAIN UI */}
      <ReviewPage />

      {/* 🔥 SCHEMA REVIEW (CỰC MẠNH SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "Brand",
              name: "Mitsubishi",
            },
            author: {
              "@type": "Person",
              name: "Khách hàng Mitsubishi",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody:
              "Khách hàng đánh giá cao xe Mitsubishi về độ bền, tiết kiệm nhiên liệu và chi phí vận hành.",
          }),
        }}
      />
    </>
  );
}