/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      skyblue: "#99F1FF",
      secondaryblue: "#4994FD",
      primaryblue: "#0266F2",
      darkcl: "#35393C",
      darkclLighter: "#737B82",
      white: "#ffffff",
      danger: "#ff3333",
    },
    extend: {
      fontFamily: {
        sans: ["'Source Sans Pro'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
