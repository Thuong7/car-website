"use client";

import { useState } from "react";
import Link from "next/link"; // 
import SearchBox from "@/component/SearchBox";

import "../blog.css";
import { getCars } from "@/lib/getCars";

type Post = {
  _id: string;
  title: string;
  slug: string;
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

export default async function BlogSidebar({ posts }: any) {
  const cars = await getCars();
  return (
    <aside className="blog-sidebar">

      {/* SEARCH */}
      <SearchBox cars={cars} blogs={posts} /> 

      {/* RECENT */}
      <div className="recent-posts">
        <h3>BÀI VIẾT MỚI</h3>

        <ul>
          {posts?.length > 0 ? (
            posts.map((p: any) => (
              <li key={p._id} className="recent-item">
                <Link href={`/blog/${p.slug}`}>

                  <div className="thumb">
                    <img
                      src={
                        p.thumbnail && p.thumbnail.trim() !== ""
                          ? p.thumbnail
                          : getYoutubeThumbnail(p.youtubeUrl) || "/default.jpg"
                      }
                      alt={p.title || "blog"}
                      onError={(e: any) => (e.target.src = "/default.jpg")}
                    />
                  </div>

                  <div className="info">
                    <p>{p.title || p.name}</p>
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