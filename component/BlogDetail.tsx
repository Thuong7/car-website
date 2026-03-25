"use client";

import { useState } from "react";

const postsData = [
  "New Mitsubishi Xpander",
  "Mitsubishi ALL – NEW TRITON",
  "New Mitsubishi Triton Athlete",
];

export default function BlogDetail() {
  const [search, setSearch] = useState("");

  const filteredPosts = postsData.filter((post) =>
    post.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blog-wrapper">
      
      <div className="blog-content">
        <p className="blog-category">TIN TỨC, VIDEO BLOG</p>
        <h1>NEW MITSUBISHI XPANDER</h1>

        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <aside className="blog-sidebar">

        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>

        <div className="recent-posts">
          <h3>BÀI VIẾT MỚI</h3>

          <ul>
            {filteredPosts.map((post, i) => (
              <li key={i}>{post}</li>
            ))}
          </ul>
        </div>

      </aside>
    </div>
  );
}