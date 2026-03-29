"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Review } from "./ReviewPage";

export default function ReviewForm({
  onAdd,
}: {
  onAdd: (r: Review) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    car: "",
    rating: 5,
    content: "",
    image: "",
  });

  const handleSubmit = async () => {
    if (!form.name || !form.content) return;

    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    onAdd(data);

    setForm({
      name: "",
      location: "",
      car: "",
      rating: 5,
      content: "",
      image: "",
    });
  };

  return (
    <div className="review-form">
      <input
        placeholder="Tên"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Địa chỉ"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <input
        placeholder="Xe đã mua"
        value={form.car}
        onChange={(e) => setForm({ ...form, car: e.target.value })}
      />

      {/* rating */}
      <div>
        {[1, 2, 3, 4, 5].map((s) => (
          <span className={`star ${s <= form.rating ? "active" : ""}`}
            key={s}
            onClick={() => setForm({ ...form, rating: s })}
            style={{
              cursor: "pointer",
              color: s <= form.rating ? "gold" : "#ccc",
              fontSize: 20,
            }}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="Nội dung"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <ImageUpload
        onUpload={(url) => setForm({ ...form, image: url })}
      />

      {form.image && (
        <img src={form.image} style={{ width: 120, marginTop: 10 }} />
      )}

      <button className="review-btn" onClick={handleSubmit}>Gửi</button>
    </div>
  );
}