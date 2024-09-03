/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        darkgrey : "#323334",
        gray : "#5A5959",
        yellow : "#FFEAAE",
        purple : "#5F00D9",
        white : "#FFFFFF",
        orange : "#F6820C",
        "dark-yellow" : " #FCCA3F",

      }
    },
  },
  plugins: [],
}