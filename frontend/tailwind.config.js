/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F4F4F4",
        primary: "#076AE1",
        secondary: "#114465",
        blackk: "#000",
        grey:"#6B6B6B",
        whitee: "#FFFFFF",
        cyan: "#13E3F1",
        header:"#076AE1"
      },
    },
    fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
    },
  },
  plugins: [],
};
