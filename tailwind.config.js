/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // blue-500
          dark: "#2563EB", // blue-600
        },
        secondary: {
          DEFAULT: "#2D3436",
          dark: "#1E2729",
        },
        background: {
          light: "#FFFFFF",
          dark: "#121212",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
