const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#fff",
        tertiary: "#575acb",
        light_hash: "#7A7A7A",
        hash_one: "#4B4B4B",
        dark_hash: "#292929",
        hash_two: "#242424",
        hash_dark_two: "#0A0A0A",
        light_mode_primary: '#FFE1A8',
        light_mode_secondary: '#FFEAC2',
        light_mode_text: '#F7FFF7',
        light_mode_tertiary: '#FFF4E0',
        light_mode_hard: '#FFD382',
        light_mode_text: '#4D4D4D',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        nunito: ["Nunito", "sans-serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};