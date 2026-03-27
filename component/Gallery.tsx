import Image from "next/image";
import styles from "./Gallery.module.css";

type Props = {
  images: string[];
};

export default function Gallery({ images }: Props) {
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
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.1 21 3 13.9 3 5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.9z"/>
              </svg>
            </div>
            <div>
              <p className={styles.label}>Hotline</p>
              <p className={styles.phone}>0934 780 797</p>
            </div>
          </div>

          <div className={styles.actions}>
            <p>✔ Đăng ký lái thử xe.</p>
            <p>✔ Nhận báo giá lăn bánh.</p>
          </div>
        </div>

        {/* 🔥 chỉ render ảnh */}
        <div className={styles.grid}>
          {images.map((url, i) => (
            <div key={i} className={styles.card}>
              <Image
                src={url}
                alt=""
                width={300}
                height={200}
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}