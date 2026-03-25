"use client";

import { useState } from "react";
import "./FormBox.css";

type Props = {
  hideTitle?: boolean; // 👈 thêm dòng này
};

export default function FormBox({ hideTitle }: Props) {
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
      } else {
        setMessage("Gửi thất bại!");
      }
    } catch {
      setMessage("Lỗi server!");
    }

    setLoading(false);
  };

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      
      {!hideTitle && <h3>NHẬN BÁO GIÁ & LÁI THỬ XE</h3>}

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
        value={form.car}
        onChange={(e) =>
          setForm({ ...form, car: e.target.value })
        }
      >
        <option value="">Xe muốn mua</option>
        <option value="XPANDER">XPANDER</option>
        <option value="TRITON">TRITON</option>
        <option value="ATTRAGE">ATTRAGE</option>
      </select>

      {message && <p className="form-message">{message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "ĐANG GỬI..." : "GỬI YÊU CẦU"}
      </button>
    </form>
  );
}