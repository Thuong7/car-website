import { useState } from "react";
import { Section } from "@/component/types";

type FeaturesData = Extract<Section, { type: "features" }>["data"];

type Props = {
  data: FeaturesData;
  onChange: (data: FeaturesData) => void;
};

export default function FeaturesBlock({ data = [], onChange }: Props) {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const addItem = () => {
    onChange([...data, { image: "anh chua upload", title: "" }]);
  };

  const removeItem = (i: number) => {
    onChange(data.filter((_, idx) => idx !== i));
  };

  const updateItem = (
    i: number,
    field: "image" | "title",
    value: string | null
  ) => {
    const newData = data.map((item, idx) =>
      idx === i ? { ...item, [field]: value } : item
    );
    onChange(newData);
  };

  const handleUpload = async (file: File, i: number) => {
  const reader = new FileReader();

  reader.onloadend = async () => {
    setLoadingIndex(i);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ file: reader.result }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      console.log("FEATURE JSON:", json);

      updateItem(i, "image", json.url); 
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoadingIndex(null);
    }
  };

  reader.readAsDataURL(file);
};

  return (
    <div>
      <h3>Features</h3>

      {data.map((item, i) => (
        <div key={i} style={{ marginBottom: 20, borderBottom: "1px solid #333", paddingBottom: 10 }}>
          
          {/* upload */}
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleUpload(e.target.files[0], i);
              }
            }}
          />

          {loadingIndex === i && <p>Uploading...</p>}

          {/* preview */}
          {item.image && (
            <img src={item.image} style={{ width: 120, marginTop: 10 }} />
          )}

          {/* title */}
          <input
            placeholder="Feature title..."
            value={item.title ?? ""}
            onChange={(e) => updateItem(i, "title", e.target.value)}
          />

          {/* delete */}
          <button onClick={() => removeItem(i)}>❌ Xoá</button>
        </div>
      ))}

      <button onClick={addItem}>+ Add Feature</button>
    </div>
  );
}