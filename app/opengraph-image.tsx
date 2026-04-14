import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Faris | Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Green ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(34, 197, 94, 0.12)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(34, 197, 94, 0.06)",
            display: "flex",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            width: 60,
            height: 60,
            background: "#f5f5f5",
            color: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 48,
          }}
        >
          F
        </div>

        {/* Label */}
        <div
          style={{
            color: "#22c55e",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 20,
            fontFamily: "monospace",
          }}
        >
          Full Stack Developer
        </div>

        {/* Name */}
        <div
          style={{
            color: "#f5f5f5",
            fontSize: 100,
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: 28,
          }}
        >
          Faris
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#737373",
            fontSize: 26,
            maxWidth: 680,
            lineHeight: 1.5,
            marginBottom: 52,
          }}
        >
          Building high-performance digital experiences with React, Next.js &
          Node.js
        </div>

        {/* Tech pills */}
        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              color: "#22c55e",
              padding: "8px 18px",
              borderRadius: 6,
              fontSize: 15,
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            React
          </div>
          <div
            style={{
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              color: "#22c55e",
              padding: "8px 18px",
              borderRadius: 6,
              fontSize: 15,
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            Next.js
          </div>
          <div
            style={{
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              color: "#22c55e",
              padding: "8px 18px",
              borderRadius: 6,
              fontSize: 15,
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            TypeScript
          </div>
          <div
            style={{
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              color: "#22c55e",
              padding: "8px 18px",
              borderRadius: 6,
              fontSize: 15,
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            Node.js
          </div>
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: "absolute",
            bottom: 64,
            right: 80,
            color: "#3a3a3a",
            fontSize: 16,
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          faris-portfolio.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
