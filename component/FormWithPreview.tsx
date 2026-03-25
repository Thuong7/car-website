"use client";

import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Trả góp",
  });

  const isValidPhone = (phone: string) => {
    return /^(0|\+84)[0-9]{9}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!form.name.trim()) {
      setMessage("Vui lòng nhập họ tên");
      setStatus("error");
      return;
    }

    if (!isValidPhone(form.phone)) {
      setMessage("Số điện thoại không hợp lệ");
      setStatus("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setStatus("");

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          car: selectedCar?.name || "",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Gửi thành công!");
        setStatus("success");

        setForm({
          name: "",
          phone: "",
          type: "Trả góp",
        });

        setSelectedCar(null);
      } else {
        setMessage(" Gửi thất bại!");
        setStatus("error");
      }
    } catch {
      setMessage(" Lỗi server!");
      setStatus("error");
    }

    setLoading(false);

    setTimeout(() => {
      setMessage("");
      setStatus("");
    }, 3000);
  };

  return (
    <section className="form-preview">

      <div className="preview-box">
        <Image
          src={selectedCar ? selectedCar.image : "/avatar.jpg"}
          className={!selectedCar ? "avatar" : ""}
          alt="preview"
          width={200}
          height={200}
        />

        <p className="dealer">MITSUBISHI SAVICO ĐÀ NẴNG</p>

        <p className="name">
          {selectedCar ? selectedCar.name : "NVKD - Hồ Ngọc Ly"}
        </p>
      </div>

      <form className="form-box" onSubmit={handleSubmit}>
        <h3>NHẬN BÁO GIÁ & LÁI THỬ XE</h3>

        <div className="form-radio">
          <label>
            <input
              type="radio"
              value="Trả góp"
              checked={form.type === "Trả góp"}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            />
            Trả góp
          </label>

          <label>
            <input
              type="radio"
              value="Trả thẳng"
              checked={form.type === "Trả thẳng"}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            />
            Trả thẳng
          </label>
        </div>

        <input
          placeholder="Họ và tên"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <select
          value={selectedCar?.slug || ""}
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

        {message && (
          <p className={`form-message ${status}`}>
            {message}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "ĐANG GỬI..." : "GỬI YÊU CẦU"}
        </button>
      </form>
    </section>
  );
}