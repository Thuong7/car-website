import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import Image from "next/image";
import "./blog.css";
import { useSearch } from "@/component/utils/useSearch";
import { cars } from "@/component/data";
import SearchSidebar from "@/component/SearchBox";
import SearchBox from "@/component/SearchBox";
export const revalidate = 60;
import type { Metadata } from "next";
// ======================
// DATA
// ======================
export const metadata: Metadata = {
  title: "Tin tức Mitsubishi Đà Nẵng – Đánh giá & video mới nhất",
  description:
    "Cập nhật tin tức, video đánh giá xe Mitsubishi mới nhất tại Đà Nẵng. Xem ngay giá xe, ưu đãi và trải nghiệm thực tế.",
};
async function getBlogs() {
  const client = await clientPromise;
  const db = client.db("car-showroom");

  return db
    .collection("blogs")
    .find(
      {},
      {
        projection: {
          slug: 1,
          name: 1,
          sections: 1,
          createdAt: 1,
        },
      }
    )
    .sort({ createdAt: -1 })
    .toArray();
}

// ======================
// PAGE
// ======================
export default async function BlogList() {
  const blogsRaw = await getBlogs();

  const blogs = blogsRaw.map((b: any) => {
    const video = b.sections?.find(
      (s: any) => s.type === "video"
    );

    return {
      _id: b._id.toString(),
      slug: b.slug,
      title:
        video?.data?.title ||
        b.title ||
        b.name ||
        "No title",
      thumbnail:
        video?.data?.thumbnail ||
        "/default.jpg",
      description:
        video?.data?.caption || "",
    };
  });

  return (
    <>
    <div className="blog-wrapper">
      <section className="seo-hidden">
        <h2>Tin tức xe Mitsubishi</h2>
        <p>
          Tổng hợp bài viết đánh giá, video trải nghiệm và cập nhật giá xe Mitsubishi mới nhất tại Đà Nẵng.
        </p>
      </section>
      {/* LEFT */}
      <div className="blog-list">
        {blogs.map((blog) => (
          <article key={blog._id} className="blog-item">

            {/* IMAGE */}
            <Link
              href={`/blog/${blog.slug}`}
              className="blog-thumb"
            >
              <Image
                src={blog.thumbnail}
                alt={blog.title}
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

        {/* SEARCH */}
        <SearchBox cars={cars} blogs={blogs} />
        {/* RECENT */}
        <div className="recent-posts">
          <h3>BÀI VIẾT MỚI</h3>

          <ul>
            {blogs.slice(0, 5).map((b) => (
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
        <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Tin tức Mitsubishi Đà Nẵng",
          url: "https://mitsubishi-danang.vn/blog",
        }),
      }}
    />
    </>
  );
}