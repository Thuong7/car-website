"use client";

import { useEffect, useState } from "react";
import { Car } from "@/component/types";
import "./FormBox.css";
type Props = {
  hideTitle?: boolean;
  cars: Car[];
  selectedCar: Car | null;
  setSelectedCar: (car: Car | null) => void;
};
export default function FormBox({
  hideTitle,
  cars,
  selectedCar,
  setSelectedCar,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    car: "",
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
      return;
    }

    if (!isValidPhone(form.phone)) {
      setMessage("Số điện thoại không hợp lệ");
      return;
    }

    if (!form.car) {
      setMessage("Vui lòng chọn xe");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Gửi thành công!");
        setForm({
          name: "",
          phone: "",
          car: "",
          type: "Trả góp",
        });
        setSelectedCar(null);
      } else {
        setMessage("Gửi thất bại!");
      }
    } catch {
      setMessage("Lỗi server!");
    }

    setLoading(false);
  };
useEffect(() => {
  if (selectedCar) {
    setForm((prev) => ({
      ...prev,
      car: selectedCar.name,
    }));
  }
}, [selectedCar]);
  return (
    <form className="form-box" onSubmit={handleSubmit}>
      {!hideTitle && <h3>NHẬN BÁO GIÁ & LÁI THỬ XE</h3>}

      {/* TYPE */}
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

      {/* INPUT */}
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

      {/* SELECT CAR (DYNAMIC) */}
      <select
        value={selectedCar?.slug || ""}
        onChange={(e) => {
          const selected =
            cars.find((c) => c.slug === e.target.value) || null;

          setSelectedCar(selected);

          setForm({
            ...form,
            car: selected?.name || "",
          });
        }}
      >
        <option value="">Xe muốn mua</option>
        {cars.map((car) => (
          <option key={car._id} value={car.slug}>
            {car.name}
          </option>
        ))}
      </select>

      {/* MESSAGE */}
      {message && <p className="form-message">{message}</p>}

      {/* BUTTON */}
      <button type="submit" disabled={loading}>
        {loading ? "ĐANG GỬI..." : "GỬI YÊU CẦU"}
      </button>
    </form>
  );
}