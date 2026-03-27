"use client";

import { useState } from "react";

type Props = {
  data: any;
  onChange: (data: any) => void;
};

export default function HeroBlock({ data, onChange }: Props) {
  const hero = data || {
    gallery: [],
    priceList: [],
    promo: [],
  };

  const [loading, setLoading] = useState(false);

  // ================= UPLOAD SINGLE =================
  const handleUpload = async (file: File, index: number) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      setLoading(true);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ file: reader.result }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      const newGallery = hero.gallery.map((img: any, i: number) =>
        i === index ? json.url : img
      );

      onChange({ ...hero, gallery: newGallery });

      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  // ================= UPLOAD MULTIPLE =================
  const handleMultiUpload = async (files: File[]) => {
    setLoading(true);

    let newGallery = [...hero.gallery];

    for (const file of files) {
      const reader = new FileReader();

      const base64: any = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ file: base64 }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      newGallery.push(json.url);
    }

    onChange({ ...hero, gallery: newGallery });

    setLoading(false);
  };

  // ================= GALLERY =================
  const addImage = () => {
    onChange({
      ...hero,
      gallery: [...hero.gallery, null],
    });
  };

  const removeImage = (index: number) => {
    const newGallery = hero.gallery.filter(
      (_: any, i: number) => i !== index
    );
    onChange({ ...hero, gallery: newGallery });
  };

  // set ảnh chính
  const setMain = (index: number) => {
    const newGallery = [...hero.gallery];
    const [main] = newGallery.splice(index, 1);
    newGallery.unshift(main);
    onChange({ ...hero, gallery: newGallery });
  };

  // reorder
  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= hero.gallery.length) return;

    const newGallery = [...hero.gallery];
    const item = newGallery.splice(from, 1)[0];
    newGallery.splice(to, 0, item);

    onChange({ ...hero, gallery: newGallery });
  };

  // ================= PRICE =================
  const addPrice = () => {
    onChange({
      ...hero,
      priceList: [...hero.priceList, { version: "", price: "" }],
    });
  };

  const updatePrice = (i: number, field: string, value: string) => {
    const newList = hero.priceList.map((item: any, idx: number) =>
      idx === i ? { ...item, [field]: value } : item
    );

    onChange({ ...hero, priceList: newList });
  };

  const removePrice = (i: number) => {
    const newList = hero.priceList.filter(
      (_: any, idx: number) => idx !== i
    );
    onChange({ ...hero, priceList: newList });
  };

  // ================= PROMO =================
  const addPromo = () => {
    onChange({
      ...hero,
      promo: [...hero.promo, ""],
    });
  };

  const updatePromo = (i: number, value: string) => {
    const newPromo = hero.promo.map((p: string, idx: number) =>
      idx === i ? value : p
    );
    onChange({ ...hero, promo: newPromo });
  };

  const removePromo = (i: number) => {
    const newPromo = hero.promo.filter(
      (_: any, idx: number) => idx !== i
    );
    onChange({ ...hero, promo: newPromo });
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Hero Section</h3>

      {/* ================= GALLERY ================= */}
      <h4>Gallery</h4>

      {/* upload multiple */}
      <input
        type="file"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            handleMultiUpload(Array.from(e.target.files));
          }
        }}
      />

      {loading && <p>Uploading...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginTop: 10,
        }}
      >
        {hero.gallery.map((img: any, i: number) => (
          <div key={i}>
            {/* upload single */}
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleUpload(e.target.files[0], i);
                }
              }}
            />

            {/* preview */}
            {img && (
              <img
                src={img}
                onClick={() => setMain(i)}
                style={{
                  width: "100%",
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                  border:
                    i === 0
                      ? "3px solid red"
                      : "1px solid #ccc",
                  cursor: "pointer",
                }}
              />
            )}

            {/* controls */}
            <div style={{ display: "flex", gap: 5 }}>
              <button onClick={() => moveImage(i, i - 1)}>⬆</button>
              <button onClick={() => moveImage(i, i + 1)}>⬇</button>
              <button onClick={() => removeImage(i)}>❌</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addImage}>+ Add Image</button>

      {/* ================= PRICE ================= */}
      <h4>Price List</h4>

      {hero.priceList.map((item: any, i: number) => (
        <div key={i}>
          <input
            placeholder="Version"
            value={item.version}
            onChange={(e) =>
              updatePrice(i, "version", e.target.value)
            }
          />

          <input
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
              updatePrice(i, "price", e.target.value)
            }
          />

          <button onClick={() => removePrice(i)}>❌</button>
        </div>
      ))}

      <button onClick={addPrice}>+ Add Price</button>

      {/* ================= PROMO ================= */}
      <h4>Promo</h4>

      {hero.promo.map((p: string, i: number) => (
        <div key={i}>
          <input
            value={p}
            onChange={(e) => updatePromo(i, e.target.value)}
          />

          <button onClick={() => removePromo(i)}>❌</button>
        </div>
      ))}

      <button onClick={addPromo}>+ Add Promo</button>
    </div>
  );
}