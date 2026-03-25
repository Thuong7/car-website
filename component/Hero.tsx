"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; 
import "./Hero.css";

const images: string[] = [
  "/mitsubishi-destinator-banner-pc251204-2048x661.jpg",
  "/XFORCE.fw_.png",
  "/TRITON.fw_.png",
];

export default function Hero() {
  const [index, setIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 200);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
      setFade(true);
    }, 200);
  };

  const handleSubmit = () => {
    const regex = /^(0|\+84)[0-9]{9}$/;
    if (!regex.test(phone)) {
      setError("Số điện thoại không hợp lệ");
    } else {
      setError("");
      alert("Gửi thành công!");
    }
  };

  return (
    <>
      {/* SLIDER */}
      <div className="hero-slider">
        <Image
          src={images[index]}
          alt="Banner xe Mitsubishi Đà Nẵng" // 👈 SEO
          width={2048}
          height={661}
          priority // 👈 load nhanh
          className={`hero-img ${fade ? "fade-in" : "fade-out"}`}
        />

        <button className="prev" onClick={handlePrev}>❮</button>
        <button className="next" onClick={handleNext}>❯</button>

        <div className="dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* INFO */}
      <section className="info-section">
        <div className="hero-container info-grid">

          <div className="left-info">
            <p>
              Mitsubishi Savico Đà Nẵng cập nhật thông tin bảng giá, chương trình ưu đãi,
              bài đánh giá và cảm nhận khách hàng về xe ô tô Mitsubishi.
            </p>
          </div>

          <div className="middle">
            <ul>
              <li>✔ Chương trình ưu đãi đến 100% LPTB.</li>
              <li>✔ Quà tặng giá trị từ hãng.</li>
              <li>✔ Cập nhật bảng giá xe ô tô Mitsubishi.</li>
            </ul>
          </div>

          <div className="right-info">
            <div className="icons"> 
              <div className="icon"> 
                <svg viewBox="0 0 640 640" fill="currentColor"> 
                  <path d="M61.4 64C27.5 64 0 91.5 0 125.4 0 126.3 0 127.1 .1 128L0 128 0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256-.1 0c0-.9 .1-1.7 .1-2.6 0-33.9-27.5-61.4-61.4-61.4L61.4 64zM464 192.3L464 384c0 8.8-7.2 16-16 16L64 400c-8.8 0-16-7.2-16-16l0-191.7 154.8 117.4c31.4 23.9 74.9 23.9 106.4 0L464 192.3zM48 125.4C48 118 54 112 61.4 112l389.2 0c7.4 0 13.4 6 13.4 13.4 0 4.2-2 8.2-5.3 10.7L280.2 271.5c-14.3 10.8-34.1 10.8-48.4 0L53.3 136.1c-3.3-2.5-5.3-6.5-5.3-10.7z"/> </svg> 
              </div> <div className="icon"> 
                <svg viewBox="0 0 640 640 " fill="currentColor"> 
                  <path d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"/> </svg> 
              </div> <div className="icon"> 
                <svg viewBox="0 0 640 640" fill="currentColor"> 
                  <path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z"/> </svg> 
              </div>
            </div>

            <div className="form">
              <input
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button onClick={handleSubmit}>GỬI</button>
            </div>

            {error && <p className="error">{error}</p>}
          </div>

        </div>
      </section>
    </>
  );
}