import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211f",
        graphite: "#31413d",
        mist: "#f5f2ec",
        paper: "#fffdf8",
        sage: "#63796f",
        moss: "#304d43",
        clay: "#b66d4c",
        apricot: "#f1c9a9",
        blueglass: "#dfeaf0"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 22px 70px rgba(23, 33, 31, 0.10)",
        card: "0 12px 32px rgba(48, 77, 67, 0.10)"
      },
      borderRadius: {
        organic: "2rem"
      }
    }
  },
  plugins: []
};

export default config;
