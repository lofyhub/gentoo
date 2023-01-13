/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        327: `327px`,
        589: `589px`,
        600: `600px`,
        748: `748px`,
        750: `750px`,
        1220: `1220px`,
        760: `760px`,
        7.5: `62.5%`,
        4.5: `37.5%`,
      },
      minWidth: {
        760: `760px`,
        1220: `1220px`,
      },
      maxWidth: {
        420: `420px`,
        700: `700px`,
        760: `760px`,
        1220: `1220px`,
        mobileCard: `calc(100vw - 50px)`,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: true,
  variants: {},
};
