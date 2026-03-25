"use client";

import { useState } from "react";
import styles from "./Gallery.module.css";

type ImageItem = {
  id: number;
  url: string;
};

const MAX_IMAGES = 12;

export default function Gallery() {
  const [images, setImages] = useState<ImageItem[]>([
    { id: 1, url: "/demo1.jpg" },
    { id: 2, url: "/demo2.jpg" },
    { id: 3, url: "/demo3.jpg" },
  ]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageItem[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => {
      let updated = [...prev, ...newImages];

      if (updated.length > MAX_IMAGES) {
        updated = updated.slice(updated.length - MAX_IMAGES);
      }

      return updated;
    });
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.containergallery}>
        <div className={styles.topInfo}>
        
        <div className={styles.avatar}>
          <img src="/avatar.jpg" alt="" />
        </div>

        <div className={styles.info}>
          <p className={styles.company}>MITSUBISHI SAVICO ĐÀ NẴNG</p>
          <h2 className={styles.name}>NVKD - HỒ NGỌC LY</h2>
        </div>

        <div className={styles.hotline}>
          <div className={styles.icon}>
            <svg viewBox="0 0 640 640 "  fill="currentColor">
              <path d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"/>
            </svg>
          </div>
          <div>
            <p className={styles.label}>Hotline</p>
            <p className={styles.phone}>0934 780 797 </p>
          </div>
        </div>

        <div className={styles.actions}>
          <p>✔ Đăng ký lái thử xe.</p>
          <p>✔ Nhận báo giá lăn bánh.</p>
        </div>

      </div>
      <div className={styles.header}>

        <label className={styles.uploadBtn}>
          + Thêm ảnh
          <input type="file" multiple hidden onChange={handleUpload} />
        </label>
      </div>

      <div className={styles.grid}>
        {images.map((img) => (
          <div key={img.id} className={styles.card}>
            <img src={img.url} alt="" />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}