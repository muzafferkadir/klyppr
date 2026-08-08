import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Native macOS dark window base (matches desktop app)
        window: "#1c1c1e",
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.055)", // grouped card
          hover: "rgba(255, 255, 255, 0.09)",
          raised: "rgba(255, 255, 255, 0.04)", // toolbar / bezel
        },
        field: "rgba(0, 0, 0, 0.22)",
        hairline: "rgba(255, 255, 255, 0.09)",
        stroke: {
          DEFAULT: "rgba(255, 255, 255, 0.10)",
          strong: "rgba(255, 255, 255, 0.16)",
        },
        ink: {
          DEFAULT: "rgba(255, 255, 255, 0.92)",
          2: "rgba(255, 255, 255, 0.55)",
          3: "rgba(255, 255, 255, 0.34)",
        },
        accent: {
          DEFAULT: "#6366f1",
          hover: "#7175f4",
          press: "#565af0",
          fg: "#ffffff",
        },
        danger: {
          DEFAULT: "#ff453a",
          hover: "#ff5b52",
        },
        success: "#32d74b",
      },
      borderRadius: {
        field: "6px",
        group: "10px",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["SF Mono", "Menlo", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        control: "0 1px 1px rgba(0, 0, 0, 0.25)",
        "field-inset": "inset 0 1px 1px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
