import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import Image from "next/image";
import "./blog.css";
export const revalidate = 60; // cache 60s

async function getBlogs() {
  const client = await clientPromise;
  const db = client.db("car-showroom");

  return db
    .collection("blogs")
    .find(
      {},
      {
        projection: {
          title: 1,
          slug: 1,
          thumbnail: 1,
          description: 1,
          createdAt: 1,
        },
      }
    )
    .sort({ createdAt: -1 })
    .toArray();
}

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <div className="blog-wrapper">

      {/* LEFT */}
      <div className="blog-list">
        {blogs.map((blog: any) => (
          <article key={blog._id} className="blog-item">

            {/* IMAGE */}
            <Link
              href={`/blog/${blog.slug}`}
              className="blog-thumb"
            >
              <Image
                src={blog.thumbnail || "/default.jpg"}
                alt={blog.title || blog.name || "thumbnail"}
                width={400}
                height={250}
              />
            </Link>

            {/* CONTENT */}
            <div className="blog-info">
              <Link href={`/blog/${blog.slug}`}>
                <h2>{blog.title}</h2>
              </Link>

              <p className="blog-desc">
                {blog.description || "Đang cập nhật..."}
              </p>
            </div>

          </article>
        ))}
      </div>

      {/* RIGHT */}
      <aside className="blog-sidebar">

        {/* SEARCH (để sau nâng cấp API) */}
        <div className="search-box">
          <input placeholder="Tìm kiếm..." />
          <button>🔍</button>
        </div>

        {/* RECENT */}
        <div className="recent-posts">
          <h3>BÀI VIẾT MỚI</h3>

          <ul>
            {blogs.slice(0, 5).map((b: any) => (
              <li key={b._id}>
                <Link href={`/blog/${b.slug}`}>
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </aside>

    </div>
  );
}