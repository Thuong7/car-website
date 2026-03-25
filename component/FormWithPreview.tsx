"use client";

import Image from "next/image";
import { Car } from "@/component/types";
import "./Footer.css"

type Props = {
  cars: Car[];
  selectedCar: Car | null;
  setSelectedCar: (car: Car | null) => void;
};

export default function FormWithPreview({
  cars,
  selectedCar,
  setSelectedCar,
}: Props) {
  return (
    <section className="form-preview">
      
      <div className="preview-box">
        <Image
          src={selectedCar ? selectedCar.image : "/avatar.jpg"}
          alt={
            selectedCar
              ? `Xe ${selectedCar.name}`
              : "Nhân viên tư vấn Mitsubishi"
          }
          width={300}
          height={200}
        />

        <p className="dealer">MITSUBISHI SAVICO ĐÀ NẴNG</p>

        <p className="name">
          {selectedCar ? selectedCar.name : "NVKD - Hồ Ngọc Ly"}
        </p>
      </div>

      <form className="form-box-prv">
        <h2>NHẬN BÁO GIÁ & LÁI THỬ XE</h2>

        <div className="form-radio">
          <label>
            <input type="radio" name="payment" defaultChecked /> Trả góp
          </label>
          <label>
            <input type="radio" name="payment" /> Trả thẳng
          </label>
        </div>

        <input placeholder="Họ và tên" required />
        <input placeholder="Số điện thoại" required />

        <select
          defaultValue=""
          onChange={(e) =>
            setSelectedCar(
              cars.find((c) => c.slug === e.target.value) || null
            )
          }
        >
          <option value="">Xe muốn mua</option>

          {cars.map((car) => (
            <option key={car.id} value={car.slug}>
              {car.name}
            </option>
          ))}
        </select>

        <button type="submit">GỬI YÊU CẦU</button>
      </form>
    </section>
  );
}