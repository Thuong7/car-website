"use client";
import "@/component/admin/Builder.css"
type Props = {
  data: {
    title?: string;
    url?: string;
    caption?: string;
    thumbnail?: string | null;
  };
  onChange: (data: any) => void;
};

export default function VideoBlock({ data, onChange }: Props) {
  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="block">

      {/* TITLE */}
      <div className="field">
        <label>Tiêu đề video</label>
        <input
          type="text"
          value={data.title || ""}
          placeholder="Nhập tiêu đề..."
          onChange={(e) =>
            handleChange("title", e.target.value)
          }
        />
      </div>

      {/* URL */}
      <div className="field">
        <label>Youtube URL</label>
        <input
          type="text"
          value={data.url || ""}
          placeholder="https://youtube.com/watch?v=..."
          onChange={(e) =>
            handleChange("url", e.target.value)
          }
        />
      </div>

      {/* THUMBNAIL */}
      <div className="field">
        <label>Thumbnail (ảnh preview)</label>
        <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                });

                const result  = await res.json();

                onChange({
                ...data,
                thumbnail: result.url,
                });
                console.log("FINAL DATA:", data);
            }}
            />
      </div>

      {/* CAPTION */}
      <div className="field">
        <label>Mô tả ngắn</label>
        <textarea
          value={data.caption || ""}
          placeholder="Mô tả video..."
          onChange={(e) =>
            handleChange("caption", e.target.value)
          }
        />
      </div>

    </div>
  );
}