import { useState } from "react";
import { Section } from "@/component/types";

type ImageData = Extract<Section, { type: "fullImage" }>["data"];

type Props = {
  data: ImageData;
  onChange: (data: ImageData) => void;
};

export default function ImageBlock({ data, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const inputId = `upload-img-${Math.random()}`;

  const handleUpload = async (file: File) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({ file: reader.result }),
          headers: { "Content-Type": "application/json" },
        });

        const json = await res.json();

        if (!json.url) throw new Error("Upload failed");

        onChange({
          ...data,
          image: json.url,
        });
      } catch (err) {
        console.error("Upload fail:", err);
      }

      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Image Block</h3>

      <button
        onClick={() => document.getElementById(inputId)?.click()}
      >
        {data.image ? "Change Image" : "Upload Image"}
      </button>

      <input
        id={inputId}
        type="file"
        hidden
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
            e.target.value = ""; // 🔥 quan trọng
          }
        }}
      />

      {loading && <p>Uploading...</p>}

      {data.image && (
        <div>
          <img
            src={data.image}
            style={{ width: "100%", marginTop: 10 }}
          />

          <button
            onClick={() =>
              onChange({
                ...data,
                image: "",
              })
            }
          >
            ❌ Remove
          </button>
        </div>
      )}

      <input
        placeholder="Caption..."
        value={data.caption ?? ""}
        onChange={(e) =>
          onChange({
            ...data,
            caption: e.target.value,
          })
        }
      />
    </div>
  );
}