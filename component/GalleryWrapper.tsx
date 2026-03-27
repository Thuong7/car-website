"use client";

import { useEffect, useState } from "react";
import Gallery from "./Gallery";

export default function GalleryWrapper() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/gallery");

      if (!res.ok) {
        console.error("API ERROR");
        return;
      }

      const data = await res.json();

      setImages(data.images || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  fetchData();
}, []);

  
  return (
    <Gallery
      images={images}
    />
  );
}