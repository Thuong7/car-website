"use client";

import Image from "next/image";
import FormBox from "./FormBox";
import "./FormBox.css";
import { useEffect } from "react";
import { Car } from "@/component/types";

type Props = {
  open: boolean;
  onClose: () => void;

  cars: Car[];
  selectedCar: Car | null;
  setSelectedCar: (car: Car | null) => void;
};

export default function FormPopup({
  open,
  onClose,
  cars,
  selectedCar,
  setSelectedCar,
}: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        

        <div className="popup-banner">
          <Image
            src="/email.jpg"
            alt="Mitsubishi Đà Nẵng - Nhận báo giá lăn bánh"
            width={600}
            height={200}
            style={{ width: "90%", height: "auto" }}
            priority
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>

        <div className="popup-content">
          <button className="popup-close" onClick={onClose}>
          ✕
        </button>
          <h2>NHẬN BÁO GIÁ LĂN BÁNH</h2>
          <p>
            Quý khách vui lòng điền thông tin để nhận báo giá nhanh nhất.
          </p>

          <FormBox
            hideTitle
            cars={cars}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
          />
        </div>
      </div>
    </div>
  );
}