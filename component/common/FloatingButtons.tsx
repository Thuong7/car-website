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
            <Image src="/Facebook.png" alt="Facebook" width={35} height={35} />
          </a>

          <a
            href="https://zalo.me/0934780797"
            target="_blank"
            rel="noopener noreferrer"
            className="float-btn zalo"
          >
            <Image src="/zalo.png" alt="Zalo" width={30} height={30} />
          </a>

          <a href="tel:0934780797" className="float-btn phone">
            <Image src="/phone.png" alt="Call" width={35} height={35} />
          </a>
        </div>

        {/* MOBILE */}
        <div className="mobile-bar">
        <a href="tel:0934780797" className="mobile-btn call">
            <img src="/phone.png" width={16} height={16} />
            0934 780 797
            </a>

            <button
            className="mobile-btn quote"
            onClick={() => setOpenPopup(true)}
            >
            <img src="/money.png" width={16} height={16} />
            Nhận báo giá
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