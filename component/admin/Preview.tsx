"use client";

import { CarDetailContent } from "@/component/types";

type Props = {
  data: CarDetailContent;
};

export default function Preview({ data }: Props) {
  return (
    <div
      style={{
        padding: 20,
        color: "#fff",
        background: "#111",
        minHeight: "100vh",
      }}
    >
      {/* NAME */}
      <h1 style={{ marginBottom: 20 }}>
        {data.name || "No name"}
      </h1>

      {/* SECTIONS */}
      {data.sections.map((s, i) => {
        switch (s.type) {
          case "description":
            if (!s.data) return null;

            return (
              <div key={i} style={{ marginBottom: 20 }}>
                {s.data.title && <h2>{s.data.title}</h2>}
                {s.data.heading && <h3>{s.data.heading}</h3>}
                {s.data.content && <p>{s.data.content}</p>}
              </div>
            );

          case "fullImage":
            if (!s.data?.image) return null;

            return (
              <div key={i} style={{ margin: "20px 0" }}>
                <img
                  src={s.data.image}
                  alt={s.data.caption || ""}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                  }}
                />

                {s.data.caption && (
                  <p
                    style={{
                      marginTop: 8,
                      opacity: 0.7,
                      fontSize: 14,
                    }}
                  >
                    {s.data.caption}
                  </p>
                )}
              </div>
            );

          case "features": {
            if (!s.data || s.data.length === 0) return null;

            const validItems = s.data.filter(
              (f) => f.image || f.title
            );

            if (validItems.length === 0) return null;

            return (
              <div
                key={i}
                style={{
                  margin: "20px 0",
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 16,
                }}
              >
                {validItems.map((f, j) => (
                  <div
                    key={j}
                    style={{
                      background: "#1a1a1a",
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    {f.image && (
                      <img
                        src={f.image}
                        alt={f.title || "feature"}
                        style={{
                          width: "100%",
                          borderRadius: 6,
                          marginBottom: f.title ? 8 : 0,
                        }}
                      />
                    )}

                    {f.title && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                        }}
                      >
                        {f.title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}