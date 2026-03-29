import type { Metadata } from "next";
import Hero from "@/component/Hero";
import CarList from "@/component/CarList";
import { cars } from "@/component/data";
import PopupManager from "@/component/PopupManager";
import NewsSection from "@/component/NewsSection";
import "./globals.css";
export const metadata: Metadata = {
  title:
    "Mitsubishi Đà Nẵng 2026 - Giá xe, ưu đãi & trả góp mới nhất",
  description:
    "Đại lý Mitsubishi Đà Nẵng - Báo giá xe Mitsubishi 2026 mới nhất. Ưu đãi hấp dẫn, hỗ trợ trả góp, đăng ký lái thử miễn phí.",

  keywords: [
    "mitsubishi đà nẵng",
    "giá xe mitsubishi 2026",
    "xpander giá bao nhiêu",
    "destinator mitsubishi",
    "triton mitsubishi",
  ],
};

export default function Home() {
  return (
    <>
      <h1 className="seo-hidden">
        Mitsubishi Đà Nẵng - Đại lý xe Mitsubishi chính hãng
      </h1>

      <main>
        <Hero />
        <CarList cars={cars} />   
        <section className="seo-hidden">
            <h2>Các dòng xe Mitsubishi nổi bật</h2>
            <ul>
              {cars.map((car) => (
                <li key={car.slug}>
                  <a href={`/car/${car.slug}`}>
                    Mitsubishi {car.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>            
        <section style={{ display: "none" }}>
          <h2>Các dòng xe Mitsubishi tại Việt Nam</h2>
          <p>
            Mitsubishi là thương hiệu xe nổi tiếng với các dòng xe như Xpander,
            Attrage, Outlander. Tại Mitsubishi Đà Nẵng, chúng tôi cung cấp giá xe
            mới nhất, ưu đãi hấp dẫn và hỗ trợ trả góp.
          </p>
        </section>

        <NewsSection />
      </main>

      <PopupManager />
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