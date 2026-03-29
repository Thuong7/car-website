import ContactSection from "@/component/contact";
import type { Metadata } from "next";
import "@/component/contact.css";
export const metadata: Metadata = {
  title: "Liên hệ Mitsubishi Đà Nẵng | Tư vấn & báo giá xe",
  description:
    "Liên hệ Mitsubishi Đà Nẵng để nhận báo giá xe, tư vấn mua xe, đăng ký lái thử. Hỗ trợ nhanh chóng, ưu đãi mới nhất.",

  keywords: [
    "liên hệ mitsubishi đà nẵng",
    "tư vấn xe mitsubishi",
    "báo giá xe mitsubishi",
    "đăng ký lái thử mitsubishi",
  ],

  openGraph: {
    title: "Liên hệ Mitsubishi Đà Nẵng",
    description:
      "Nhận báo giá xe Mitsubishi và tư vấn miễn phí tại Đà Nẵng.",
    url: "https://mitsubishi-danang.vn/contact",
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

export default function ContactPage() {
  return (
    <>
      <h1 className="seo-hidden">
        Liên hệ Mitsubishi Đà Nẵng – Tư vấn mua xe nhanh chóng
      </h1>

      <section className="seo-hidden">
        <h2>Thông tin liên hệ Mitsubishi Đà Nẵng</h2>
        <p>
          Liên hệ ngay với Mitsubishi Đà Nẵng để được tư vấn chi tiết về các dòng xe như
          Xpander, Destinator, Triton. Nhận báo giá mới nhất, chương trình ưu đãi và hỗ trợ trả góp.
        </p>

        <h2>Đăng ký lái thử xe Mitsubishi</h2>
        <p>
          Khách hàng có thể đăng ký lái thử xe Mitsubishi miễn phí để trải nghiệm thực tế.
          Đội ngũ tư vấn luôn sẵn sàng hỗ trợ nhanh chóng và tận tình.
        </p>
      </section>

      <ContactSection />

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
    </>
  );
}