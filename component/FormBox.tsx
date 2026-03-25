"use client";

import Image from "next/image";
import { Car } from "@/component/types";
import "./FormBox.css";
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
      
      <h2 className="sr-only">
        Nhận báo giá và đăng ký lái thử xe Mitsubishi
      </h2>

      <div className="preview-box">
        <Image
          src={selectedCar ? selectedCar.image : "/avatar.jpg"}
          alt={
            selectedCar
              ? `Hình ảnh xe ${selectedCar.name} Mitsubishi`
              : "Nhân viên tư vấn Mitsubishi Đà Nẵng"
          }
          width={180}
          height={180}
          priority
        />

        <p className="dealer">MITSUBISHI SAVICO ĐÀ NẴNG</p>

        <p className="name">
          {selectedCar ? selectedCar.name : "NVKD - Hồ Ngọc Ly"}
        </p>
      </div>

      <form className="form-box">
        <h3>NHẬN BÁO GIÁ & LÁI THỬ XE</h3>

        <fieldset className="form-radio">
          <legend className="sr-only">Hình thức thanh toán</legend>

          <label>
            <input type="radio" name="payment" defaultChecked />
            Trả góp
          </label>

          <label>
            <input type="radio" name="payment" />
            Trả thẳng
          </label>
        </fieldset>

        <input
          type="text"
          placeholder="Họ và tên"
          name="name"
          required
        />

        <input
          type="tel"
          placeholder="Số điện thoại"
          name="phone"
          required
        />

        <select
          name="car"
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