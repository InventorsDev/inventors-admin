/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        primaryGreen: "var(--primary-green)",
        mintGreen: "var(--mint-green)",
        darkGray: "var(--dark-gray)",
        lightGray: "var(--light-gray)",
      },
    },
  },
  plugins: [],
};
