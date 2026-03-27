import { useState } from "react";
import { Section } from "@/component/types";

type ImageData = Extract<Section, { type: "fullImage" }>["data"];

type Props = {
  data: ImageData;
  onChange: (data: ImageData) => void;
};

export default function ImageBlock({ data, onChange }: Props) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
  const reader = new FileReader();
  console.log("START UPLOAD");

  reader.onloadend = async () => {
    setLoading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ file: reader.result }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    console.log("JSON:", json);

    onChange({
      ...data,
      image: json.url,
    });

    setLoading(false);
  };

  reader.readAsDataURL(file);
};

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Image Block</h3>

      {!data.image && (
        <button
          onClick={() => document.getElementById("upload-img")?.click()}
        >
          Upload Image
        </button>
      )}

      <input
        id="upload-img"
        type="file"
        hidden
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
      />

      {loading && <p>Uploading...</p>}

      {data.image && (
        <div>
          <img src={data.image} style={{ width: "100%", marginTop: 10 }} />

          <button
            onClick={() =>
              onChange({
                ...data,
                image: "null",
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