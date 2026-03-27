"use client";

const MAX_IMAGES = 12;

type Props = {
  data: {
    images: string[];
  };
  onChange: (data: any) => void;
};

export default function GalleryBlock({ data, onChange }: Props) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const reader = new FileReader();

      const base64 = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: base64 }),
      });

      const json = await res.json();
      console.log("UPLOAD RES:", json);
      uploaded.push(json.url);
    }

    // 🔥 giữ tối đa 12 ảnh (giữ ảnh mới nhất)
    let updated = [...data.images, ...uploaded];

    if (updated.length > MAX_IMAGES) {
      updated = updated.slice(-MAX_IMAGES);
    }

    onChange({
      ...data,
      images: updated,
    });
  };

  const handleDelete = (index: number) => {
    const updated = data.images.filter((_, i) => i !== index);

    onChange({
      ...data,
      images: updated,
    });
  };

  return (
    <div>
        <h3>Gallery</h3>

        {/* 🔥 nút chọn file */}
        <label
            style={{
            display: "inline-block",
            padding: "10px 16px",
            background: "#333",
            color: "#fff",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: 10,
            }}
        >
            + Thêm ảnh
            <input
            type="file"
            multiple
            onChange={handleUpload}
            style={{ display: "none" }}
            />
        </label>

        <div
            style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 10,
            }}
        >
            {data.images.map((img, i) => (
            <div key={i} style={{ position: "relative" }}>
                <img src={img} style={{ width: "100%" }} />

                <button
                onClick={() => handleDelete(i)}
                style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    background: "red",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
                >
                ✕
                </button>
            </div>
            ))}
        </div>
        </div>
  );
}