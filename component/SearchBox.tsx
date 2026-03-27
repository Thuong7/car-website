"use client";

import { useState } from "react";

type Props<T> = {
  data: T[];
  onResult: (result: T[]) => void;
  getValue: (item: T) => string; 
  placeholder?: string;
};

export default function SearchBox<T>({
  data,
  onResult,
  getValue,
  placeholder = "Tìm kiếm...",
}: Props<T>) {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);

    const filtered = data.filter((item) =>
      getValue(item).toLowerCase().includes(value.toLowerCase())
    );

    onResult(filtered);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={search}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button>🔍</button>
    </div>
  );
}