import Image from "next/image";
import "./contact.css";
export default function BannerSimple() {
  return (
    <div className="bannerSimple">
      <Image
        src="/banner-m-01.jpg"
        alt="Showroom"
        fill
        className="bannerImg"
      />

      <div className="bannerOverlay" />

      <div className="bannerContent">
        <p>SHOWROOM</p>
        <h2>MITSUBISHI SAVICO ĐÀ NẴNG</h2>

        <a
          href="https://www.google.com/maps?q=02+Nguyễn+Hữu+Thọ+Đà+Nẵng"
          target="_blank"
        >
          Showroom: 02 Nguyễn Hữu Thọ, Hải Châu, Đà Nẵng
        </a>

        <a href="tel:0934780797" className="icon-sc btn">
                <svg viewBox="0 0 640 640 "  fill="currentColor">
                  <path d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"/>
                </svg>0934 780 797
              </a>
      </div>
    </div>
  );
}