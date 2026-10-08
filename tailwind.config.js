/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        // Asknet green: same family as the login / signup screens
        brand: {
          50: "#f2faf5",
          100: "#e1f3e8",
          200: "#c3e6d1",
          300: "#94d1ae",
          400: "#62b787",
          500: "#379b59", // primary buttons (login / signup)
          600: "#2f8e50",
          700: "#28784f", // links
          800: "#1f5d3e",
          900: "#0d3a27",
          950: "#062d1b", // dark panels / banner
        },

        // Soft page background behind white cards
        canvas: "#f4f7f5",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
};