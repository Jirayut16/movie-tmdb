const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        main: "#181a2f",
        second: "#c5211c",
        third: "#f7de42",
        fourth: "#242e49",
        cream: "#f6f8e2",
        dark: "#0e0e01",
        light: "#e4e4e4",
      },
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
