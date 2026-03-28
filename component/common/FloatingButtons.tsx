"use client";

import Image from "next/image";
import "./FloatingButtons.css";
import { useState } from "react";
import FormPopup from "@/component/FormModal"; // nhớ import

export default function FloatingButtons({ cars }: any) {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <div className="floating">

        {/* DESKTOP */}
        <div className="floating-desktop">    
          <a
            href="https://www.facebook.com/share/1ECSXyCXBm/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="float-btn fb"
          >
            <Image src="/icons/fb.png" alt="Facebook" width={30} height={30} />
          </a>

          <a
            href="https://zalo.me/0934780797"
            target="_blank"
            rel="noopener noreferrer"
            className="float-btn zalo"
          >
            <Image src="/icons/zalo.png" alt="Zalo" width={30} height={30} />
          </a>

          <a href="tel:0934780797" className="float-btn phone">
            <Image src="/icons/phone.png" alt="Call" width={28} height={28} />
          </a>
        </div>

        {/* MOBILE */}
        <div className="mobile-bar">
          <a href="tel:0934780797" className="mobile-btn call">
            📞 0934 780 797
          </a>

          <button
            className="mobile-btn quote"
            onClick={() => setOpenPopup(true)}
          >
            💲 Nhận báo giá
          </button>
        </div>

      </div>

      {/* POPUP */}
      <FormPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        cars={cars}
        selectedCar={null}
        setSelectedCar={() => {}}
      />
    </>
  );
}