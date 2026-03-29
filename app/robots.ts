export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
    userAgent: "*",
    allow: "/",
    disallow: [
      "/api/",
      "/admin/",
    ],
  },
    ],
    sitemap: "https://mitsubishi-danang.vn/sitemap.xml",
    host: "https://mitsubishi-danang.vn",
  };
}