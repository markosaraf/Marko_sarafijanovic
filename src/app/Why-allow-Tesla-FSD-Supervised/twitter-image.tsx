import { ImageResponse } from "next/og";
import { trafficDeathCount } from "./fsd-data";

export const alt = "Why approve Tesla FSD (Supervised)? — Traffic death counter";
export const size = { width: 1200, height: 630 };
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
        {/* Blue header bar */}
        <div
          style={{
            width: "100%",
            padding: "28px 48px",
            backgroundColor: "#1e3a5f",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
            }}
          >
            Why approve Tesla FSD (Supervised)?
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Learn more
          </div>
        </div>

        {/* Main content area — compact for banner */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 48px",
            gap: "16px",
          }}
        >
          {/* Death counter card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 48px",
              borderRadius: "16px",
              border: "2px solid #fecaca",
              backgroundColor: "#fef2f2",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "120px",
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
                gap: "2px",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#E31937",
                }}
              >
                Traffic deaths
              </div>
              <div
                style={{
                  fontSize: "16px",
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
              fontSize: "18px",
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
            padding: "16px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#94a3b8",
            }}
          >
            marko-sarafijanovic.com
          </div>
          <div
            style={{
              fontSize: "14px",
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
