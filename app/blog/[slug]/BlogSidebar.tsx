"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBox from "@/component/SearchBox";
import "../blog.css";

type Post = {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
};

function getYoutubeThumbnail(url?: string) {
  if (!url) return null;

  const id =
    url.split("v=")[1]?.split("&")[0] ||
    url.split("/").pop();

  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : null;
}

export default function BlogSidebar({ posts }: { posts: Post[] }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/cars")
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);

  return (
    <aside className="blog-sidebar">

      {/* SEARCH */}
      <SearchBox cars={cars} blogs={posts} />

      {/* RECENT */}
      <div className="recent-posts">
        <h3>BÀI VIẾT MỚI</h3>

        <ul>
          {posts?.length > 0 ? (
            posts.map((p) => (
              <li key={p._id} className="recent-item">
                <Link href={`/blog/${p.slug}`}>
                  
                  <div className="thumb">
                    <img
                      src={
                        p.thumbnail && p.thumbnail.trim() !== ""
                          ? p.thumbnail
                          : "/default.jpg"
                      }
                      alt={p.title}
                      onError={(e: any) => (e.target.src = "/default.jpg")}
                    />
                  </div>

                  <div className="info">
                    <p>{p.title}</p>
                  </div>

                </Link>
              </li>
            ))
          ) : (
            <p>Chưa có bài viết</p>
          )}
        </ul>
      </div>

    </aside>
  );
}