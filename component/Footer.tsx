import "@/component/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      
      {/* TOP CTA */}
      <div className="footer-top">
        <div className="footer-container footer-top-inner">
          <div>
            <h2>ƯU ĐÃI & KHUYẾN MÃI</h2>
            <p>
              Quà tặng dành cho khách hàng gửi yêu cầu báo giá Online.
            </p>
            <i>
              * Quý khách vui lòng liên hệ hotline tư vấn để nhận được Khuyến mãi tốt nhất
            </i>
          </div>

          <a href="tel:0934780797 " className="footer-hotline">
            Hotline: 0934 780 797 
          </a>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="footer-container">

          <div className="footer-grid">
            <div>
              <h3>MITSUBISHI SAVICO ĐÀ NẴNG</h3>
              <p>
                Đại lý ủy quyền chính hãng Mitsubishi Việt Nam.
              </p>
              <p>
                Showroom: 02 Nguyễn Hữu Thọ, Hải Châu, Đà Nẵng.
              </p>
            </div>

            <div>
              <h3>HỖ TRỢ KHÁCH HÀNG</h3>
              <p>Hotline: 0934 780 797</p>
              <p>Email: cskh@mitsubishidanang.com</p>
            </div>

            <div>
              <h3 className="socials-h3" >FOLLOW</h3>
              <div className="socials">
                <a className="icon-sc">
                <svg viewBox="0 0 640 640" fill="currentColor">
                  <path d="M61.4 64C27.5 64 0 91.5 0 125.4 0 126.3 0 127.1 .1 128L0 128 0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256-.1 0c0-.9 .1-1.7 .1-2.6 0-33.9-27.5-61.4-61.4-61.4L61.4 64zM464 192.3L464 384c0 8.8-7.2 16-16 16L64 400c-8.8 0-16-7.2-16-16l0-191.7 154.8 117.4c31.4 23.9 74.9 23.9 106.4 0L464 192.3zM48 125.4C48 118 54 112 61.4 112l389.2 0c7.4 0 13.4 6 13.4 13.4 0 4.2-2 8.2-5.3 10.7L280.2 271.5c-14.3 10.8-34.1 10.8-48.4 0L53.3 136.1c-3.3-2.5-5.3-6.5-5.3-10.7z"/>
                </svg>
              </a>

              <a href="tel:0934780797" className="icon-sc">
                <svg viewBox="0 0 640 640 "  fill="currentColor">
                  <path d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"/>
                </svg>
              </a>

              <a href="https://www.facebook.com/share/1ECSXyCXBm/?mibextid=wwXIfr"target="_blank" rel="noopener noreferrer"className="icon-sc">
                <svg viewBox="0 0 640 640" fill="currentColor">
                  <path d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z"/>
                </svg>
              </a>
              </div>
            </div>
          </div>

          {/* bottom */}
          <div className="footer-bottom">
            <div className="footer-links">
              <a href="#">TRANG CHỦ</a>
              <a href="#">TRẢI NGHIỆM KHÁCH HÀNG</a>
              <a href="#">LIÊN HỆ</a>
            </div>

            <p>Copyright 2026 © mitsubishi-motorsdanang.vn</p>
          </div>

        </div>
      </div>

    </footer>
  );
}