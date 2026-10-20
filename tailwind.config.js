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
        // The main colour of the site. 600 is the brand blue #017CB8
        // (buttons, links, active states). 950 is the deep navy used for
        // the greeting banner.
        brand: {
          50: "#f3f9fc",
          100: "#e0f2fb",
          200: "#bae3f7",
          300: "#86cff3",
          400: "#49b4e9",
          500: "#0996dc",
          600: "#017cb8",
          700: "#016293",
          800: "#034d72",
          900: "#063b56",
          950: "#062737",
        },

        // Green, used sparingly where it means "good": accepted answers,
        // online, all caught up. Same green as the landing page (#3ebc84).
        // For text on a light green, use 800 (700 is for icons).
        accent: {
          50: "#effaf6",
          100: "#daf6ea",
          200: "#b6ecd6",
          300: "#88ddba",
          400: "#5ccc9d",
          500: "#3ebc84",
          600: "#2e9e6f",
          700: "#21835a",
          800: "#1b6a49",
          900: "#18533a",
        },

        // Soft page background behind white cards
        canvas: "#f3f7f9",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
};