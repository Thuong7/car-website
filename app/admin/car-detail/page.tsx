"use client";

import { useState } from "react";
import Builder from "@/component/admin/Builder";
import Preview from "@/component/admin/Preview";
import { CarDetailAdmin } from "@/component/cms-admin";

export default function Page() {
  const [data, setData] = useState<CarDetailAdmin>({
    name: "",
    slug: "",
    sections: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const loadCar = async (slug: string) => {
  const res = await fetch(`/api/car-detail?slug=${slug}`);
  const car = await res.json();

  setData(car);
  setIsEditing(true);
};
  const handleSave = async () => {
    if (!data.name.trim() || !data.slug.trim()) {
      alert("Name và slug không được để trống ");
      return;
    }

    const cleanData = {
      ...data,
      name: data.name.trim(),
      slug: data.slug.trim(),

      sections: data.sections
        .map(({ id, ...rest }) => {
          if (rest.type === "features") {
            return {
              ...rest,
              data: rest.data
                .map((f: any) => ({
                  image: f.image?.trim() || "",
                  title: f.title?.trim() || null,
                }))
                .filter((f: any) => f.image),
            };
          }

          if (rest.type === "description") {
            return {
              ...rest,
              data: {
                title: rest.data.title?.trim() || "",
                heading: rest.data.heading?.trim() || null,
                content: rest.data.content?.trim() || null,
              },
            };
          }

          if (rest.type === "fullImage") {
            if (!rest.data.image?.trim()) return null;

            return {
              ...rest,
              data: {
                image: rest.data.image.trim(),
                caption: rest.data.caption?.trim() || null,
              },
            };
          }

          return rest;
        })
        .filter(Boolean),
    };

    console.log("SAVE DATA:", cleanData);

    const method = isEditing ? "PUT" : "POST";
    console.log("isEditing:", isEditing);
    console.log("METHOD:", method);
    const res = await fetch("/api/car-detail", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanData),
    });

    const json = await res.json();
    console.log("RESPONSE:", json);
    if (!res.ok) {
      alert(json.error);
      return;
    }

    alert(isEditing ? "Updated 🔥" : "Created 🔥");
  };

  // 🔥 DELETE
  const handleDelete = async () => {
    if (!data.slug) return;
    if (!confirm("Xoá xe này?")) return;

    const res = await fetch(
      `/api/car-detail?slug=${data.slug}`,
      {
        method: "DELETE",
      }
    );

    const json = await res.json();

    if (!res.ok) {
      alert(json.error);
      return;
    }

    alert("Đã xoá 🔥");

    // reset form
    setData({
      name: "",
      slug: "",
      sections: [],
    });

    setIsEditing(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT */}
      <div style={{ width: "50%", padding: 20, overflow: "auto" }}>
        <Builder data={data} setData={setData} setIsEditing={setIsEditing} />

        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "#fff",
            padding: 10,
            display: "flex",
            gap: 10,
          }}
        >
          <button onClick={handleSave}>
            {isEditing ? "Update" : "Create"}
          </button>

          {isEditing && (
            <button
              onClick={handleDelete}
              style={{ background: "red", color: "#fff" }}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ width: "50%", background: "#111", overflow: "auto" }}>
        <Preview
          data={{
            name: data.name,
            slug: data.slug,
            sections: data.sections.map(({ id, ...rest }) => rest),
          }}
        />
      </div>
    </div>
  );
}