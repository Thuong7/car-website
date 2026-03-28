import type { Metadata } from "next";
import Hero from "@/component/Hero";
import CarList from "@/component/CarList";
import { cars } from "@/component/data";
import PopupManager from "@/component/PopupManager";
import NewsSection from "@/component/NewsSection";

export const metadata: Metadata = {
  title: "Mitsubishi Đà Nẵng - Báo giá xe Mitsubishi mới nhất",
  description:
    "Đại lý Mitsubishi Đà Nẵng - Cập nhật giá xe Mitsubishi mới nhất 2026. Hỗ trợ trả góp, đăng ký lái thử miễn phí.",
};

export default function Home() {
  return (
    <>
      <h1 style={{ display: "none" }}>
        Mitsubishi Đà Nẵng - Đại lý xe Mitsubishi chính hãng
      </h1>

      <main>
        <Hero />
        <CarList cars={cars} />               
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
    </>
  );
}