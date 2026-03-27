"use client";

import { useEffect, useState } from "react";
import { CarDetailAdmin, SectionWithId } from "@/component/cms-admin";
import { Section } from "@/component/types";
import BlockRenderer from "./BlockRenderer";
import "./Builder.css";

type Props = {
  data: CarDetailAdmin;
  setData: React.Dispatch<React.SetStateAction<CarDetailAdmin>>;
  setIsEditing: (v: boolean) => void;
};

export default function Builder({ data, setData, setIsEditing }: Props) {
  const [cars, setCars] = useState<any[]>([]);

  // 🔥 load list xe
  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch("/api/car-detail");
      const json = await res.json();
      setCars(json);
    };

    fetchCars();
  }, []);

  const loadCar = async (slug: string) => {
    const res = await fetch(`/api/car-detail?slug=${slug}`);
    const car = await res.json();

    if (!res.ok) {
      alert("Không tìm thấy xe");
      return;
    }

    setData({
      ...car,
      sections: car.sections.map((s: any) => ({
        ...s,
        id: crypto.randomUUID(),
      })),
    });

    setIsEditing(true);
  };
    const handleSave = async () => {
      // 1. tách gallery ra
      const galleryBlock = data.sections.find(
        (s) => s.type === "gallery"
      );

      const galleryImages = galleryBlock?.data.images || [];

      // 2. loại gallery khỏi sections
      const cleanSections = data.sections.filter(
        (s) => s.type !== "gallery"
      );

      // 3. save car
      await fetch("/api/car-detail", {
        method: "POST", // hoặc PUT tuỳ m
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          sections: cleanSections,
        }),
      });

      // 4. save gallery riêng
      await fetch("/api/gallery", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: galleryImages,
        }),
      });

      alert("Save OK");
    };
  const addBlock = (type: Section["type"]) => {
    let newBlock: Section;

    if (type === "hero") {
      newBlock = {
        type,
        data: { gallery: [], priceList: [], promo: [] },
      };
    } else if (type === "description") {
      newBlock = {
        type,
        data: { title: "", heading: "", content: "" },
      };
    } else if (type === "fullImage") {
      newBlock = {
        type,
        data: { image: "", caption: null },
      };
    } else if (type === "gallery") {
        newBlock = {
          type,
          data: {
            images: [],
          },
        };
      }else {
      newBlock = {
        type,
        data: [],
      };
    }

    const blockWithId: SectionWithId = {
      ...newBlock,
      id: crypto.randomUUID(),
    };

    setData({
      ...data,
      sections: [...data.sections, blockWithId],
    });
  };

  const updateBlock = (id: string, newData: any) => {
    const updated = data.sections.map((s) =>
      s.id === id ? { ...s, data: newData } : s
    );

    setData({
      ...data,
      sections: updated,
    });
  };

  const deleteBlock = (id: string) => {
    setData({
      ...data,
      sections: data.sections.filter((s) => s.id !== id),
    });
  };
  const hasGallery = data.sections.some(
  (s) => s.type === "gallery"
);
  return (
    <div className="builder-layout">

      {/* SIDEBAR */}
      <div className="builder-sidebar">
        <h3>Cars</h3>

        {/* 🔥 LIST XE */}
        <div style={{ marginBottom: 20 }}>
          {cars.map((c) => (
            <div
              key={c.slug}
              onClick={() => loadCar(c.slug)}
              style={{
                padding: 8,
                cursor: "pointer",
                borderBottom: "1px solid #333",
              }}
            >
              {c.name}
            </div>
          ))}
        </div>

        <h3>Blocks</h3>

        <button onClick={() => addBlock("hero")}>+ Hero</button>
        <button onClick={() => addBlock("description")}>+ Description</button>
        <button onClick={() => addBlock("fullImage")}>+ Ảnh to</button>
        <button onClick={() => addBlock("features")}>+ Layout ảnh</button>
        <button onClick={() => addBlock("gallery")}>+ Ảnh nhận xe</button>
      </div>

      {/* MAIN */}
      <div className="builder-main">
        <h2>Builder</h2>

        <div className="builder-form">
          <input
            placeholder="Car name..."
            value={data.name}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

          <input
            placeholder="Slug"
            value={data.slug}
            onChange={(e) =>
              setData({ ...data, slug: e.target.value })
            }
          />
        </div>

        <div className="builder-content">
          {data.sections.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              onChange={(d: any) => updateBlock(block.id, d)}
              onDelete={() => deleteBlock(block.id)}
            />
          ))}
        </div>
        {hasGallery && (
          <button
            onClick={handleSave}
            style={{
              padding: "10px 16px",
              background: "green",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginTop: 20,
            }}
          >
            Save
          </button>
        )}
      </div>

    </div>
  );
}