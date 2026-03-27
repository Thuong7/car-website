import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="admin-layout">
          
          <aside className="admin-sidebar">
            <h2>🚗 Admin</h2>

            <nav>
              <a href="/admin/car-detail">Car Builder</a>
              <a href="/">← Về trang chính</a>
            </nav>
          </aside>

          <main className="admin-main">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}