import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F8FA",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#14151A",
          soft: "#6B7280",
          faint: "#9AA1AC",
        },
        line: "#E7E8EC",
        brand: {
          50: "#EEF1FF",
          100: "#DFE4FF",
          300: "#9AA8FF",
          500: "#2D5BFF",
          600: "#1E45E0",
          700: "#1633AD",
          900: "#101F5E",
        },
        signal: {
          amber: "#F5A623",
          green: "#16A34A",
          red: "#DC2626",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,21,26,0.04), 0 1px 8px rgba(20,21,26,0.04)",
        popover: "0 8px 30px rgba(20,21,26,0.12)",
      },
      borderRadius: {
        lg: "14px",
        md: "10px",
        sm: "7px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
