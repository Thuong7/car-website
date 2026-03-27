"use client";

import { useState } from "react";
import SearchBox from "@/component/SearchBox";
import Link from "next/dist/client/link";
type Post = {
  _id: string;
  title: string;
  slug: string;
};

export default function BlogSidebar({ posts }: any) {
  return (
    <aside className="blog-sidebar">

      {/* SEARCH */}
      <div className="search-box">
        <input placeholder="Tìm kiếm..." />
        <button>🔍</button>
      </div>

      {/* RECENT */}
      <div className="recent-posts">
        <h3>BÀI VIẾT MỚI</h3>

        <ul>
          {posts?.length > 0 ? (
            posts.map((p: any) => (
              <li key={p._id}>
                <Link href={`/blog/${p.slug}`}>
                  {p.title || p.name}
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