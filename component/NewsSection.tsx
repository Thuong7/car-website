import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import "./NewsSection.css";

export default async function NewsSection() {
  const client = await clientPromise;
  const db = client.db("car-showroom");

  const blogsRaw = await db
    .collection("blogs")
    .find({}, { projection: { slug: 1, name: 1, sections: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(3) // 🔥 chỉ 3 bài
    .toArray();

  const blogs = blogsRaw.map((b: any) => {
    const video = b.sections?.find((s: any) => s.type === "video");

    return {
      slug: b.slug,
      title: video?.data?.title || b.name,
      thumbnail: video?.data?.thumbnail || "/default.jpg",
    };
  });

  const main = blogs[0];
  const list = blogs; // 🔥 KHÔNG slice nữa

  if (!main) return null;

  return (
    <section className="news">
      <div className="container">

        {/* HEADER */}
        <div className="news-header">
          <div className="news-text">
            <h2>TIN TỨC & SỰ KIỆN</h2>
            <p>
            Những mẫu xe Mitsubishi hoàn toàn mới, sự kết hợp tinh hoa giữa công nghệ tối tân và thiết kế sang trọng.
            {"\n"}
            Cập nhật thông tin và bảng giá sản phẩm mới nhất từ Mitsubishi Savico Đà Nãng. Hỗ trợ trả góp, đăng ký lái thử miễn phí. Đừng bỏ lỡ cơ hội sở hữu chiếc xe mơ ước với giá ưu đãi hấp dẫn!       
            </p>
          </div>

          <Link href="/blog" className="news-btn">
            Xem thêm
          </Link>
        </div>

        {/* GRID */}
        <div className="news-grid">

          {/* MAIN */}
          <Link href={`/blog/${main.slug}`} className="news-main">
            <Image
              src={main.thumbnail}
              alt={main.title}
              fill
              className="img"
            />
          </Link>

          {/* LIST */}
          <div className="news-list">
            {list.map((item) => (
              <Link
                href={`/blog/${item.slug}`}
                key={item.slug}
                className="news-item"
              >
                <div className="thumb">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                  />
                </div>

                <div className="info">
                  <h4>{item.title}</h4>
                  <span>XEM THÊM</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}