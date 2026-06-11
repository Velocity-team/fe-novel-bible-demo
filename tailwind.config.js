/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 밝은 크림톤 배경 팔레트
        paper: {
          50: "#fffdf9",
          100: "#faf6ef",
          200: "#f3ede2",
          300: "#e8dfd0",
          400: "#d9cdb8",
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(90, 70, 40, 0.08), 0 4px 14px rgba(90, 70, 40, 0.06)",
        "card-hover": "0 2px 6px rgba(90, 70, 40, 0.12), 0 8px 24px rgba(90, 70, 40, 0.10)",
      },
    },
  },
  plugins: [],
};
