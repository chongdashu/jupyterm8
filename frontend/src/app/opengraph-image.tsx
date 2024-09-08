import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jupyterm8 - Helpful Mini Tools for AI Research";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "#3776AB",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ffffff"
              width="60"
              height="60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#3776AB",
            }}
          >
            Jupyterm8
          </div>
        </div>
        <div
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#333333",
            marginBottom: "40px",
          }}
        >
          AI Research Tools
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {["Jupyter", "Image Analysis", "Data Viz"].map((tool, index) => (
            <div
              key={tool}
              style={{
                padding: "10px 20px",
                background: index % 2 === 0 ? "#3776AB" : "#FF6F61",
                color: "#ffffff",
                borderRadius: "25px",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 10px",
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
