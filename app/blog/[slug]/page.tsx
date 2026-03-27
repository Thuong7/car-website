import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import BlogSidebar from "./BlogSidebar";
import "../blog.css";
import { Metadata } from "next";

// convert youtube
function getYoutubeEmbed(url: string) {
  if (!url) return "";
  const id = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${id}`;
}

// ======================
// SEO (FIXED)
// ======================
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;

  const client = await clientPromise;
  const db = client.db("car-showroom");

  const blog = await db.collection("blogs").findOne({ slug });

  if (!blog) {
    return { title: "Không tồn tại" };
  }

  const title = blog.title || blog.name;

  return {
    title,
    description: blog.description || "",
    openGraph: {
      title,
      description: blog.description || "",
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
  };
}

// ======================
// DATA
// ======================
async function getBlog(slug: string) {
  const client = await clientPromise;
  const db = client.db("car-showroom");

  return db.collection("blogs").findOne({ slug });
}

async function getRecentBlogs() {
  const client = await clientPromise;
  const db = client.db("car-showroom");

  return db
    .collection("blogs")
    .find()
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();
}

// ======================
// PAGE
// ======================
export default async function BlogDetail({ params }: any) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  const postsRaw = await getRecentBlogs();

  const posts = postsRaw.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toString(),
  }));

  if (!blog) return notFound();

  const title = blog.title || blog.name;
  const videoBlock = blog.sections?.find(
    (s: any) => s.type === "video"
  );

  const videoUrl = videoBlock?.data?.url;
  return (
    <div className="blog-wrapper">

      {/* LEFT */}
      <div className="blog-content">
        <p className="blog-category">TIN TỨC, VIDEO BLOG</p>

        <h1>{title}</h1>

        {videoUrl && (
          <div className="video-wrapper">
            <iframe
              src={getYoutubeEmbed(videoUrl)}
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* RIGHT */}
      <BlogSidebar posts={posts} />
    </div>
  );
}