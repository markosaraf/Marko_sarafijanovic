import { ImageResponse } from "next/og";
import { trafficDeathCount } from "./fsd-data";

export const alt = "Why approve Tesla FSD (Supervised)? — Traffic death counter";
export const size = { width: 1200, height: 1200 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8fafc",
        }}
      >
        {/* Blue header bar — matches the FSD page */}
        <div
          style={{
            width: "100%",
            padding: "48px 64px",
            backgroundColor: "#1e3a5f",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
            }}
          >
            Why approve Tesla FSD (Supervised)?
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Learn more
          </div>
        </div>

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 64px",
            gap: "32px",
          }}
        >
          {/* Death counter card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 64px",
              borderRadius: "24px",
              border: "2px solid #fecaca",
              backgroundColor: "#fef2f2",
              gap: "16px",
            }}
          >
            {/* The big number */}
            <div
              style={{
                fontSize: "160px",
                fontWeight: 800,
                color: "#E31937",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(trafficDeathCount)}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: "#E31937",
                }}
              >
                Traffic deaths
              </div>
              <div
                style={{
                  fontSize: "20px",
                  color: "#64748b",
                }}
              >
                since VAF law (March 1, 2025)
              </div>
            </div>
          </div>

          {/* FSD Delay Clock link */}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#16a34a",
            }}
          >
            fsddelay.org
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "32px 64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#94a3b8",
            }}
          >
            marko-sarafijanovic.com
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#94a3b8",
            }}
          >
            Marko Sarafijanovic
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
