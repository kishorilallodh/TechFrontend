// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        dancing: ["'Dancing Script'", "cursive"],
      },
      fontSize: {
        h1: [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.2", fontWeight: "700" },
        ],
        "h1-fixed": [
          "3rem", // Tailwind 5xl = 48px
          { lineHeight: "1.2", fontWeight: "700" },
        ],
        h2: [
          "clamp(2rem, 4vw, 2.25rem)",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        h3: [
          "clamp(1.875rem, 3.5vw, 1.875rem)", // 3xl = 1.875rem (30px)
          { lineHeight: "1.3", fontWeight: "600" },
        ],

        "p-lg": [
          "1.125rem", // ~16px
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        "p-xl": [
          "1.25rem", // ~20px
          { lineHeight: "1.75rem", fontWeight: "400" },
        ],
        "p-sm": [
          "1rem", // ~16px
          { lineHeight: "1.5", fontWeight: "400" },
        ],
      },
      colors: {
        primary: "#03286d",
        secondary: "#4859da",
        light: "#48C9DA",
        blue50: "#eff6ff",
      },
    },
  },
  plugins: [],
};
