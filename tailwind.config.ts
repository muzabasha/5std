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
        primary: { DEFAULT: "#4F9CF9", light: "#7BB8FF", dark: "#2D7CE0" },
        success: { DEFAULT: "#6BCB77", light: "#8FDB96", dark: "#4CAF57" },
        warning: { DEFAULT: "#FFD93D", light: "#FFE36B", dark: "#E6C235" },
        accent: { DEFAULT: "#FF8C42", light: "#FFA76B", dark: "#E67530" },
        fun: {
          purple: "#A855F7",
          pink: "#EC4899",
          teal: "#14B8A6",
          red: "#EF4444",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        comic: ["Comic Neue", "cursive"],
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pop-in": "popIn 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
