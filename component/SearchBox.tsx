"use client";

import { useSearch } from "@/component/utils/useSearch";
import { useRouter } from "next/navigation";
import "@/component/utils/searchbox.css";

type Item = {
  id: string | number;
  type: "car" | "blog";
  title: string;
  slug: string;
  image?: string;
};

export default function SearchBox({
  cars,
  blogs,
}: {
  cars: any[];
  blogs: any[];
}) {
  const router = useRouter();

  const data: Item[] = [
  ...cars.map(
    (c): Item => ({
      id: c._id || c.id,
      type: "car",
      title: c.name,
      slug: c.slug,
      image: c.image,
    })
  ),
  ...blogs.map(
    (b): Item => ({
      id: b._id,
      type: "blog",
      title: b.title,
      slug: b.slug,
      image: b.thumbnail,
    })
  ),
];

  const { keyword, setKeyword, result } = useSearch(
    data,
    (item) => [item.title, item.slug]
  );

  return (
    <div className="search-box">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm kiếm..."
      />

      <button className="search-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="search-icon"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </button>

      {keyword && result.length > 0 && (
        <div className="search-result">
          {result.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="search-item"
              onClick={() =>
                router.push(
                  item.type === "car"
                    ? `/car/${item.slug}`
                    : `/blog/${item.slug}`
                )
              }
            >
              {/* IMAGE */}
              <img
                src={item.image || "/default.jpg"}
                className="search-thumb"
              />

              {/* CONTENT */}
              <div className="search-info">
                <h4>{item.title}</h4>
                <p>{item.type === "car" ? "Xe" : "Bài viết"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}