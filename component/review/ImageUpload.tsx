"use client";

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const handleUpload = async (file: File) => {
  const reader = new FileReader();

  reader.onloadend = async () => {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 👈 QUAN TRỌNG
      },
      body: JSON.stringify({
        file: reader.result, // base64
      }),
    });

    const data = await res.json();
    onUpload(data.url);
  };

  reader.readAsDataURL(file);
};

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
      }}
    />
  );
}